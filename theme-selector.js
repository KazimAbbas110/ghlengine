// (function(){
//   const BTN_ID = "ghl-theme-switcher-btn";
//   const POPUP_ID = "ghl-theme-popup";
//   const API_URL = "https://ghle-theme-builder.vercel.app/api/themes";
//   const SUBACCOUNT_LOCATION_ID = "uomZrOy5NrTiYDHZojm4"; // set your subaccount locationId
//   const BACKEND_API = "https://custom-kazim-abbas-projects.vercel.app";

//   let popupRef = null;
//   let btnRef = null;

//   // Load and apply a theme
//   async function loadTheme(themeId, cdnUrl){
//     localStorage.setItem(`theme-${SUBACCOUNT_LOCATION_ID}`, themeId);

//     const old = document.getElementById("dynamic-theme-script");
//     if(old) old.remove();

//     const s = document.createElement("script");
//     s.id = "dynamic-theme-script";
//     s.src = cdnUrl + "?v=" + Date.now();
//     document.head.appendChild(s);

//     // Save theme selection to backend
//     try {
//       await fetch(`${BACKEND_API}/${SUBACCOUNT_LOCATION_ID}/theme`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ themeId })
//       });
//     } catch(e){
//       console.error("Failed to save theme:", e);
//     }

//     closePopup();
//   }

//   // Create theme selection popup
//   async function makePopup(){
//     if(popupRef) return popupRef;
//     if(!document.body) return null;

//     const div = document.createElement("div");
//     div.id = POPUP_ID;
//     Object.assign(div.style, {
//       display:"none", position:"fixed", top:"50%", left:"50%",
//       transform:"translate(-50%, -50%)", background:"#fff",
//       padding:"20px", borderRadius:"12px", boxShadow:"0 8px 20px rgba(0,0,0,0.25)",
//       zIndex:"99999", maxWidth:"300px", textAlign:"center"
//     });

//     const title = document.createElement("h3");
//     title.textContent = "🎨 Select a Theme";
//     title.style.marginBottom = "15px";
//     div.appendChild(title);

//     try {
//       const res = await fetch(API_URL);
//       const themes = await res.json();

//       themes.forEach(theme => {
//         const btn = document.createElement("button");
//         btn.textContent = theme.name;
//         Object.assign(btn.style, {
//           display:"block", width:"100%", margin:"5px 0",
//           padding:"8px 10px", borderRadius:"8px", border:"none",
//           cursor:"pointer", background: theme.primaryColor||"#888", color:"#fff"
//         });
//         btn.onclick = () => loadTheme(theme._id, theme.cdnUrl);
//         div.appendChild(btn);
//       });

//     } catch(e){
//       console.error("❌ Failed to fetch themes:", e);
//     }

//     const closeBtn = document.createElement("button");
//     closeBtn.textContent = "Close";
//     Object.assign(closeBtn.style, {
//       marginTop:"10px", padding:"6px 14px",
//       border:"none", borderRadius:"8px",
//       background:"#e74c3c", color:"#fff", cursor:"pointer"
//     });
//     closeBtn.onclick = closePopup;
//     div.appendChild(closeBtn);

//     document.body.appendChild(div);
//     popupRef = div;
//     return div;
//   }

//   function openPopup(){ makePopup().then(p => { if(p) p.style.display="block"; }); }
//   function closePopup(){ if(popupRef) popupRef.style.display="none"; }

//   // Create floating button
//   function makeBtn(){
//     if(btnRef) return btnRef;

//     const btn = document.createElement("div");
//     btn.id = BTN_ID;
//     btn.textContent = "Change Theme";
//     Object.assign(btn.style, {
//       cursor:"pointer",
//       margin:"12px", padding:"6px 12px",
//       background:"#2563EB", color:"#fff",
//       borderRadius:"6px", fontSize:"13px", fontWeight:"600",
//       whiteSpace:"nowrap", userSelect:"none",
//       position:"fixed", top:"20px", right:"20px", zIndex:"99999"
//     });
//     btn.onclick = openPopup;
//     btnRef = btn;

//     if(document.body) document.body.appendChild(btn);
//     return btn;
//   }

//   // Keep button mounted
//   const interval = setInterval(() => {
//     if(!document.getElementById(BTN_ID) && document.body){
//       makeBtn();
//     }
//   }, 300);

//   const observer = new MutationObserver(() => {
//     if(!document.getElementById(BTN_ID) && document.body){
//       makeBtn();
//     }
//   });
//   observer.observe(document.body, { childList: true, subtree: true });

//   // Auto-load saved theme from backend for subaccount
//   document.addEventListener("DOMContentLoaded", async ()=>{
//     try {
//       const res = await fetch(`${BACKEND_API}/by-location/${SUBACCOUNT_LOCATION_ID}`);
//       const sub = await res.json();

//       if(sub.themeId && sub.themeId.cdnUrl){
//         loadTheme(sub.themeId._id, sub.themeId.cdnUrl);
//       }
//     } catch(e){
//       console.error("Failed to load saved theme:", e);
//     }
//   });

// })();







// (function(){
//   const BTN_ID = "ghl-theme-switcher-btn";
//   const POPUP_ID = "ghl-theme-popup";

//   const BACKEND_API = "https://custom-kazim-abbas-projects.vercel.app/api/subaccount";
//   const THEMES_API  = "https://custom-kazim-abbas-projects.vercel.app/api/themes";

//   // Try to get locationId dynamically, fallback to hardcoded
//   const SUBACCOUNT_LOCATION_ID = window.SUBACCOUNT_LOCATION_ID || "uomZrOy5NrTiYDHZojm4";

//   let popupRef = null;
//   let btnRef = null;

//   // =========================
//   // Load and apply theme
//   // =========================
//   async function loadTheme(themeId, cdnUrl){
//     localStorage.setItem(`theme-${SUBACCOUNT_LOCATION_ID}`, themeId);

//     const oldScript = document.getElementById("dynamic-theme-script");
//     if(oldScript) oldScript.remove();

//     const s = document.createElement("script");
//     s.id = "dynamic-theme-script";
//     s.src = cdnUrl + "?v=" + Date.now();
//     document.head.appendChild(s);

//     // Save theme selection to backend
//     try {
//       await fetch(`${BACKEND_API}/${SUBACCOUNT_LOCATION_ID}/theme`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ themeId })
//       });
//     } catch(e){
//       console.error("Failed to save theme:", e);
//     }

//     closePopup();
//   }

//   // =========================
//   // Create theme popup
//   // =========================
//   async function makePopup(){
//     if(popupRef) return popupRef;
//     if(!document.body) return null;

//     const div = document.createElement("div");
//     div.id = POPUP_ID;
//     Object.assign(div.style, {
//       display:"none",
//       position:"fixed",
//       top:"50%",
//       left:"50%",
//       transform:"translate(-50%, -50%)",
//       background:"#fff",
//       padding:"20px",
//       borderRadius:"12px",
//       boxShadow:"0 8px 20px rgba(0,0,0,0.25)",
//       zIndex:"99999",
//       maxWidth:"300px",
//       textAlign:"center"
//     });

//     const title = document.createElement("h3");
//     title.textContent = "🎨 Select a Theme";
//     title.style.marginBottom = "15px";
//     div.appendChild(title);

//     try {
//       const res = await fetch(THEMES_API);
//       const themes = await res.json();

//       themes.forEach(theme => {
//         const btn = document.createElement("button");
//         btn.textContent = theme.name;
//         Object.assign(btn.style, {
//           display:"block",
//           width:"100%",
//           margin:"5px 0",
//           padding:"8px 10px",
//           borderRadius:"8px",
//           border:"none",
//           cursor:"pointer",
//           background: theme.primaryColor || "#888",
//           color:"#fff"
//         });
//         btn.onclick = () => loadTheme(theme._id, theme.cdnUrl);
//         div.appendChild(btn);
//       });

//     } catch(e){
//       console.error("❌ Failed to fetch themes:", e);
//     }

//     const closeBtn = document.createElement("button");
//     closeBtn.textContent = "Close";
//     Object.assign(closeBtn.style, {
//       marginTop:"10px",
//       padding:"6px 14px",
//       border:"none",
//       borderRadius:"8px",
//       background:"#e74c3c",
//       color:"#fff",
//       cursor:"pointer"
//     });
//     closeBtn.onclick = closePopup;
//     div.appendChild(closeBtn);

//     document.body.appendChild(div);
//     popupRef = div;
//     return div;
//   }

//   function openPopup(){ makePopup().then(p => { if(p) p.style.display="block"; }); }
//   function closePopup(){ if(popupRef) popupRef.style.display="none"; }

//   // =========================
//   // Create floating button
//   // =========================
//   function makeBtn(){
//     if(btnRef) return btnRef;

//     const btn = document.createElement("div");
//     btn.id = BTN_ID;
//     btn.textContent = "Change Theme";
//     Object.assign(btn.style, {
//       cursor:"pointer",
//       margin:"12px",
//       padding:"6px 12px",
//       background:"#2563EB",
//       color:"#fff",
//       borderRadius:"6px",
//       fontSize:"13px",
//       fontWeight:"600",
//       whiteSpace:"nowrap",
//       userSelect:"none",
//       position:"fixed",
//       top:"20px",
//       right:"20px",
//       zIndex:"99999"
//     });
//     btn.onclick = openPopup;
//     btnRef = btn;

//     if(document.body) document.body.appendChild(btn);
//     return btn;
//   }

//   // =========================
//   // Keep button mounted
//   // =========================
//   const interval = setInterval(() => {
//     if(!document.getElementById(BTN_ID) && document.body){
//       makeBtn();
//     }
//   }, 300);

//   const observer = new MutationObserver(() => {
//     if(!document.getElementById(BTN_ID) && document.body){
//       makeBtn();
//     }
//   });
//   observer.observe(document.body, { childList: true, subtree: true });

//   // =========================
//   // Auto-load saved theme
//   // =========================
//   document.addEventListener("DOMContentLoaded", async ()=>{
//     try {
//       const res = await fetch(`${BACKEND_API}/by-location/${SUBACCOUNT_LOCATION_ID}`);
//       const sub = await res.json();

//       if(sub.data?.themeId?.cdnUrl){
//         loadTheme(sub.data.themeId._id, sub.data.themeId.cdnUrl);
//       }
//     } catch(e){
//       console.error("Failed to load saved theme:", e);
//     }
//   });

// })();










(function(){
  const BTN_ID = "ghl-theme-switcher-btn";
  const POPUP_ID = "ghl-theme-popup";
  
  // =========================
  // CONFIG
  // =========================
  const BACKEND_API = "https://custom-kazim-abbas-projects.vercel.app/api";
  const SUBACCOUNT_LOCATION_ID = "PUT_YOUR_SUBACCOUNT_LOCATION_ID_HERE"; // replace with dynamic locationId

  let popupRef = null;
  let btnRef = null;

  // =========================
  // Load & apply theme
  // =========================
  async function loadTheme(themeId, cdnUrl){
    localStorage.setItem(`theme-${SUBACCOUNT_LOCATION_ID}`, themeId);

    // Remove old theme script if exists
    const old = document.getElementById("dynamic-theme-script");
    if(old) old.remove();

    // Add new theme script
    const s = document.createElement("script");
    s.id = "dynamic-theme-script";
    s.src = cdnUrl + "?v=" + Date.now();
    document.head.appendChild(s);

    // Save theme selection to backend
    try {
      await fetch(`${BACKEND_API}/themes/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationId: SUBACCOUNT_LOCATION_ID,
          themeId: themeId
        })
      });
    } catch(e){
      console.error("❌ Failed to save theme:", e);
    }

    closePopup();
  }

  // =========================
  // Create Theme Popup
  // =========================
  async function makePopup(){
    if(popupRef) return popupRef;
    if(!document.body) return null;

    const div = document.createElement("div");
    div.id = POPUP_ID;
    Object.assign(div.style, {
      display:"none", position:"fixed", top:"50%", left:"50%",
      transform:"translate(-50%, -50%)", background:"#fff",
      padding:"20px", borderRadius:"12px", boxShadow:"0 8px 20px rgba(0,0,0,0.25)",
      zIndex:"99999", maxWidth:"300px", textAlign:"center"
    });

    const title = document.createElement("h3");
    title.textContent = "🎨 Select a Theme";
    title.style.marginBottom = "15px";
    div.appendChild(title);

    try {
      const res = await fetch(`${BACKEND_API}/themes`);
      const themes = await res.json();

      themes.data.forEach(theme => {
        const btn = document.createElement("button");
        btn.textContent = theme.name;
        Object.assign(btn.style, {
          display:"block", width:"100%", margin:"5px 0",
          padding:"8px 10px", borderRadius:"8px", border:"none",
          cursor:"pointer", background: theme.primaryColor||"#888", color:"#fff"
        });
        btn.onclick = () => loadTheme(theme._id, theme.cdnUrl);
        div.appendChild(btn);
      });

    } catch(e){
      console.error("❌ Failed to fetch themes:", e);
      const msg = document.createElement("div");
      msg.textContent = "Failed to load themes.";
      div.appendChild(msg);
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

  function openPopup(){ makePopup().then(p => { if(p) p.style.display="block"; }); }
  function closePopup(){ if(popupRef) popupRef.style.display="none"; }

  // =========================
  // Create floating button
  // =========================
  function makeBtn(){
    if(btnRef) return btnRef;

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
    btn.onclick = openPopup;
    btnRef = btn;

    if(document.body) document.body.appendChild(btn);
    return btn;
  }

  // =========================
  // Keep button mounted
  // =========================
  const interval = setInterval(() => {
    if(!document.getElementById(BTN_ID) && document.body){
      makeBtn();
    }
  }, 300);

  const observer = new MutationObserver(() => {
    if(!document.getElementById(BTN_ID) && document.body){
      makeBtn();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // =========================
  // Auto-load saved theme from backend
  // =========================
  document.addEventListener("DOMContentLoaded", async ()=>{
    try {
      const res = await fetch(`${BACKEND_API}/themes/by-location/${SUBACCOUNT_LOCATION_ID}`);
      const sub = await res.json();

      if(sub.success && sub.data && sub.data.themeId && sub.data.themeId.cdnUrl){
        loadTheme(sub.data.themeId._id, sub.data.themeId.cdnUrl);
      }
    } catch(e){
      console.error("❌ Failed to load saved theme:", e);
    }
  });

})();
