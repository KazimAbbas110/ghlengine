(function() {
  const API_BASE = "https://ghle-theme-builder.vercel.app/api";
  const agencyCompanyId = window.agencyCompanyId; // must exist

  if (!agencyCompanyId) return console.error("Agency Company ID missing");

  // Remove existing panel if any
  const oldPanel = document.getElementById("agency-control-panel");
  if (oldPanel) oldPanel.remove();

  // Floating button
  const btn = document.createElement("button");
  btn.textContent = "Agency Panel";
  Object.assign(btn.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "10px 15px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    zIndex: 99999,
    cursor: "pointer"
  });
  document.body.appendChild(btn);

  // Floating panel container
  const panel = document.createElement("div");
  panel.id = "agency-control-panel";
  Object.assign(panel.style, {
    display: "none",
    position: "fixed",
    top: "60px",
    right: "20px",
    width: "350px",
    maxHeight: "500px",
    overflowY: "auto",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "15px",
    zIndex: 99999,
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    fontFamily: "sans-serif"
  });
  document.body.appendChild(panel);

  btn.onclick = async () => {
    if (panel.style.display === "block") {
      panel.style.display = "none";
      return;
    }
    panel.innerHTML = "<h4 style='margin-bottom:10px;'>Loading...</h4>";
    panel.style.display = "block";

    try {
      const res = await fetch(`${API_BASE}/subaccount/agency/${agencyCompanyId}`);
      const data = await res.json();

      if (!data.success) {
        panel.innerHTML = "<p>Failed to load subaccounts</p>";
        return;
      }

      panel.innerHTML = "<h4 style='margin-bottom:10px;'>Agency Control Panel</h4>";

      data.subAccounts.forEach(sub => {
        const div = document.createElement("div");
        div.style.marginBottom = "12px";
        div.style.padding = "8px";
        div.style.borderBottom = "1px solid #eee";
        div.innerHTML = `
          <strong>${sub.locationName}</strong> (ID: ${sub.locationId})<br>
          Access: ${sub.access ? '✅' : '❌'}<br>
          Theme: ${sub.themeId ? sub.themeId.name : 'None'}
        `;
        panel.appendChild(div);
      });

    } catch (e) {
      console.error(e);
      panel.innerHTML = "<p>Error loading subaccounts</p>";
    }
  };
})();
