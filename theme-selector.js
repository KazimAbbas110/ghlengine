(async function(){
  const BTN_ID = "ghl-theme-switcher-btn";
  const POPUP_ID = "ghl-theme-popup";
  const API_BASE = "https://ghle-theme-builder.vercel.app/api";
  const agencyCompanyId = window.agencyCompanyId; // must be set in GHL context
  let popupRef = null;
  let btnRef = null;

  if(!agencyCompanyId) return console.error("Agency Company ID missing");

  async function fetchThemes() {
    try {
      const res = await fetch(`${API_BASE}/themes`);
      return await res.json();
    } catch(e){
      console.error("❌ Failed to fetch themes:", e);
      return [];
    }
  }

  async function fetchSubAccounts() {
    try {
      const res = await fetch(`${API_BASE}/subaccount/agency/${agencyCompanyId}`);
      const data = await res.json();
      return data.subAccounts || [];
    } catch(e){
      console.error("❌ Failed to fetch subaccounts:", e);
      return [];
    }
  }

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

  async function makePopup(){
    if(popupRef) return popupRef;
    if(!document.body) return null;

    const themes = await fetchThemes();
    const subAccounts = await fetchSubAccounts();

    const div = document.createElement("div");
    div.id = POPUP_ID;
    Object.assign(div.style, {
      display:"none", position:"fixed", top:"50%", left:"50%",
      transform:"translate(-50%, -50%)", background:"#fff",
      padding:"20px", borderRadius:"12px", boxShadow:"0 8px 20px rgba(0,0,0,0.25)",
      zIndex:"99999", maxWidth:"300px", textAlign:"center"
    });

    const title = document.createElement("h3");
    title.textContent = "🎨 Select Theme for Subaccounts";
    title.style.marginBottom = "15px";
    div.appendChild(title);

    subAccounts.forEach(sub => {
      const label = document.createElement("div");
      label.textContent = sub.locationName + (sub.access ? "" : " ❌");
      label.style.fontWeight = "bold";
      label.style.marginTop = "10px";
      div.appendChild(label);

      themes.forEach(theme => {
        const btn = document.createElement("button");
        btn.textContent = theme.name;
        Object.assign(btn.style, {
          display:"block", width:"100%", margin:"3px 0",
          padding:"6px 10px", borderRadius:"6px",
          border:"none", cursor:"pointer",
          background: theme.primaryColor||"#888", color:"#fff"
        });
        btn.onclick = async () => {
          if(!sub.access) return alert("Access revoked for this subaccount");
          try {
            await fetch(`${API_BASE}/subaccount/theme/${sub.locationId}`, {
              method:"PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify({ themeId: theme._id })
            });
            loadThemeScript(theme.cdnUrl);
          } catch(e){ console.error(e); }
        };
        div.appendChild(btn);
      });
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    Object.assign(closeBtn.style, {
      marginTop:"12px", padding:"6px 14px", border:"none",
      borderRadius:"6px", background:"#e74c3c", color:"#fff", cursor:"pointer"
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
    btn.textContent = "Change Theme";
    Object.assign(btn.style, {
      cursor:"pointer", margin:"12px", padding:"6px 12px",
      background:"#2563EB", color:"#fff", borderRadius:"6px",
      fontSize:"13px", fontWeight:"600", whiteSpace:"nowrap",
      userSelect:"none", position:"fixed", top:"20px", right:"20px", zIndex:"99999"
    });
    btn.onclick = openPopup;
    btnRef = btn;
    if(document.body) document.body.appendChild(btn);
    return btn;
  }

  setInterval(() => { if(!document.getElementById(BTN_ID) && document.body) makeBtn(); }, 300);

  document.addEventListener("DOMContentLoaded", ()=>{
    const saved = localStorage.getItem("selected-theme-script");
    if(saved) loadThemeScript(saved);
  });

})();
