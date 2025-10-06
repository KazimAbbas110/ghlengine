(async function() {
  const BTN_ID = "ghl-theme-switcher-btn";
  const POPUP_ID = "ghl-theme-popup";
  const API_BASE = "https://ghle-theme-builder.vercel.app/api";
  const agencyCompanyId = window.agencyCompanyId; // must be set in GHL context

  if (!agencyCompanyId) return console.error("Agency Company ID missing");

  let popupRef = null;
  let btnRef = null;
  let themes = [];

  // ---- Load CDN theme ----
  function loadThemeScript(url){
    localStorage.setItem("selected-theme-script", url);
    const old = document.getElementById("dynamic-theme-script");
    if(old) old.remove();
    const s = document.createElement("script");
    s.id = "dynamic-theme-script";
    s.src = url + "?v=" + Date.now();
    document.head.appendChild(s);
    closePopup();
  }

  // ---- Fetch all themes ----
  async function fetchThemes(){
    try {
      const res = await fetch(`${API_BASE}/themes`);
      themes = await res.json();
    } catch(e){
      console.error("Failed to fetch themes:", e);
    }
  }

  // ---- Fetch agency subaccounts ----
  async function fetchSubAccounts(){
    try {
      const res = await fetch(`${API_BASE}/subaccount/agency/${agencyCompanyId}`);
      const data = await res.json();
      if(!data.success) throw new Error("Failed to load subaccounts");
      return data.subAccounts || [];
    } catch(e){
      console.error("Failed to fetch subaccounts:", e);
      return [];
    }
  }

  // ---- Create popup ----
  async function makePopup(){
    if(popupRef) return popupRef;
    if(!document.body) return null;

    await fetchThemes();
    const subAccounts = await fetchSubAccounts();

    const div = document.createElement("div");
    div.id = POPUP_ID;
    Object.assign(div.style, {
      display:"none", position:"fixed", top:"50%", left:"50%",
      transform:"translate(-50%, -50%)", background:"#fff",
      padding:"20px", borderRadius:"12px", boxShadow:"0 8px 20px rgba(0,0,0,0.25)",
      zIndex:"99999", maxWidth:"400px", maxHeight:"80vh", overflowY:"auto"
    });

    const title = document.createElement("h3");
    title.textContent = "🎨 Manage Subaccounts & Themes";
    title.style.marginBottom = "15px";
    div.appendChild(title);

    subAccounts.forEach(sub => {
      const subDiv = document.createElement("div");
      subDiv.style.marginBottom = "12px";
      subDiv.style.padding = "8px";
      subDiv.style.border = "1px solid #ddd";
      subDiv.style.borderRadius = "8px";
      subDiv.style.background = sub.access ? "#f0fff0" : "#fff0f0";

      const name = document.createElement("strong");
      name.textContent = `${sub.locationName} (ID: ${sub.locationId})`;
      subDiv.appendChild(name);

      // Access toggle
      const accessBtn = document.createElement("button");
      accessBtn.textContent = sub.access ? "Revoke Access" : "Grant Access";
      Object.assign(accessBtn.style, {
        marginLeft:"10px", padding:"4px 8px", cursor:"pointer"
      });
      accessBtn.onclick = async () => {
        try {
          const res = await fetch(`${API_BASE}/subaccount/access/${sub.locationId}`, {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ access: !sub.access })
          });
          const updated = await res.json();
          sub.access = updated.subAccount.access;
          accessBtn.textContent = sub.access ? "Revoke Access" : "Grant Access";
          subDiv.style.background = sub.access ? "#f0fff0" : "#fff0f0";
        } catch(e){ console.error(e); }
      };
      subDiv.appendChild(accessBtn);

      // Theme selector
      const themeSelect = document.createElement("select");
      Object.assign(themeSelect.style, { marginLeft:"10px" });
      const defaultOption = document.createElement("option");
      defaultOption.textContent = "Select Theme";
      defaultOption.value = "";
      themeSelect.appendChild(defaultOption);

      themes.forEach(t => {
        const option = document.createElement("option");
        option.value = t._id;
        option.textContent = t.name;
        if(sub.themeId && sub.themeId._id === t._id) option.selected = true;
        themeSelect.appendChild(option);
      });

      themeSelect.onchange = async () => {
        const selectedTheme = themeSelect.value;
        const themeObj = themes.find(t => t._id === selectedTheme);
        if(!themeObj) return;
        try {
          const res = await fetch(`${API_BASE}/subaccount/theme/${sub.locationId}`, {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ themeId: selectedTheme })
          });
          await res.json();
          if(sub.locationId === window.currentSubAccountId){ // apply if current user
            loadThemeScript(themeObj.cdnUrl);
          }
        } catch(e){ console.error(e); }
      };
      subDiv.appendChild(themeSelect);

      div.appendChild(subDiv);
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    Object.assign(closeBtn.style, {
      marginTop:"10px", padding:"6px 14px", border:"none",
      borderRadius:"8px", background:"#e74c3c", color:"#fff", cursor:"pointer"
    });
    closeBtn.onclick = closePopup;
    div.appendChild(closeBtn);

    document.body.appendChild(div);
    popupRef = div;
    return div;
  }

  function openPopup(){ makePopup().then(p => { if(p) p.style.display="block"; }); }
  function closePopup(){ if(popupRef) popupRef.style.display="none"; }

  function makeBtn(){
    if(btnRef) return btnRef;

    const btn = document.createElement("div");
    btn.id = BTN_ID;
    btn.textContent = "Manage Themes";
    Object.assign(btn.style, {
      cursor:"pointer", margin:"12px", padding:"6px 12px",
      background:"#2563EB", color:"#fff",
      borderRadius:"6px", fontSize:"13px", fontWeight:"600",
      whiteSpace:"nowrap", userSelect:"none",
      position:"fixed", top:"20px", right:"20px", zIndex:"99999"
    });
    btn.onclick = openPopup;
    btnRef = btn;

    if(document.body) document.body.appendChild(btn);
    return btn;
  }

  // Heartbeat to keep button mounted
  setInterval(() => { if(!document.getElementById(BTN_ID) && document.body) makeBtn(); }, 300);

  // Auto-load saved theme
  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("selected-theme-script");
    if(saved) loadThemeScript(saved);
  });

})();
