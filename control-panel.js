(function () {
  const BTN_ID = "ghl-theme-switcher-btn";
  const POPUP_ID = "ghl-theme-popup";

  const API_URL = "https://ghle-backend.vercel.app/api/themes";
  const BACKEND_API = "https://ghle-backend.vercel.app/api/subaccount";
  const COMPANY_ID = "uomZrOy5NrTiYDHZojm4"; // 👈 replace with your actual companyId

  let SUBACCOUNT_LOCATION_ID = null;
  let popupRef = null;
  let btnRef = null;

  /* ------------------- Toast Helper ------------------- */
  function showToast(msg, isError = false) {
    const el = document.createElement("div");
    Object.assign(el.style, {
      position: "fixed",
      bottom: "20px",
      left: "20px",
      padding: "10px 16px",
      background: isError ? "#ef4444" : "#2563eb",
      color: "#fff",
      borderRadius: "6px",
      fontSize: "14px",
      zIndex: 999999,
    });
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  /* ------------------- API Calls ------------------- */
  async function fetchSubAccounts() {
    try {
      const res = await fetch(`${BACKEND_API}/${COMPANY_ID}`);
      if (!res.ok) throw new Error("Failed to fetch subaccounts");
      const data = await res.json();
      return data.subAccounts || [];
    } catch (err) {
      console.error("fetchSubAccounts error:", err);
      showToast("Failed to load subaccounts", true);
      return [];
    }
  }

  async function fetchThemes() {
    try {
      const res = await fetch(API_URL);
      return await res.json();
    } catch (err) {
      console.error("fetchThemes error:", err);
      return [];
    }
  }

  async function fetchSubAccountTheme(locationId) {
    try {
      const res = await fetch(`${BACKEND_API}/location/${locationId}`);
      const data = await res.json();
      return data.subAccount?.theme || null;
    } catch (err) {
      console.error("fetchSubAccountTheme error:", err);
      return null;
    }
  }

  async function saveTheme(locationId, themeId) {
    try {
      const res = await fetch(`${BACKEND_API}/location/${locationId}/theme`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId }),
      });
      return res.ok;
    } catch (err) {
      console.error("saveTheme error:", err);
      return false;
    }
  }

  /* ------------------- Theme Loader ------------------- */
  function injectTheme(cdnUrl) {
    if (!cdnUrl) return;
    const old = document.getElementById("dynamic-theme-script");
    if (old) old.remove();

    const s = document.createElement("script");
    s.id = "dynamic-theme-script";
    s.src = cdnUrl + "?v=" + Date.now();
    s.onerror = () => showToast("Failed to load theme script", true);
    document.head.appendChild(s);
  }

  async function loadSavedTheme(locationId) {
    const theme = await fetchSubAccountTheme(locationId);
    if (theme?.cdnUrl) {
      injectTheme(theme.cdnUrl);
      console.log("Loaded saved theme:", theme.cdnUrl);
    }
  }

  /* ------------------- Popup ------------------- */
  async function makePopup(themes) {
    if (popupRef) return popupRef;

    const div = document.createElement("div");
    div.id = POPUP_ID;
    Object.assign(div.style, {
      display: "none",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      zIndex: 99999,
      maxWidth: "320px",
      textAlign: "center",
      fontFamily: "system-ui, sans-serif",
    });

    const title = document.createElement("h3");
    title.textContent = "🎨 Select a Theme";
    title.style.marginBottom = "15px";
    div.appendChild(title);

    themes.forEach((theme) => {
      const btn = document.createElement("button");
      btn.textContent = theme.name;
      Object.assign(btn.style, {
        display: "block",
        width: "100%",
        margin: "5px 0",
        padding: "8px 10px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: theme.primaryColor || "#4F46E5",
        color: "#fff",
        fontWeight: "600",
      });

      btn.onclick = async () => {
        injectTheme(theme.cdnUrl);
        const ok = await saveTheme(SUBACCOUNT_LOCATION_ID, theme._id);
        showToast(ok ? "Theme saved ✅" : "Failed to save theme", !ok);
        closePopup();
      };

      div.appendChild(btn);
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    Object.assign(closeBtn.style, {
      marginTop: "10px",
      padding: "6px 14px",
      border: "none",
      borderRadius: "8px",
      background: "#e74c3c",
      color: "#fff",
      cursor: "pointer",
    });
    closeBtn.onclick = closePopup;
    div.appendChild(closeBtn);

    document.body.appendChild(div);
    popupRef = div;
    return div;
  }

  function openPopup() {
    if (!popupRef) return;
    popupRef.style.display = "block";
  }

  function closePopup() {
    if (popupRef) popupRef.style.display = "none";
  }

  /* ------------------- Floating Button ------------------- */
  function makeBtn() {
    if (btnRef) return btnRef;

    const btn = document.createElement("div");
    btn.id = BTN_ID;
    btn.textContent = "Change Theme";
    Object.assign(btn.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#2563EB",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      zIndex: "99999",
    });
    btn.onclick = openPopup;

    document.body.appendChild(btn);
    btnRef = btn;
  }

  /* ------------------- Initialize ------------------- */
  document.addEventListener("DOMContentLoaded", async () => {
    makeBtn();

    // 1️⃣ Fetch subaccounts
    const subAccounts = await fetchSubAccounts();
    if (!subAccounts.length) return showToast("No subaccounts found", true);

    // 2️⃣ Pick first subaccount (can replace with selector later)
    SUBACCOUNT_LOCATION_ID = subAccounts[0].locationId;
    console.log("Using subaccount:", SUBACCOUNT_LOCATION_ID);

    // 3️⃣ Fetch themes
    const themes = await fetchThemes();

    // 4️⃣ Create popup with themes
    await makePopup(themes);

    // 5️⃣ Load saved theme from backend
    await loadSavedTheme(SUBACCOUNT_LOCATION_ID);
  });
})();
