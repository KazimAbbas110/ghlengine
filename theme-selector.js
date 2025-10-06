(async function(){
  const BTN_ID = "ghl-theme-switcher-btn";
  const POPUP_ID = "ghl-theme-popup";
  const API_BASE = "https://ghle-theme-builder.vercel.app/api";
  let popupRef = null;
  let btnRef = null;

  // Helper: load theme script
  function loadThemeScript(url){
    localStorage.setItem("selected-theme-script", url);
    const old = document.getElementById("dynamic-theme-script");
    if (old) old.remove();
    const s = document.createElement("script");
    s.id = "dynamic-theme-script";
    s.src = url + "?v=" + Date.now();
    document.head.appendChild(s);
    closePopup();
  }

  // Create popup with subaccount themes
  async function makePopup(subaccount){
    if (popupRef) return popupRef;
    if (!document.body) return null;

    const div = document.createElement("div");
    div.id = POPUP_ID;
    Object.assign(div.style, {
      display:"none", position:"fixed", top:"50%", left:"50%",
      transform:"translate(-50%, -50%)", background:"#fff",
      padding:"20px", borderRadius:"12px", boxShadow:"0 8px 20px rgba(0,0,0,0.25)",
      zIndex:"99999", maxWidth:"300px", textAlign:"center"
    });

    const title = document.createElement("h3");
    title.textContent = `🎨 Select a Theme for ${subaccount.locationName}`;
    title.style.marginBottom = "15px";
    div.appendChild(title);

    try {
      const res = await fetch(`${API_BASE}/themes`);
      const themes = await res.json();

      themes.forEach(theme => {
        const btn = document.createElement("button");
        btn.textContent = theme.name;
        Object.assign(btn.style, {
          display:"block", width:"100%", margin:"5px 0",
          padding:"8px 10px", borderRadius:"8px", border:"none",
          cursor:"pointer", background: theme.primaryColor||"#888", color:"#fff"
        });

        btn.onclick = async () => {
          // Save theme for subaccount in backend
          await fetch(`${API_BASE}/subaccount/${subaccount.companyId}/theme`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locationId: subaccount.locationId, themeId: theme._id })
          });
          loadThemeScript(theme.cdnUrl);
        };

        div.appendChild(btn);
      });
    } catch(e){
      console.error("❌ Failed to fetch themes:", e);
    }

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    Object.assign(closeBtn.style, {
      marginTop:"10px", padding:"6px 14px",
      border:"none", borderRadius:"8px",
      background:"#e74c3c", color:"#fff", cursor:"pointer"
    });
    closeBtn.onclick = closePopup;
    div.appendChild(closeBtn);

    document.body.appendChild(div);
    popupRef = div;
    return div;
  }

  function openPopup(subaccount){ makePopup(subaccount).then(p => { if(p) p.style.display="block"; }); }
  function closePopup(){ if (popupRef) popupRef.style.display = "none"; }

  function makeBtn(subaccount){
    if (btnRef) return btnRef;

    const btn = document.createElement("div");
    btn.id = BTN_ID;
    btn.textContent = "Change Theme";
    Object.assign(btn.style, {
      cursor:"pointer",
      margin:"12px", padding:"6px 12px",
      background:"#2563EB", color:"#fff",
      borderRadius:"6px", fontSize:"13px", fontWeight:"600",
      whiteSpace:"nowrap", userSelect:"none",
      position:"fixed", top:"20px", right:"20px", zIndex:"99999"
    });
    btn.onclick = () => openPopup(subaccount);
    btnRef = btn;

    if (document.body) document.body.appendChild(btn);
    return btn;
  }

  // Load current subaccount info
  const agencyCompanyId = window.agencyCompanyId;
  const subaccountLocationId = window.subaccountLocationId;

  if (!agencyCompanyId || !subaccountLocationId){
    console.warn("⚠️ Missing agencyCompanyId or subaccountLocationId. Theme selector disabled.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/subaccount/${agencyCompanyId}/${subaccountLocationId}`);
    const data = await res.json();
    if (!data.success) return console.error("Failed to fetch subaccount data");

    // Apply saved theme automatically
    if (data.theme && data.theme.cdnUrl) loadThemeScript(data.theme.cdnUrl);

    // Mount button
    makeBtn(data);
  } catch(e){
    console.error("Failed to fetch subaccount info:", e);
  }
})();
