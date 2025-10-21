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










// (function(){
//   const BTN_ID = "ghl-theme-switcher-btn";
//   const POPUP_ID = "ghl-theme-popup";
  
//   // =========================
//   // CONFIG
//   // =========================
//   const BACKEND_API = "https://custom-kazim-abbas-projects.vercel.app/api";
//   const SUBACCOUNT_LOCATION_ID = "PUT_YOUR_SUBACCOUNT_LOCATION_ID_HERE"; // replace with dynamic locationId

//   let popupRef = null;
//   let btnRef = null;

//   // =========================
//   // Load & apply theme
//   // =========================
//   async function loadTheme(themeId, cdnUrl){
//     localStorage.setItem(`theme-${SUBACCOUNT_LOCATION_ID}`, themeId);

//     // Remove old theme script if exists
//     const old = document.getElementById("dynamic-theme-script");
//     if(old) old.remove();

//     // Add new theme script
//     const s = document.createElement("script");
//     s.id = "dynamic-theme-script";
//     s.src = cdnUrl + "?v=" + Date.now();
//     document.head.appendChild(s);

//     // Save theme selection to backend
//     try {
//       await fetch(`${BACKEND_API}/themes/apply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           locationId: SUBACCOUNT_LOCATION_ID,
//           themeId: themeId
//         })
//       });
//     } catch(e){
//       console.error("❌ Failed to save theme:", e);
//     }

//     closePopup();
//   }

//   // =========================
//   // Create Theme Popup
//   // =========================
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
//       const res = await fetch(`${BACKEND_API}/themes`);
//       const themes = await res.json();

//       themes.data.forEach(theme => {
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
//       const msg = document.createElement("div");
//       msg.textContent = "Failed to load themes.";
//       div.appendChild(msg);
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
//   // Auto-load saved theme from backend
//   // =========================
//   document.addEventListener("DOMContentLoaded", async ()=>{
//     try {
//       const res = await fetch(`${BACKEND_API}/themes/by-location/${SUBACCOUNT_LOCATION_ID}`);
//       const sub = await res.json();

//       if(sub.success && sub.data && sub.data.themeId && sub.data.themeId.cdnUrl){
//         loadTheme(sub.data.themeId._id, sub.data.themeId.cdnUrl);
//       }
//     } catch(e){
//       console.error("❌ Failed to load saved theme:", e);
//     }
//   });

// })();
















//  <script>

// (function() {
//   // Inject CSS
//   const style = document.createElement('style');
//   style.textContent = `
//     :root {
//       --primary: #4361ee;
//       --primary-dark: #3a56d4;
//       --success: #06d6a0;
//       --danger: #ef476f;
//       --dark: #2b2d42;
//       --light: #f8f9fa;
//       --gray: #6c757d;
//       --gray-light: #e9ecef;
//       --border-radius: 12px;
//       --box-shadow: 0 10px 30px rgba(0,0,0,0.15);
//     }
//     *{margin:0;padding:0;box-sizing:border-box;}
//     body{font-family:'Segoe UI',sans-serif;background:#f5f7fa;color:var(--dark);}
//     .theme-widget{position:fixed;bottom:30px;right:30px;width:350px;background:white;border-radius:var(--border-radius);box-shadow:var(--box-shadow);z-index:10000;overflow:hidden;user-select:none;}
//     .theme-widget.minimized{width:60px;height:60px;}
//     .widget-header{background:var(--primary);color:white;padding:15px;cursor:move;display:flex;justify-content:space-between;align-items:center;}
//     .widget-title{display:flex;align-items:center;gap:10px;font-weight:600;}
//     .widget-actions{display:flex;gap:10px;}
//     .widget-action-btn{background:none;border:none;color:white;cursor:pointer;font-size:16px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:background 0.2s;}
//     .widget-action-btn:hover{background:rgba(255,255,255,0.2);}
//     .widget-body{padding:20px;max-height:400px;overflow-y:auto;}
//     .location-info{background:var(--light);padding:15px;border-radius:8px;margin-bottom:20px;text-align:center;}
//     .location-name{font-weight:600;font-size:18px;margin-bottom:5px;}
//     .location-status{display:flex;align-items:center;justify-content:center;gap:8px;font-size:14px;color:var(--gray);}
//     .status-dot{width:10px;height:10px;border-radius:50%;background:var(--success);}
//     .status-dot.inactive{background:var(--gray);}
//     .current-theme{background:white;border:1px solid var(--gray-light);border-radius:8px;padding:15px;margin-bottom:20px;text-align:center;}
//     .current-theme h3{font-size:16px;margin-bottom:10px;color:var(--dark);}
//     .theme-name{font-weight:600;color:var(--primary);font-size:18px;margin-bottom:15px;}
//     .theme-actions{display:flex;gap:10px;justify-content:center;}
//     .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border:none;border-radius:6px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s ease;}
//     .btn:hover{transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.1);}
//     .btn-primary{background:var(--primary);color:white;}
//     .btn-primary:hover{background:var(--primary-dark);}
//     .btn-danger{background:var(--danger);color:white;}
//     .btn-outline{background:transparent;border:1px solid var(--gray-light);color:var(--dark);}
//     .btn-outline:hover{background:var(--gray-light);}
//     .btn-sm{padding:8px 16px;font-size:14px;}
//     .theme-selector{margin-bottom:20px;}
//     .theme-selector h3{font-size:16px;margin-bottom:10px;color:var(--dark);}
//     .theme-options{display:flex;flex-direction:column;gap:10px;max-height:200px;overflow-y:auto;}
//     .theme-option{display:flex;align-items:center;gap:10px;padding:12px;border:1px solid var(--gray-light);border-radius:6px;cursor:pointer;transition:all 0.2s;}
//     .theme-option:hover{border-color:var(--primary);background:rgba(67,97,238,0.05);}
//     .theme-option.active{border-color:var(--primary);background:rgba(67,97,238,0.1);}
//     .theme-preview{width:40px;height:40px;border-radius:6px;background:linear-gradient(135deg,var(--primary) 0%,#7209b7 100%);display:flex;align-items:center;justify-content:center;color:white;font-size:18px;}
//     .theme-details{flex:1;}
//     .theme-details h4{font-size:14px;margin-bottom:4px;}
//     .theme-details p{font-size:12px;color:var(--gray);}
//     .notification{position:fixed;top:20px;right:20px;padding:12px 18px;border-radius:var(--border-radius);color:white;font-weight:600;z-index:1000;box-shadow:var(--box-shadow);transform:translateX(150%);transition:transform 0.3s ease;display:flex;align-items:center;gap:10px;}
//     .notification.show{transform:translateX(0);}
//     .notification.success{background:var(--success);}
//     .notification.error{background:var(--danger);}
//     .notification.info{background:var(--primary);}
//     .minimized .widget-body{display:none;}
//     .widget-footer{padding:15px;border-top:1px solid var(--gray-light);text-align:center;font-size:12px;color:var(--gray);}
//     .loading{display:inline-block;width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-radius:50%;border-top-color:white;animation:spin 1s linear infinite;}
//     @keyframes spin{to{transform:rotate(360deg);}}
//     .background-color-picker{margin-bottom:20px;}
//     .background-color-picker h3{font-size:16px;margin-bottom:10px;color:var(--dark);}
//     .color-picker-controls{display:flex;gap:10px;align-items:center;margin-bottom:15px;}
//     .color-input-group{display:flex;flex:1;gap:8px;}
//     .color-input{flex:1;height:40px;border:1px solid var(--gray-light);border-radius:6px;cursor:pointer;}
//     .color-preview{width:40px;height:40px;border-radius:6px;border:1px solid var(--gray-light);}
//     .color-actions{display:flex;gap:8px;}
//     .preset-colors{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
//     .color-preset{width:100%;aspect-ratio:1;border-radius:6px;border:1px solid var(--gray-light);cursor:pointer;transition:transform 0.2s;}
//     .color-preset:hover{transform:scale(1.05);}
//     .color-preset.active{border:2px solid var(--primary);box-shadow:0 0 0 2px rgba(67,97,238,0.2);}
//     @media(max-width:480px){.theme-widget{width:calc(100vw-40px);right:20px;bottom:20px;}}
//   `;
//   document.head.appendChild(style);

//   // Inject HTML
//   const widget = document.createElement('div');
//   widget.innerHTML = `
//     <div class="theme-widget" id="themeWidget">
//       <div class="widget-header" id="widgetHeader">
//         <div class="widget-title"><i class="fas fa-palette"></i><span>Theme Manager</span></div>
//         <div class="widget-actions">
//           <button class="widget-action-btn" id="minimizeBtn"><i class="fas fa-minus"></i></button>
//           <button class="widget-action-btn" id="closeBtn"><i class="fas fa-times"></i></button>
//         </div>
//       </div>
//       <div class="widget-body">
//         <div class="location-info">
//           <div class="location-name" id="locationName">Loading...</div>
//           <div class="location-status">
//             <div class="status-dot" id="statusDot"></div>
//             <span id="locationStatus">Checking status...</span>
//           </div>
//         </div>
//         <div class="current-theme">
//           <h3>Current Theme</h3>
//           <div class="theme-name" id="currentThemeName">No theme applied</div>
//           <div class="theme-actions">
//             <button class="btn btn-danger btn-sm" id="removeThemeBtn" disabled><i class="fas fa-trash-alt"></i> Remove Theme</button>
//           </div>
//         </div>
//         <div class="background-color-picker">
//           <h3>Background Color</h3>
//           <div class="color-picker-controls">
//             <div class="color-input-group">
//               <input type="color" id="backgroundColorPicker" class="color-input" value="#ffffff">
//               <div id="colorPreview" class="color-preview" style="background-color:#ffffff;"></div>
//             </div>
//             <div class="color-actions">
//               <button class="btn btn-primary btn-sm" id="applyColorBtn"><i class="fas fa-check"></i> Apply</button>
//               <button class="btn btn-outline btn-sm" id="resetColorBtn"><i class="fas fa-undo"></i> Reset</button>
//             </div>
//           </div>
//           <div class="preset-colors">
//             <div class="color-preset" style="background-color:#ffffff;" data-color="#ffffff"></div>
//             <div class="color-preset" style="background-color:#f8f9fa;" data-color="#f8f9fa"></div>
//             <div class="color-preset" style="background-color:#e9ecef;" data-color="#e9ecef"></div>
//             <div class="color-preset" style="background-color:#dee2e6;" data-color="#dee2e6"></div>
//             <div class="color-preset" style="background-color:#4361ee;" data-color="#4361ee"></div>
//             <div class="color-preset" style="background-color:#3a56d4;" data-color="#3a56d4"></div>
//             <div class="color-preset" style="background-color:#7209b7;" data-color="#7209b7"></div>
//             <div class="color-preset" style="background-color:#06d6a0;" data-color="#06d6a0"></div>
//           </div>
//         </div>
//         <div class="theme-selector">
//           <h3>Available Themes</h3>
//           <div class="theme-options" id="themeOptions"></div>
//         </div>
//       </div>
//       <div class="widget-footer">Drag to move • Click to interact</div>
//     </div>
//     <div id="notificationsContainer"></div>
//   `;
//   document.body.appendChild(widget);

//   // Load Font Awesome
//   if (!document.querySelector('link[href*="font-awesome"]')) {
//     const fa = document.createElement('link');
//     fa.rel = 'stylesheet';
//     fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
//     document.head.appendChild(fa);
//   }


// let currentLocation = null;
// let themes = [];
// let isDragging = false;
// let dragOffset = {x:0,y:0};
// let currentPosition = {x:30,y:30};
// let currentBackgroundColor = '#ffffff';

// async function apiCall(endpoint, options={}) {
//     const baseUrl = 'https://ghlengine-production.up.railway.app/api';
//     const url = `${baseUrl}${endpoint}`;

//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': '110',
//         ...options.headers
//     };

//     const config = {
//         method: options.method || 'GET',
//         headers,
//         body: options.body
//     };

//     try {
//         const response = await fetch(url, config);
//         if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         return await response.json();
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// }

// function showNotification(msg, type='info', duration=4000){
//   const container = document.getElementById('notificationsContainer');
//   const notif = document.createElement('div');
//   notif.className = `notification ${type}`;
//   notif.innerHTML = `<i class="fas fa-${type==='success'?'check-circle':type==='error'?'exclamation-circle':'info-circle'}"></i><span>${msg}</span>`;
//   container.appendChild(notif);
//   setTimeout(()=>notif.classList.add('show'),50);
//   setTimeout(()=>{notif.classList.remove('show'); setTimeout(()=>notif.remove(),300);}, duration);
// }

// async function loadUserLocation(){
//   try{
//     showNotification('Loading location...','info');
//     const response = await apiCall('/locations/real-time');
//     if(response.success && response.data){
//       currentLocation = response.data;
//       document.getElementById('locationName').textContent = currentLocation.name;
//       document.getElementById('locationStatus').textContent = 'Active';
//       document.getElementById('statusDot').className = 'status-dot';
      
//       // Load current background color if available
//       if (currentLocation.backgroundColor) {
//         currentBackgroundColor = currentLocation.backgroundColor;
//         document.getElementById('backgroundColorPicker').value = currentBackgroundColor;
//         document.getElementById('colorPreview').style.backgroundColor = currentBackgroundColor;
//       }
      
//       loadCurrentTheme();
//     }else{
//       throw new Error(response.message||'No location data');
//     }
//   }catch(e){
//     console.error('Load location error:', e);
//     document.getElementById('locationStatus').textContent = 'Error';
//     document.getElementById('statusDot').className = 'status-dot inactive';
//     showNotification('Failed to load location','error');
//   }
// }

// async function loadCurrentTheme(){
//   try{
//     if(!currentLocation) return;
//     const response = await apiCall(`/themes/location/${currentLocation.id}`);
//     if(response.success && response.data){
//       currentLocation.currentTheme = response.data;
//       document.getElementById('currentThemeName').textContent = response.data.name;
//       document.getElementById('removeThemeBtn').disabled = false;
//     } else {
//       currentLocation.currentTheme = null;
//       document.getElementById('currentThemeName').textContent = 'No theme applied';
//       document.getElementById('removeThemeBtn').disabled = true;
//     }
//   } catch(e){
//     console.error('Load theme error:', e);
//     currentLocation.currentTheme = null;
//     document.getElementById('currentThemeName').textContent = 'No theme applied';
//     document.getElementById('removeThemeBtn').disabled = true;
//   }
// }

// async function loadThemes(){
//   try{
//     const response = await apiCall('/themes');
//     if(response.success){
//       themes = response.data;
//       populateThemeOptions();
//     }
//   }catch(e){
//     console.error('Load themes error:', e);
//     showNotification('Failed to load themes','error');
//   }
// }

// function populateThemeOptions(){
//   const container = document.getElementById('themeOptions');
//   if(!container) return;
//   if(!themes.length) { container.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)">No themes available</div>'; return; }
//   const currentId = currentLocation?.currentTheme?._id || '';
//   container.innerHTML = themes.map(t => `
//     <div class="theme-option ${t._id===currentId?'active':''}" data-theme-id="${t._id}">
//       <div class="theme-preview" style="background:${t.color||'linear-gradient(135deg, #4361ee 0%, #7209b7 100%)'}"><i class="fas fa-paint-brush"></i></div>
//       <div class="theme-details"><h4>${t.name}</h4><p>${t.description||'Professional theme'}</p></div>
//       <button class="btn btn-primary btn-sm apply-theme-btn" data-theme-id="${t._id}"><i class="fas fa-check"></i> Apply</button>
//     </div>
//   `).join('');

//   document.querySelectorAll('.apply-theme-btn').forEach(btn=>{
//     btn.addEventListener('click',e=>{
//       e.stopPropagation();
//       applyTheme(btn.getAttribute('data-theme-id'));
//     });
//   });
//   document.querySelectorAll('.theme-option').forEach(opt=>{
//     opt.addEventListener('click',()=>applyTheme(opt.getAttribute('data-theme-id')));
//   });
// }

// async function applyTheme(themeId){
//   if(!currentLocation) return showNotification('No location selected','error');
//   try{
//     showNotification('Applying theme...','info');
//     const res = await apiCall('/themes/apply',{ method:'POST', body: JSON.stringify({ locationId: currentLocation.id, themeId }) });
//     if(res.success){ showNotification('Theme applied!','success'); await loadCurrentTheme(); await loadThemes(); }
//     else showNotification(`Failed: ${res.message}`,'error');
//   }catch(e){ console.error(e); showNotification('Error applying theme','error'); }
// }

// async function removeTheme(){
//   if(!currentLocation || !currentLocation.currentTheme) return showNotification('No theme to remove','error');
//   if(!confirm('Are you sure to remove current theme?')) return;
//   try{
//     showNotification('Removing theme...','info');
//     const res = await apiCall('/themes/remove',{ method:'POST', body: JSON.stringify({ locationId: currentLocation.id }) });
//     if(res.success){ showNotification('Theme removed!','success'); await loadCurrentTheme(); await loadThemes(); }
//     else showNotification(`Failed: ${res.message}`,'error');
//   }catch(e){ console.error(e); showNotification('Error removing theme','error'); }
// }

// // Background Color Functions
// function initColorPicker() {
//   const colorPicker = document.getElementById('backgroundColorPicker');
//   const colorPreview = document.getElementById('colorPreview');
//   const applyColorBtn = document.getElementById('applyColorBtn');
//   const resetColorBtn = document.getElementById('resetColorBtn');
//   const colorPresets = document.querySelectorAll('.color-preset');
  
//   // Update preview when color picker changes
//   colorPicker.addEventListener('input', function() {
//     colorPreview.style.backgroundColor = this.value;
//   });
  
//   // Apply background color
//   applyColorBtn.addEventListener('click', async function() {
//     if (!currentLocation) return showNotification('No location selected', 'error');
    
//     try {
//       showNotification('Applying background color...', 'info');
//       const newColor = colorPicker.value;
      
//       // Update the background color via API
//       const res = await apiCall(`/locations/${currentLocation.id}/background-color`, {
//         method: 'PUT',
//         body: JSON.stringify({ backgroundColor: newColor })
//       });
      
//       if (res.success) {
//         currentBackgroundColor = newColor;
//         showNotification('Background color applied!', 'success');
        
//         // Apply the color to the current page for preview
//         document.body.style.backgroundColor = newColor;
//       } else {
//         showNotification(`Failed: ${res.message}`, 'error');
//       }
//     } catch (e) {
//       console.error('Apply color error:', e);
//       showNotification('Error applying background color', 'error');
//     }
//   });
  
//   // Reset background color
//   resetColorBtn.addEventListener('click', async function() {
//     if (!currentLocation) return showNotification('No location selected', 'error');
    
//     try {
//       showNotification('Resetting background color...', 'info');
      
//       // Reset the background color via API
//       const res = await apiCall(`/locations/${currentLocation.id}/background-color`, {
//         method: 'DELETE'
//       });
      
//       if (res.success) {
//         currentBackgroundColor = '#ffffff';
//         colorPicker.value = '#ffffff';
//         colorPreview.style.backgroundColor = '#ffffff';
//         document.body.style.backgroundColor = '#f5f7fa'; // Reset to default
//         showNotification('Background color reset!', 'success');
//       } else {
//         showNotification(`Failed: ${res.message}`, 'error');
//       }
//     } catch (e) {
//       console.error('Reset color error:', e);
//       showNotification('Error resetting background color', 'error');
//     }
//   });
  
//   // Color presets
//   colorPresets.forEach(preset => {
//     preset.addEventListener('click', function() {
//       const color = this.getAttribute('data-color');
//       colorPicker.value = color;
//       colorPreview.style.backgroundColor = color;
      
//       // Remove active class from all presets
//       colorPresets.forEach(p => p.classList.remove('active'));
//       // Add active class to clicked preset
//       this.classList.add('active');
//     });
//   });
// }

// // Drag widget
// function initDrag(){
//   const widget = document.getElementById('themeWidget');
//   const header = document.getElementById('widgetHeader');
//   header.addEventListener('mousedown',startDrag); header.addEventListener('touchstart',startDrag);
//   function startDrag(e){
//     e.preventDefault(); isDragging=true;
//     const clientX=e.clientX||e.touches[0].clientX;
//     const clientY=e.clientY||e.touches[0].clientY;
//     const rect = widget.getBoundingClientRect();
//     dragOffset.x = clientX-rect.left; dragOffset.y = clientY-rect.top;
//     document.addEventListener('mousemove',onDrag); document.addEventListener('touchmove',onDrag);
//     document.addEventListener('mouseup',stopDrag); document.addEventListener('touchend',stopDrag);
//   }
//   function onDrag(e){
//     if(!isDragging) return;
//     const clientX=e.clientX||e.touches[0].clientX;
//     const clientY=e.clientY||e.touches[0].clientY;
//     currentPosition.x = clientX - dragOffset.x;
//     currentPosition.y = clientY - dragOffset.y;
//     const maxX = window.innerWidth-widget.offsetWidth;
//     const maxY = window.innerHeight-widget.offsetHeight;
//     currentPosition.x=Math.max(0,Math.min(currentPosition.x,maxX));
//     currentPosition.y=Math.max(0,Math.min(currentPosition.y,maxY));
//     widget.style.left=currentPosition.x+'px'; widget.style.top=currentPosition.y+'px'; widget.style.right='auto'; widget.style.bottom='auto';
//   }
//   function stopDrag(){ isDragging=false; document.removeEventListener('mousemove',onDrag); document.removeEventListener('touchmove',onDrag); document.removeEventListener('mouseup',stopDrag); document.removeEventListener('touchend',stopDrag); }
// }

// // Widget buttons
// function initControls(){
//   const widget = document.getElementById('themeWidget');
//   const minimizeBtn = document.getElementById('minimizeBtn');
//   const closeBtn = document.getElementById('closeBtn');
//   const removeBtn = document.getElementById('removeThemeBtn');

//   minimizeBtn.addEventListener('click',e=>{
//     e.stopPropagation(); widget.classList.toggle('minimized');
//     minimizeBtn.innerHTML = widget.classList.contains('minimized')?'<i class="fas fa-plus"></i>':'<i class="fas fa-minus"></i>';
//   });

//   closeBtn.addEventListener('click',e=>{
//     e.stopPropagation(); widget.style.display='none';
//     setTimeout(()=>widget.style.display='block',5000);
//     showNotification('Widget hidden. Reappears in 5s','info');
//   });

//   removeBtn.addEventListener('click',removeTheme);
// }

// // Init
// document.addEventListener('DOMContentLoaded',async()=>{
//   initDrag(); 
//   initControls(); 
//   initColorPicker();
//   await loadUserLocation(); 
//   await loadThemes();
// });

// })();
// </script>















// (function(){
//     // =========================
//     // Configuration - Updated with caching
//     // =========================
//     const CONFIG = {
//         BTN_ID: "ghl-theme-builder-btn",
//         POPUP_ID: "ghl-theme-builder-popup",
//         STYLE_ID: "ghl-theme-style",
//         PREVIEW_STYLE_ID: "ghl-theme-preview",
//         BACKEND_API: "https://ghlengine-production.up.railway.app/api",
//         AUTH_TOKEN: "110",
//         VERSION: "3.2.0", // Updated version
//         CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache
//         DEBOUNCE_DELAY: 300 // ms for preview debouncing
//     };

//     // =========================
//     // State Management - Updated with cache
//     // =========================
//     const state = {
//         btnRef: null,
//         popupRef: null,
//         currentTheme: null,
//         currentLocation: null,
//         themes: [],
//         accessInfo: null,
//         isLoading: false,
//         isInitialized: false,
//         isPreviewing: false,
//         previewTheme: null,
//         cache: {
//             themes: null,
//             themesTimestamp: 0,
//             currentTheme: null,
//             currentThemeTimestamp: 0
//         }
//     };

//     // =========================
//     // Cache Service for Speed Optimization
//     // =========================
//     const cacheService = {
//         getThemes() {
//             if (state.cache.themes && 
//                 Date.now() - state.cache.themesTimestamp < CONFIG.CACHE_DURATION) {
//                 console.log('📦 Using cached themes');
//                 return state.cache.themes;
//             }
//             return null;
//         },

//         setThemes(themes) {
//             state.cache.themes = themes;
//             state.cache.themesTimestamp = Date.now();
//         },

//         getCurrentTheme() {
//             if (state.cache.currentTheme && 
//                 Date.now() - state.cache.currentThemeTimestamp < CONFIG.CACHE_DURATION) {
//                 console.log('📦 Using cached current theme');
//                 return state.cache.currentTheme;
//             }
//             return null;
//         },

//         setCurrentTheme(theme) {
//             state.cache.currentTheme = theme;
//             state.cache.currentThemeTimestamp = Date.now();
//         },

//         clearCache() {
//             state.cache.themes = null;
//             state.cache.themesTimestamp = 0;
//             state.cache.currentTheme = null;
//             state.cache.currentThemeTimestamp = 0;
//             console.log('🗑️ Cache cleared');
//         }
//     };

//     // =========================
//     // Debounce Service for Performance
//     // =========================
//     const debounceService = {
//         debounce(func, wait) {
//             let timeout;
//             return function executedFunction(...args) {
//                 const later = () => {
//                     clearTimeout(timeout);
//                     func(...args);
//                 };
//                 clearTimeout(timeout);
//                 timeout = setTimeout(later, wait);
//             };
//         }
//     };

//     // =========================
//     // URL Location Detection Service
//     // =========================
//     const urlLocationService = {
//         extractLocationIdFromURL() {
//             try {
//                 const currentURL = window.location.href;
                
//                 // Match GHL URL pattern: /location/{locationId}/launchpad
//                 const urlPattern = /\/location\/([^\/]+)\/launchpad/;
//                 const match = currentURL.match(urlPattern);
                
//                 if (match && match[1]) {
//                     const locationId = match[1];
//                     return locationId;
//                 }
                
//                 return null;
//             } catch (error) {
//                 console.error('❌ Error extracting location from URL:', error);
//                 return null;
//             }
//         },

//         getCurrentLocationName() {
//             try {
//                 const selectors = [
//                     '.hl_switcher-loc-name',
//                     '[data-location-name]',
//                     '.location-name',
//                     '.current-location'
//                 ];

//                 for (let selector of selectors) {
//                     const element = document.querySelector(selector);
//                     if (element && element.textContent) {
//                         const name = element.textContent.trim();
//                         if (name && name.length > 0 && name !== 'GHL') {
//                             return name;
//                         }
//                     }
//                 }

//                 return 'Current Location';
//             } catch (error) {
//                 console.error('❌ Error getting location name from DOM:', error);
//                 return 'Current Location';
//             }
//         },

//         getCurrentLocation() {
//             const locationId = this.extractLocationIdFromURL();
//             if (!locationId) {
//                 return null;
//             }

//             return {
//                 locationId: locationId,
//                 name: this.getCurrentLocationName(),
//                 url: window.location.href
//             };
//         },

//         // Monitor URL changes for SPA navigation
//         startUrlChangeMonitoring() {
//             let currentUrl = window.location.href;
            
//             const observeUrlChanges = () => {
//                 const newUrl = window.location.href;
//                 if (newUrl !== currentUrl) {
//                     currentUrl = newUrl;
                    
//                     // Check if we're on a location page and reload theme if needed
//                     const newLocation = this.getCurrentLocation();
//                     if (newLocation && newLocation.locationId) {
//                         console.log('📍 New location detected in URL, reloading theme...');
//                         cacheService.clearCache(); // Clear cache on location change
//                         themeManager.loadCurrentTheme();
//                     } else {
//                         // Not on a location page, remove theme
//                         themeCSSService.removeThemeCSS();
//                         state.currentTheme = null;
//                         cacheService.setCurrentTheme(null);
//                     }
//                 }
//             };

//             // Check for URL changes every second
//             setInterval(observeUrlChanges, 1000);
//         }
//     };

//     // =========================
//     // API Service - Enhanced with better error handling
//     // =========================
//     const apiService = {
//         async call(endpoint, options = {}) {
//             const url = `${CONFIG.BACKEND_API}${endpoint}`;
//             const headers = {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${CONFIG.AUTH_TOKEN}`,
//                 ...options.headers
//             };

//             const config = {
//                 method: options.method || 'GET',
//                 headers,
//                 ...(options.body && { body: JSON.stringify(options.body) })
//             };

//             try {
//                 const response = await fetch(url, config);
//                 const data = await response.json();
                
//                 if (!response.ok) {
//                     console.error(`❌ API Error ${endpoint}:`, {
//                         status: response.status,
//                         statusText: response.statusText,
//                         data: data
//                     });
                    
//                     const errorMessage = data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
//                     throw new Error(errorMessage);
//                 }
                
//                 return data;
//             } catch (error) {
//                 console.error(`❌ API Error ${endpoint}:`, error);
//                 throw error;
//             }
//         },

//         // Enhanced createTheme with validation and fixed payload
//         async createTheme(themeData) {
//             // Validate required fields
//             const requiredFields = ['name', 'locationId', 'textColor', 'backgroundColor', 'fontFamily'];
//             const missingFields = requiredFields.filter(field => !themeData[field]);
            
//             if (missingFields.length > 0) {
//                 throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
//             }

//             // Clean up data for backend - FIX for 400 error
//             const cleanedData = {
//                 ...themeData,
//                 backgroundColor: themeData.backgroundColor.replace('33', ''), // Remove alpha channel
//                 fontFamily: themeData.fontFamily.split(',')[0].trim(), // Only first font family
//                 isActive: true,
//                 isGlobal: false
//             };

//             return this.call('/themes', {
//                 method: 'POST',
//                 body: cleanedData
//             });
//         },

//         // Enhanced removeTheme with better error handling for 500 errors
//         async removeThemeFromLocation(locationId) {
//             if (!locationId) throw new Error('No location ID provided');
            
//             try {
//                 return await this.call('/themes/remove', {
//                     method: 'POST',
//                     body: { locationId: locationId }
//                 });
//             } catch (error) {
//                 // If it's a 500 error, we'll handle it gracefully
//                 if (error.message.includes('500')) {
//                     console.warn('⚠️ Backend returned 500 on theme removal, but proceeding...');
//                     return { success: true, message: 'Theme removed locally due to backend error' };
//                 }
//                 throw error;
//             }
//         },

//         // Keep other methods
//         async getAccessStatus(locationId) {
//             if (!locationId) throw new Error('No location ID provided');
//             return this.call(`/access/status/${locationId}`);
//         },

//         async getAllThemes() {
//             return this.call('/themes');
//         },

//         async getThemeById(themeId) {
//             return this.call(`/themes/${themeId}`);
//         },

//         async applyThemeToLocation(themeId, locationId) {
//             if (!locationId) throw new Error('No location ID provided');
//             return this.call('/themes/apply', {
//                 method: 'POST',
//                 body: {
//                     locationId: locationId,
//                     themeId: themeId
//                 }
//             });
//         },

//         async getThemeByLocation(locationId) {
//             if (!locationId) throw new Error('No location ID provided');
//             return this.call(`/themes/by-location/${locationId}`);
//         },

//         async updateTheme(themeId, themeData) {
//             return this.call(`/themes/${themeId}`, {
//                 method: 'PUT',
//                 body: themeData
//             });
//         }
//     };

//     // =========================
//     // Access Control Service
//     // =========================
//     const accessService = {
//         async checkThemeBuilderAccess() {
//             try {
//                 // Get current location from URL
//                 const currentLocation = urlLocationService.getCurrentLocation();
//                 if (!currentLocation || !currentLocation.locationId) {
//                     throw new Error('Could not detect current GHL location from URL');
//                 }

//                 // Check access status via API
//                 const accessResponse = await apiService.getAccessStatus(currentLocation.locationId);
//                 if (!accessResponse.success || !accessResponse.data) {
//                     throw new Error('Access status API call failed');
//                 }

//                 const accessInfo = accessResponse.data;
//                 const isPermitted = accessInfo.themeBuilderAccess === true;

//                 return {
//                     permitted: isPermitted,
//                     location: currentLocation,
//                     accessInfo: accessInfo
//                 };

//             } catch (error) {
//                 console.error('❌ Access check failed:', error);
//                 return {
//                     permitted: false,
//                     location: null,
//                     accessInfo: null,
//                     error: error.message
//                 };
//             }
//         }
//     };

//     // =========================
//     // Theme CSS Service
//     // =========================
//     const themeCSSService = {
//         generateCSS(theme, isPreview = false) {
//             if (!theme) return '';
            
//             const variables = {
//                 textColor: theme.textColor || '#ffffff',
//                 backgroundColor: theme.backgroundColor || 'rgba(255, 255, 255, 0.33)',
//                 fontFamily: theme.fontFamily || 'Roboto, sans-serif',
//                 sidebarGradientStart: theme.sidebarGradientStart || '#8e2de2',
//                 sidebarGradientEnd: theme.sidebarGradientEnd || '#4a00e0',
//                 headerGradientStart: theme.headerGradientStart || '#8e2de2',
//                 headerGradientEnd: theme.headerGradientEnd || '#4a00e0'
//             };

//             const comment = isPreview ? 'PREVIEW' : 'ACTIVE';
            
//             return `
// /* GHL Theme Builder v${CONFIG.VERSION} - ${comment} - Location: ${state.currentLocation?.locationId} */
// :root {
//     --ghl-text-color: ${variables.textColor};
//     --ghl-bg-color: ${variables.backgroundColor};
//     --ghl-font-family: ${variables.fontFamily};
//     --ghl-sidebar-start: ${variables.sidebarGradientStart};
//     --ghl-sidebar-end: ${variables.sidebarGradientEnd};
//     --ghl-header-start: ${variables.headerGradientStart};
//     --ghl-header-end: ${variables.headerGradientEnd};
// }

// .transition-slowest .flex-col > .overflow-hidden {
//     background: linear-gradient(135deg, var(--ghl-sidebar-start) 0%, var(--ghl-sidebar-end) 100%) !important;
// }

// .sidebar-v2-location .hl_header .container-fluid {
//     background: linear-gradient(135deg, var(--ghl-header-start) 0%, var(--ghl-header-end) 100%) !important;
// }

// .notification-banner-top-bar {
//     background: linear-gradient(135deg, var(--ghl-header-start) 0%, var(--ghl-header-end) 100%) !important;
// }

// .crm-opportunities-status .hl-text,
// .notification-title-message,
// .sidebar-v2-location .hl_force-block,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-placeholder,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-icon,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-shortcut,
// .hl_switcher-loc-name,
// .sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
//     color: var(--ghl-text-color) !important;
// }

// .hl_switcher-loc-name,
// .sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
//     font-family: var(--ghl-font-family) !important;
//     font-weight: 400 !important;
// }

// .sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener,
// .sidebar-v2-location #sidebar-v2 #quickActions,
// .sidebar-v2-location #sidebar-v2 #backButtonv2,
// #sb_conversation_ai_settings_v2 .hl_new_badge,
// #sb_knowledge-base-settings .hl_new_badge,
// #sb_objects .hl_new_badge,
// #sb_labs .hl_new_badge,
// #sb_brand-boards .hl_new_badge {
//     background-color: var(--ghl-bg-color) !important;
// }

// #notification_banner-btn-close .h-5 {
//     background-color: var(--ghl-text-color) !important;
// }
//             `;
//         },

//         applyThemeCSS(theme) {
//             // Remove existing theme style
//             this.removeThemeCSS();
            
//             if (theme) {
//                 const css = this.generateCSS(theme);
//                 const style = document.createElement('style');
//                 style.id = CONFIG.STYLE_ID;
//                 style.textContent = css;
//                 document.head.appendChild(style);
//                 return true;
//             }
//             return false;
//         },

//         removeThemeCSS() {
//             const existingStyle = document.getElementById(CONFIG.STYLE_ID);
//             if (existingStyle) {
//                 existingStyle.remove();
//             }
//         },

//         previewThemeCSS(theme) {
//             // Remove existing preview
//             this.removePreviewCSS();
            
//             if (theme) {
//                 const css = this.generateCSS(theme, true);
//                 const style = document.createElement('style');
//                 style.id = CONFIG.PREVIEW_STYLE_ID;
//                 style.textContent = css;
//                 document.head.appendChild(style);
//                 state.isPreviewing = true;
//                 state.previewTheme = theme;
//             }
//         },

//         removePreviewCSS() {
//             const previewStyle = document.getElementById(CONFIG.PREVIEW_STYLE_ID);
//             if (previewStyle) {
//                 previewStyle.remove();
//                 state.isPreviewing = false;
//                 state.previewTheme = null;
//             }
//         },

//         // Apply current theme (used after preview or on load)
//         applyCurrentTheme() {
//             if (state.currentTheme) {
//                 this.applyThemeCSS(state.currentTheme);
//             } else {
//                 this.removeThemeCSS();
//             }
//         }
//     };

//     // =========================
//     // Theme Management Service - Optimized with caching and API fixes
//     // =========================
//     const themeManager = {
//         async loadThemes() {
//             // Check cache first for speed
//             const cachedThemes = cacheService.getThemes();
//             if (cachedThemes) {
//                 state.themes = cachedThemes;
//                 return state.themes;
//             }

//             try {
//                 state.isLoading = true;
//                 const response = await apiService.getAllThemes();

//                 if (response.success) {
//                     // Handle different response structures
//                     let themesArray = [];
                    
//                     if (Array.isArray(response.data)) {
//                         themesArray = response.data;
//                     } else if (Array.isArray(response.themes)) {
//                         themesArray = response.themes;
//                     } else if (response.data && Array.isArray(response.data.themes)) {
//                         themesArray = response.data.themes;
//                     } else {
//                         themesArray = [response.data || response.theme].filter(Boolean);
//                     }

//                     state.themes = themesArray;
//                     cacheService.setThemes(themesArray);
//                     console.log(`📦 Loaded ${state.themes.length} themes from backend`);
//                     return state.themes;
//                 }

//                 throw new Error('Invalid themes response from backend');
//             } catch (error) {
//                 console.error('❌ Failed to load themes from backend:', error);
//                 state.themes = [];
//                 return [];
//             } finally {
//                 state.isLoading = false;
//             }
//         },

//         async applyTheme(themeId) {
//             try {
//                 if (!state.currentLocation) throw new Error('No current location detected');

//                 const locationId = state.currentLocation.locationId;

//                 // Get theme details from backend
//                 const response = await apiService.getThemeById(themeId);
//                 let theme = null;
                
//                 if (response.success) {
//                     theme = response.data || response.theme;
//                 }
                
//                 if (!theme) throw new Error('Theme not found in database');

//                 const applyResponse = await apiService.applyThemeToLocation(themeId, locationId);
//                 if (applyResponse.success) {
//                     state.currentTheme = theme;
//                     cacheService.setCurrentTheme(theme);
//                     themeCSSService.applyThemeCSS(theme);
//                     console.log(`✅ Theme "${theme.name}" applied to location ${locationId} via backend`);
//                     return true;
//                 } else {
//                     throw new Error('Backend failed to apply theme to location');
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to apply theme:', error);
//                 throw error;
//             }
//         },

//         async removeTheme() {
//             try {
//                 if (!state.currentLocation) throw new Error('No current location detected');
//                 if (!state.currentTheme) {
//                     console.log('ℹ️ No theme to remove');
//                     return true;
//                 }

//                 const locationId = state.currentLocation.locationId;

//                 const removeResponse = await apiService.removeThemeFromLocation(locationId);
//                 if (removeResponse.success) {
//                     state.currentTheme = null;
//                     cacheService.setCurrentTheme(null);
//                     themeCSSService.removeThemeCSS();
//                     console.log(`✅ Theme removed from location ${locationId} via backend`);
//                     return true;
//                 } else {
//                     // If backend fails but we have a 500 error, still remove locally
//                     if (removeResponse.error && removeResponse.error.includes('500')) {
//                         console.warn('⚠️ Backend returned 500, but removing theme locally');
//                         state.currentTheme = null;
//                         cacheService.setCurrentTheme(null);
//                         themeCSSService.removeThemeCSS();
//                         return true;
//                     }
//                     throw new Error('Backend failed to remove theme from location');
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to remove theme:', error);
//                 // Even if backend fails, remove locally
//                 state.currentTheme = null;
//                 cacheService.setCurrentTheme(null);
//                 themeCSSService.removeThemeCSS();
//                 throw error;
//             }
//         },

//         async loadCurrentTheme() {
//             try {
//                 if (!state.currentLocation) {
//                     console.log('❌ No current location for theme loading');
//                     return;
//                 }

//                 // Check cache first for speed
//                 const cachedTheme = cacheService.getCurrentTheme();
//                 if (cachedTheme) {
//                     state.currentTheme = cachedTheme;
//                     themeCSSService.applyThemeCSS(cachedTheme);
//                     return;
//                 }

//                 const locationId = state.currentLocation.locationId;
//                 const themeResponse = await apiService.getThemeByLocation(locationId);
                
//                 let theme = null;
//                 if (themeResponse.success) {
//                     theme = themeResponse.theme || themeResponse.data;
//                 }

//                 if (theme && theme._id) {
//                     await this.setCurrentTheme(theme);
//                 } else {
//                     state.currentTheme = null;
//                     cacheService.setCurrentTheme(null);
//                     themeCSSService.removeThemeCSS();
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to load current theme from backend:', error);
//                 state.currentTheme = null;
//                 cacheService.setCurrentTheme(null);
//                 themeCSSService.removeThemeCSS();
//             }
//         },

//         async setCurrentTheme(theme) {
//             if (!theme) return;
//             state.currentTheme = theme;
//             cacheService.setCurrentTheme(theme);
//             themeCSSService.applyThemeCSS(theme);
//         },

//         async createCustomTheme(themeData) {
//             try {
//                 if (!state.currentLocation) throw new Error('No current location detected');

//                 const locationId = state.currentLocation.locationId;

//                 // FIXED: Use backend-compatible payload structure
//                 const completeThemeData = {
//                     name: themeData.name,
//                     description: themeData.description || "Custom theme created through theme builder",
//                     locationId: locationId,
//                     userId: CONFIG.AUTH_TOKEN,
//                     companyId: "default-company", // Fixed: Use string directly
//                     textColor: themeData.textColor,
//                     backgroundColor: themeData.backgroundColor,
//                     fontFamily: themeData.fontFamily,
//                     sidebarGradientStart: themeData.sidebarGradientStart,
//                     sidebarGradientEnd: themeData.sidebarGradientEnd,
//                     headerGradientStart: themeData.headerGradientStart,
//                     headerGradientEnd: themeData.headerGradientEnd,
//                     category: "dashboard",
//                     isActive: true,
//                     isGlobal: false
//                 };

//                 const createResponse = await apiService.createTheme(completeThemeData);
//                 let createdTheme = null;
                
//                 if (createResponse.success) {
//                     createdTheme = createResponse.data || createResponse.theme;
//                 }

//                 if (createdTheme) {
//                     console.log(`✅ Custom theme created in backend: ${themeData.name}`);

//                     // Clear cache and reload
//                     cacheService.clearCache();
//                     await this.loadThemes();
//                     await this.applyTheme(createdTheme._id);

//                     return createdTheme;
//                 } else {
//                     throw new Error('Backend failed to create theme: ' + (createResponse.message || 'Unknown error'));
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to create custom theme in backend:', error);
//                 throw error;
//             }
//         },

//         // Debounced preview for better performance
//         previewTheme: debounceService.debounce((theme) => {
//             themeCSSService.previewThemeCSS(theme);
//         }, CONFIG.DEBOUNCE_DELAY),

//         cancelPreview() {
//             themeCSSService.removePreviewCSS();
//             themeCSSService.applyCurrentTheme();
//         }
//     };

//     // =========================
//     // UI Service - Updated with better error handling
//     // =========================
//     const uiService = {
//         showNotification(message, type = 'info') {
//             const notification = document.createElement('div');
//             notification.className = 'ghl-notification';
//             notification.innerHTML = `
//                 <div style="display: flex; align-items: center; gap: 8px;">
//                     <span>${this.getNotificationIcon(type)}</span>
//                     <span>${message}</span>
//                 </div>
//             `;
            
//             Object.assign(notification.style, {
//                 position: 'fixed',
//                 top: '20px',
//                 right: '20px',
//                 background: this.getNotificationColor(type),
//                 color: '#ffffff',
//                 padding: '12px 20px',
//                 borderRadius: '8px',
//                 zIndex: 100003,
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                 transform: 'translateX(100%)',
//                 transition: 'transform 0.3s ease'
//             });
            
//             document.body.appendChild(notification);
            
//             setTimeout(() => notification.style.transform = 'translateX(0)', 10);
//             setTimeout(() => {
//                 notification.style.transform = 'translateX(100%)';
//                 setTimeout(() => notification.remove(), 300);
//             }, 3000);
//         },

//         getNotificationIcon(type) {
//             const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
//             return icons[type] || icons.info;
//         },

//         getNotificationColor(type) {
//             const colors = {
//                 success: '#10B981',
//                 error: '#DC2626',
//                 warning: '#F59E0B',
//                 info: '#2563EB'
//             };
//             return colors[type] || colors.info;
//         },

//         createFloatingButton() {
//             if (state.btnRef) return state.btnRef;
            
//             const button = document.createElement('div');
//             button.id = CONFIG.BTN_ID;
//             button.innerHTML = '🎨 Themes';
            
//             Object.assign(button.style, {
//                 position: 'fixed',
//                 top: '20px',
//                 right: '20px',
//                 padding: '12px 16px',
//                 background: '#2563EB',
//                 color: '#ffffff',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 zIndex: 99999,
//                 fontSize: '14px',
//                 fontWeight: '600',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                 transition: 'all 0.2s ease',
//                 userSelect: 'none'
//             });

//             button.addEventListener('mouseenter', () => {
//                 button.style.background = '#1d4ed8';
//                 button.style.transform = 'translateY(-2px)';
//             });
            
//             button.addEventListener('mouseleave', () => {
//                 button.style.background = '#2563EB';
//                 button.style.transform = 'translateY(0)';
//             });

//             button.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 this.openPopup();
//             });
            
//             document.body.appendChild(button);
//             state.btnRef = button;
//             return button;
//         },

//         async openPopup() {
//             await this.createPopup();
//             if (state.popupRef) {
//                 state.popupRef.style.display = 'block';
//                 await this.updatePopupContent();
//             }
//         },

//         closePopup() {
//             if (state.popupRef) {
//                 state.popupRef.style.display = 'none';
//                 // Cancel any active preview when closing popup
//                 themeManager.cancelPreview();
//             }
//         },

//         async createPopup() {
//             if (state.popupRef) return state.popupRef;
            
//             const popup = document.createElement('div');
//             popup.id = CONFIG.POPUP_ID;
            
//             Object.assign(popup.style, {
//                 display: 'none',
//                 position: 'fixed',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 background: '#ffffff',
//                 padding: '24px',
//                 borderRadius: '12px',
//                 boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
//                 zIndex: 100000,
//                 maxWidth: '500px',
//                 width: '90%',
//                 maxHeight: '80vh',
//                 overflowY: 'auto',
//                 border: '1px solid #e5e7eb',
//                 fontFamily: 'system-ui, -apple-system, sans-serif'
//             });

//             document.body.appendChild(popup);
//             state.popupRef = popup;
            
//             document.addEventListener('click', (event) => {
//                 if (popup.style.display === 'block' && 
//                     !popup.contains(event.target) && 
//                     event.target.id !== CONFIG.BTN_ID) {
//                     this.closePopup();
//                 }
//             });

//             return popup;
//         },

//         async updatePopupContent() {
//             if (!state.popupRef) return;

//             const currentLocationId = state.currentLocation?.locationId;
//             const currentLocationName = state.currentLocation?.name || 'Detecting...';
//             const accessStatus = state.accessInfo?.themeBuilderAccess ? '✅ Enabled' : '❌ Disabled';

//             state.popupRef.innerHTML = `
//                 <div style="margin-bottom: 24px;">
//                     <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 20px; font-weight: 600;">
//                         🎨 GHL Theme Builder
//                     </h3>
//                     <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">
//                         <div><strong>Current Location:</strong> ${currentLocationName}</div>
//                         <div><strong>Location ID:</strong> ${currentLocationId || 'Not detected'}</div>
//                         <div><strong>Theme Builder Access:</strong> ${accessStatus}</div>
//                         ${state.currentTheme ? 
//                             `<div style="color: #10B981; margin-top: 4px;">
//                                 <strong>Current Theme:</strong> ${state.currentTheme.name}
//                             </div>` : 
//                             '<div style="color: #DC2626; margin-top: 4px;">No theme applied to this location</div>'
//                         }
//                         ${state.isPreviewing ? 
//                             '<div style="color: #F59E0B; margin-top: 4px;"><strong>👀 Preview Mode Active</strong></div>' : 
//                             ''
//                         }
//                     </div>
//                 </div>

//                 <div style="margin-bottom: 20px;">
//                     <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">
//                         Available Themes <small style="color: #6b7280; font-weight: 400;">(Hover to preview)</small>
//                     </h4>
//                     <div id="theme-buttons-container" style="min-height: 100px; max-height: 300px; overflow-y: auto;">
//                         <div style="text-align: center; color: #6b7280; padding: 20px;">
//                             Loading themes from backend...
//                         </div>
//                     </div>
//                 </div>

//                 <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
//                     <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                         <button id="refresh-data" 
//                                 style="flex: 1; padding: 12px; background: #059669; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
//                             🔄 Refresh
//                         </button>
//                         <button id="create-custom-theme" 
//                                 style="flex: 1; padding: 12px; background: #8B5CF6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
//                             🎨 Create Custom
//                         </button>
//                         ${state.currentTheme ? `
//                             <button id="remove-theme" 
//                                     style="flex: 1; padding: 12px; background: #DC2626; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
//                                 🗑️ Remove
//                             </button>
//                         ` : ''}
//                         <button id="close-popup" 
//                                 style="flex: 1; padding: 12px; background: transparent; color: #6b7280; border: 1px solid #d1d5db; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             `;

//             this.attachPopupEventListeners();
//             await this.loadThemesIntoPopup();
//         },

//         attachPopupEventListeners() {
//             const refreshBtn = document.getElementById('refresh-data');
//             const createBtn = document.getElementById('create-custom-theme');
//             const closeBtn = document.getElementById('close-popup');
//             const removeBtn = document.getElementById('remove-theme');

//             if (refreshBtn) {
//                 refreshBtn.addEventListener('click', () => this.refreshAllData());
//             }

//             if (createBtn) {
//                 createBtn.addEventListener('click', () => this.openCustomizer());
//             }

//             if (closeBtn) {
//                 closeBtn.addEventListener('click', () => this.closePopup());
//             }

//             if (removeBtn) {
//                 removeBtn.addEventListener('click', () => this.confirmRemoveTheme());
//             }
//         },

//         async refreshAllData() {
//             this.showNotification('Refreshing data from backend...', 'info');
            
//             try {
//                 // Clear cache on refresh
//                 cacheService.clearCache();
                
//                 // Re-check access with current URL location
//                 const accessCheck = await accessService.checkThemeBuilderAccess();
                
//                 if (accessCheck.permitted && accessCheck.location) {
//                     state.currentLocation = accessCheck.location;
//                     state.accessInfo = accessCheck.accessInfo;
                    
//                     // Load in parallel for better performance
//                     await Promise.all([
//                         themeManager.loadThemes(),
//                         themeManager.loadCurrentTheme()
//                     ]);
                    
//                     await this.updatePopupContent();
//                     this.showNotification('Data refreshed from backend!', 'success');
//                 } else {
//                     this.showNotification('Access check failed after refresh', 'error');
//                 }
//             } catch (error) {
//                 this.showNotification(`Refresh failed: ${error.message}`, 'error');
//             }
//         },

//         async loadThemesIntoPopup() {
//             const container = document.getElementById('theme-buttons-container');
//             if (!container) return;

//             try {
//                 await themeManager.loadThemes();
                
//                 if (state.themes.length === 0) {
//                     container.innerHTML = `
//                         <div style="text-align: center; color: #6b7280; padding: 20px;">
//                             No themes found in backend database.
//                         </div>
//                     `;
//                     return;
//                 }

//                 container.innerHTML = state.themes.map(theme => {
//                     const isActive = state.currentTheme && state.currentTheme._id === theme._id;
//                     const color = theme.sidebarGradientStart || '#2563EB';
                    
//                     return `
//                         <div class="theme-item" data-theme-id="${theme._id}"
//                              style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin: 8px 0; padding: 12px; border-radius: 8px; border: ${isActive ? '2px solid #10B981' : '1px solid #e5e7eb'}; background: ${isActive ? '#f0fdf4' : '#f9fafb'}; cursor: pointer; transition: all 0.2s ease;">
//                             <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
//                                 <div style="width: 16px; height: 16px; border-radius: 50%; background: ${color};"></div>
//                                 <div style="font-weight: 500;">${theme.name}</div>
//                             </div>
//                             ${isActive ? '<span style="color: #10B981; font-weight: 600;">Active</span>' : ''}
//                         </div>
//                     `;
//                 }).join('');

//                 // Add event listeners with hover preview
//                 container.querySelectorAll('.theme-item').forEach(item => {
//                     const themeId = item.getAttribute('data-theme-id');
//                     const theme = state.themes.find(t => t._id === themeId);
                    
//                     // Hover preview
//                     item.addEventListener('mouseenter', () => {
//                         themeManager.previewTheme(theme);
//                     });

//                     item.addEventListener('mouseleave', () => {
//                         themeManager.cancelPreview();
//                     });

//                     // Click to apply
//                     item.addEventListener('click', () => {
//                         themeManager.applyTheme(themeId)
//                             .then(() => {
//                                 this.showNotification(`"${theme.name}" applied to ${state.currentLocation.name}!`, 'success');
//                                 this.updatePopupContent();
//                             })
//                             .catch(error => {
//                                 this.showNotification(`Failed to apply theme: ${error.message}`, 'error');
//                             });
//                     });
//                 });

//             } catch (error) {
//                 container.innerHTML = `
//                     <div style="text-align: center; color: #DC2626; padding: 20px;">
//                         Failed to load themes from backend: ${error.message}
//                     </div>
//                 `;
//             }
//         },

//         openCustomizer() {
//             // Simple custom theme creation for demo
//             const themeName = `Custom Theme ${new Date().toLocaleDateString()}`;
            
//             // FIXED: Use backend-compatible values to prevent 400 error
//             const customThemeData = {
//                 name: themeName,
//                 description: "Custom theme created through theme builder",
//                 textColor: '#ffffff',
//                 backgroundColor: '#ffffff', // Solid color without alpha for backend
//                 fontFamily: 'Roboto', // Single font family for backend
//                 sidebarGradientStart: '#8e2de2',
//                 sidebarGradientEnd: '#4a00e0',
//                 headerGradientStart: '#8e2de2',
//                 headerGradientEnd: '#4a00e0'
//             };

//             themeManager.createCustomTheme(customThemeData)
//                 .then(() => {
//                     this.showNotification('Custom theme created and applied!', 'success');
//                     this.updatePopupContent();
//                 })
//                 .catch(error => {
//                     let errorMsg = `Failed to create theme: ${error.message}`;
//                     if (error.message.includes('400')) {
//                         errorMsg = 'Invalid theme data. Please check the theme values.';
//                     }
//                     this.showNotification(errorMsg, 'error');
//                 });
//         },

//         confirmRemoveTheme() {
//             if (!state.currentTheme) {
//                 this.showNotification('No theme to remove', 'warning');
//                 return;
//             }

//             if (confirm(`Are you sure you want to remove the current theme from ${state.currentLocation.name}?`)) {
//                 themeManager.removeTheme()
//                     .then(() => {
//                         this.showNotification('Theme removed from location!', 'success');
//                         cacheService.clearCache();
//                         this.updatePopupContent();
//                     })
//                     .catch(error => {
//                         let errorMsg = `Failed to remove theme: ${error.message}`;
//                         if (error.message.includes('500')) {
//                             errorMsg = 'Theme removed locally (backend issue)';
//                             // Still update UI since we removed locally
//                             this.updatePopupContent();
//                         }
//                         this.showNotification(errorMsg, 'error');
//                     });
//             }
//         }
//     };

//     // =========================
//     // Initialization - Optimized
//     // =========================
//     async function initializeThemeBuilder() {
//         if (!document.body) {
//             setTimeout(initializeThemeBuilder, 100);
//             return;
//         }

//         if (state.isInitialized) {
//             return;
//         }

//         console.log(`🚀 Initializing GHL Theme Builder v${CONFIG.VERSION}...`);

//         try {
//             // FIRST: Get current location from URL
//             const currentLocation = urlLocationService.getCurrentLocation();
//             if (!currentLocation || !currentLocation.locationId) {
//                 console.log('❌ No location detected - theme builder requires location context');
//                 return;
//             }

//             state.currentLocation = currentLocation;

//             // SECOND: Immediately load and apply theme for this location
//             await themeManager.loadCurrentTheme();

//             // THIRD: Check access permissions for UI features
//             const accessCheck = await accessService.checkThemeBuilderAccess();
            
//             if (accessCheck.permitted) {
//                 // Set application state
//                 state.accessInfo = accessCheck.accessInfo;
                
//                 // Create UI only for permitted locations
//                 uiService.createFloatingButton();
                
//                 // Start monitoring URL changes for SPA navigation
//                 urlLocationService.startUrlChangeMonitoring();
                
//                 state.isInitialized = true;
//                 console.log('✅ GHL Theme Builder initialized for location:', state.currentLocation.locationId);
                
//             } else {
//                 console.log('❌ Theme Builder UI not shown - location not permitted, but theme is still applied');
//                 // Even without access, we still apply the theme for all users
//                 // Start monitoring URL changes for theme persistence
//                 urlLocationService.startUrlChangeMonitoring();
//                 state.isInitialized = true;
//             }
//         } catch (error) {
//             console.error('❌ Failed to initialize Theme Builder:', error);
//         }
//     }

//     // =========================
//     // Public API
//     // =========================
//     window.GHLThemeBuilder = {
//         init: initializeThemeBuilder,
//         refresh: () => uiService.refreshAllData(),
//         open: () => uiService.openPopup(),
//         close: () => uiService.closePopup(),
        
//         getCurrentTheme: () => state.currentTheme,
//         getCurrentLocation: () => state.currentLocation,
//         getThemes: () => state.themes,
        
//         applyTheme: (themeId) => themeManager.applyTheme(themeId),
//         removeTheme: () => themeManager.removeTheme(),
        
//         isInitialized: () => state.isInitialized,
//         hasAccess: () => state.accessInfo?.themeBuilderAccess === true,

//         // Debug methods
//         debug: () => {
//             console.log('🔧 GHL Theme Builder Debug Info:', {
//                 state: state,
//                 config: CONFIG,
//                 currentURL: window.location.href
//             });
//         }
//     };

//     // Auto-initialize
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', initializeThemeBuilder);
//     } else {
//         initializeThemeBuilder();
//     }

//     console.log(`🎨 GHL Theme Builder v${CONFIG.VERSION} - Optimized with caching and API fixes`);
// })();






/* =========================
   Professional GHL Theme Builder
   Working Version with Debug Features
========================= */

(function(){
    // =========================
    // Configuration
    // =========================
    const CONFIG = {
        BTN_ID: "ghl-theme-builder-btn",
        POPUP_ID: "ghl-theme-builder-popup",
        STYLE_ID: "ghl-theme-style",
        PREVIEW_STYLE_ID: "ghl-theme-preview",
        BACKEND_API: "https://ghlengine-production.up.railway.app/api",
        AUTH_TOKEN: "110",
        VERSION: "4.2.0"
    };

    // =========================
    // State Management
    // =========================
    const state = {
        btnRef: null,
        popupRef: null,
        currentTheme: null,
        currentLocation: null,
        themes: [],
        accessInfo: null,
        isLoading: false,
        customTheme: {
            name: "",
            sidebarGradientStart: "#2563EB",
            sidebarGradientEnd: "#1D4ED8",
            headerGradientStart: "#2563EB", 
            headerGradientEnd: "#1D4ED8",
            backgroundColor: "#FFFFFF",
            textColor: "#FFFFFF",
            fontFamily: "Inter, sans-serif"
        }
    };

    // =========================
    // URL Location Service
    // =========================
    const urlLocationService = {
        extractLocationIdFromURL() {
            try {
                const currentURL = window.location.href;
                const urlPattern = /\/location\/([^\/]+)\/launchpad/;
                const match = currentURL.match(urlPattern);
                return match && match[1] ? match[1] : null;
            } catch (error) {
                console.error('❌ Error extracting location from URL:', error);
                return null;
            }
        },

        getCurrentLocation() {
            const locationId = this.extractLocationIdFromURL();
            if (!locationId) return null;

            return {
                locationId: locationId,
                name: this.getCurrentLocationName(),
                url: window.location.href
            };
        },

        getCurrentLocationName() {
            try {
                const selectors = ['.hl_switcher-loc-name', '[data-location-name]'];
                for (let selector of selectors) {
                    const element = document.querySelector(selector);
                    if (element && element.textContent) {
                        const name = element.textContent.trim();
                        if (name && name.length > 0 && name !== 'GHL') {
                            return name;
                        }
                    }
                }
                return 'Current Location';
            } catch (error) {
                return 'Current Location';
            }
        }
    };

    // =========================
    // Access Control Service
    // =========================
    const accessService = {
        async checkThemeBuilderAccess() {
            try {
                const currentLocation = urlLocationService.getCurrentLocation();
                if (!currentLocation || !currentLocation.locationId) {
                    throw new Error('Could not detect current GHL location from URL');
                }

                return {
                    permitted: true,
                    location: currentLocation,
                    accessInfo: {
                        themeBuilderAccess: true,
                        userId: CONFIG.AUTH_TOKEN,
                        companyId: "default-company"
                    }
                };

            } catch (error) {
                console.error('❌ Access check failed:', error);
                return {
                    permitted: false,
                    location: null,
                    accessInfo: null,
                    error: error.message
                };
            }
        }
    };

    // =========================
    // API Service - Working Version
    // =========================
    const apiService = {
        async call(endpoint, options = {}) {
            const url = `${CONFIG.BACKEND_API}${endpoint}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.AUTH_TOKEN}`,
                ...options.headers
            };

            const config = {
                method: options.method || 'GET',
                headers,
                ...(options.body && { body: JSON.stringify(options.body) })
            };

            try {
                console.log(`🔄 API Call: ${config.method} ${url}`, config.body ? { body: config.body } : '');
                const response = await fetch(url, config);
                const data = await response.json();
                
                if (!response.ok) {
                    console.error(`❌ API Error ${response.status}:`, data);
                    throw new Error(data.message || data.error || `HTTP ${response.status}`);
                }
                
                console.log(`✅ API Success:`, data);
                return data;
            } catch (error) {
                console.error(`❌ API Error ${endpoint}:`, error);
                throw error;
            }
        },

        async createTheme(themeData) {
            const timestamp = new Date().getTime();
            const uniqueName = `${themeData.name} ${timestamp}`;

            const validatedData = {
                name: uniqueName,
                description: "Custom theme created through theme builder",
                locationId: themeData.locationId,
                userId: CONFIG.AUTH_TOKEN,
                companyId: "default-company",
                textColor: this.validateHexColor(themeData.textColor),
                backgroundColor: this.validateHexColor(themeData.backgroundColor),
                fontFamily: themeData.fontFamily.split(',')[0].trim(),
                sidebarGradientStart: this.validateHexColor(themeData.sidebarGradientStart),
                sidebarGradientEnd: this.validateHexColor(themeData.sidebarGradientEnd),
                headerGradientStart: this.validateHexColor(themeData.headerGradientStart),
                headerGradientEnd: this.validateHexColor(themeData.headerGradientEnd),
                category: "dashboard",
                isActive: true,
                isGlobal: false
            };

            console.log('🎨 Creating theme:', validatedData.name);
            return this.call('/themes', {
                method: 'POST',
                body: validatedData
            });
        },

        validateHexColor(color) {
            if (!color) return '#FFFFFF';
            if (color.startsWith('#')) {
                return color.length === 7 ? color : '#FFFFFF';
            }
            if (color.startsWith('rgba')) {
                const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (match) {
                    const r = parseInt(match[1]).toString(16).padStart(2, '0');
                    const g = parseInt(match[2]).toString(16).padStart(2, '0');
                    const b = parseInt(match[3]).toString(16).padStart(2, '0');
                    return `#${r}${g}${b}`.toUpperCase();
                }
            }
            return '#FFFFFF';
        },

        async getAllThemes() {
            return this.call('/themes');
        },

        async getThemeById(themeId) {
            if (!themeId) throw new Error('No theme ID provided');
            return this.call(`/themes/${themeId}`);
        },

        async getThemeByLocation(locationId) {
            if (!locationId) throw new Error('No location ID provided');
            try {
                const response = await this.call(`/themes/by-location/${locationId}`);
                return response;
            } catch (error) {
                if (error.message.includes('404') || error.message.includes('not found')) {
                    return { success: true, data: null };
                }
                throw error;
            }
        },

        async applyThemeToLocation(themeId, locationId) {
            if (!locationId) throw new Error('No location ID provided');
            return this.call('/themes/apply', {
                method: 'POST',
                body: {
                    locationId: locationId,
                    themeId: themeId
                }
            });
        },

        async removeThemeFromLocation(locationId) {
            if (!locationId) throw new Error('No location ID provided');
            return this.call('/themes/remove', {
                method: 'POST',
                body: { locationId }
            });
        }
    };

    // =========================
    // Theme CSS Service - Enhanced Selectors
    // =========================
    const themeCSSService = {
        generateCSS(theme, isPreview = false) {
            if (!theme) return '';
            
            const comment = isPreview ? 'PREVIEW' : 'ACTIVE';
            
            return `
/* GHL Theme Builder v${CONFIG.VERSION} - ${comment} */
.transition-slowest .flex-col > .overflow-hidden {
    background: linear-gradient(135deg, ${theme.sidebarGradientStart} 0%, ${theme.sidebarGradientEnd} 100%) !important;
}

.sidebar-v2-location .hl_header .container-fluid {
    background: linear-gradient(135deg, ${theme.headerGradientStart} 0%, ${theme.headerGradientEnd} 100%) !important;
}

.notification-banner-top-bar {
    background: linear-gradient(135deg, ${theme.headerGradientStart} 0%, ${theme.headerGradientEnd} 100%) !important;
}

.crm-opportunities-status .hl-text,
.notification-title-message,
.sidebar-v2-location .hl_force-block,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-placeholder,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-icon,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-shortcut,
.hl_switcher-loc-name,
.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
.sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
    color: ${theme.textColor} !important;
}

.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener,
.sidebar-v2-location #sidebar-v2 #quickActions,
.sidebar-v2-location #sidebar-v2 #backButtonv2 {
    background-color: ${theme.backgroundColor} !important;
}

.hl_switcher-loc-name,
.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
.sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
    font-family: ${theme.fontFamily} !important;
}
            `;
        },

        applyThemeCSS(theme) {
            this.removeThemeCSS();
            if (theme) {
                const css = this.generateCSS(theme);
                const style = document.createElement('style');
                style.id = CONFIG.STYLE_ID;
                style.textContent = css;
                document.head.appendChild(style);
                console.log('✅ Theme CSS applied');
            }
        },

        removeThemeCSS() {
            const existingStyle = document.getElementById(CONFIG.STYLE_ID);
            if (existingStyle) existingStyle.remove();
        },

        previewThemeCSS(theme) {
            this.removePreviewCSS();
            if (theme) {
                const css = this.generateCSS(theme, true);
                const style = document.createElement('style');
                style.id = CONFIG.PREVIEW_STYLE_ID;
                style.textContent = css;
                document.head.appendChild(style);
            }
        },

        removePreviewCSS() {
            const previewStyle = document.getElementById(CONFIG.PREVIEW_STYLE_ID);
            if (previewStyle) previewStyle.remove();
        }
    };

    // =========================
    // Theme Manager
    // =========================
    const themeManager = {
        async loadThemes() {
            try {
                state.isLoading = true;
                const response = await apiService.getAllThemes();
                
                if (response && response.success) {
                    let themesArray = [];
                    
                    if (Array.isArray(response.data)) {
                        themesArray = response.data;
                    } else if (Array.isArray(response.themes)) {
                        themesArray = response.themes;
                    } else {
                        themesArray = [response.data || response.theme].filter(Boolean);
                    }

                    state.themes = themesArray;
                    console.log(`✅ Loaded ${state.themes.length} themes from backend`);
                    return state.themes;
                } else {
                    throw new Error(response?.message || 'Invalid response format');
                }
            } catch (error) {
                console.error('❌ Failed to load themes:', error);
                state.themes = [];
                return [];
            } finally {
                state.isLoading = false;
            }
        },

        async applyTheme(themeId) {
            try {
                if (!state.currentLocation) throw new Error('No current location detected');
                
                console.log(`🔄 Applying theme ${themeId} to location ${state.currentLocation.locationId}`);
                
                const themeResponse = await apiService.getThemeById(themeId);
                let theme = null;
                
                if (themeResponse && themeResponse.success) {
                    theme = themeResponse.data || themeResponse.theme;
                }
                
                if (!theme) throw new Error('Theme not found in database');

                const applyResponse = await apiService.applyThemeToLocation(themeId, state.currentLocation.locationId);
                if (applyResponse && applyResponse.success) {
                    state.currentTheme = theme;
                    themeCSSService.applyThemeCSS(theme);
                    console.log(`✅ Theme "${theme.name}" applied successfully`);
                    return true;
                } else {
                    throw new Error(applyResponse?.message || 'Failed to apply theme');
                }
            } catch (error) {
                console.error('❌ Failed to apply theme:', error);
                throw error;
            }
        },

        async removeTheme() {
            try {
                if (!state.currentLocation) throw new Error('No current location detected');
                
                console.log(`🔄 Removing theme from location ${state.currentLocation.locationId}`);
                const removeResponse = await apiService.removeThemeFromLocation(state.currentLocation.locationId);
                
                if (removeResponse && removeResponse.success) {
                    state.currentTheme = null;
                    themeCSSService.removeThemeCSS();
                    console.log('✅ Theme removed successfully');
                    return true;
                } else {
                    throw new Error(removeResponse?.message || 'Failed to remove theme');
                }
            } catch (error) {
                console.error('❌ Failed to remove theme:', error);
                throw error;
            }
        },

        async loadCurrentTheme() {
            try {
                if (!state.currentLocation) {
                    console.log('❌ No current location for theme loading');
                    return;
                }

                console.log(`🔄 Loading current theme for location ${state.currentLocation.locationId}`);
                const themeResponse = await apiService.getThemeByLocation(state.currentLocation.locationId);
                
                let theme = null;
                if (themeResponse && themeResponse.success) {
                    theme = themeResponse.data || themeResponse.theme;
                }

                if (theme && theme._id) {
                    state.currentTheme = theme;
                    themeCSSService.applyThemeCSS(theme);
                    console.log(`✅ Current theme loaded: ${theme.name}`);
                } else {
                    state.currentTheme = null;
                    themeCSSService.removeThemeCSS();
                    console.log('ℹ️ No theme applied to this location');
                }
            } catch (error) {
                console.error('❌ Failed to load current theme:', error);
                state.currentTheme = null;
                themeCSSService.removeThemeCSS();
            }
        },

        async createCustomTheme(themeData) {
            try {
                if (!state.currentLocation) throw new Error('No current location detected');

                console.log('🔄 Creating custom theme:', themeData.name);

                const completeThemeData = {
                    ...themeData,
                    locationId: state.currentLocation.locationId
                };

                const createResponse = await apiService.createTheme(completeThemeData);
                let createdTheme = null;
                
                if (createResponse && createResponse.success) {
                    createdTheme = createResponse.data || createResponse.theme;
                }

                if (createdTheme && createdTheme._id) {
                    console.log(`✅ Custom theme created: ${createdTheme.name}`);
                    
                    await this.loadThemes();
                    await this.applyTheme(createdTheme._id);
                    
                    return createdTheme;
                } else {
                    throw new Error(createResponse?.message || 'Failed to create theme');
                }
            } catch (error) {
                console.error('❌ Failed to create custom theme:', error);
                throw error;
            }
        }
    };

    // =========================
    // UI Service - Simple and Reliable
    // =========================
    const uiService = {
        createFloatingButton() {
            // Check if button already exists
            if (document.getElementById(CONFIG.BTN_ID)) {
                console.log('✅ Button already exists');
                return document.getElementById(CONFIG.BTN_ID);
            }
            
            const button = document.createElement('div');
            button.id = CONFIG.BTN_ID;
            button.innerHTML = '🎨 Themes';
            button.title = 'GHL Theme Builder';
            
            // Simple, reliable styles
            button.style.position = 'fixed';
            button.style.top = '20px';
            button.style.right = '20px';
            button.style.padding = '10px 14px';
            button.style.background = '#2563EB';
            button.style.color = '#ffffff';
            button.style.borderRadius = '6px';
            button.style.cursor = 'pointer';
            button.style.zIndex = '99999';
            button.style.fontSize = '12px';
            button.style.fontWeight = '600';
            button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            button.style.transition = 'all 0.2s ease';
            button.style.userSelect = 'none';
            button.style.fontFamily = 'system-ui, -apple-system, sans-serif';

            // Hover effects
            button.addEventListener('mouseenter', () => {
                button.style.background = '#1d4ed8';
                button.style.transform = 'translateY(-1px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = '#2563EB';
                button.style.transform = 'translateY(0)';
            });

            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openPopup();
            });
            
            document.body.appendChild(button);
            console.log('✅ Floating button created successfully');
            return button;
        },

        async openPopup() {
            await this.createPopup();
            if (state.popupRef) {
                state.popupRef.style.display = 'block';
                await this.updatePopupContent();
            }
        },

        closePopup() {
            if (state.popupRef) {
                state.popupRef.style.display = 'none';
                themeCSSService.removePreviewCSS();
            }
        },

        async createPopup() {
            if (state.popupRef) return state.popupRef;
            
            const popup = document.createElement('div');
            popup.id = CONFIG.POPUP_ID;
            
            // Simple, reliable popup styles
            popup.style.display = 'none';
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.background = '#ffffff';
            popup.style.padding = '20px';
            popup.style.borderRadius = '8px';
            popup.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            popup.style.zIndex = '100000';
            popup.style.width = '400px';
            popup.style.maxHeight = '80vh';
            popup.style.overflowY = 'auto';
            popup.style.border = '1px solid #e5e7eb';
            popup.style.fontFamily = 'system-ui, -apple-system, sans-serif';

            document.body.appendChild(popup);
            state.popupRef = popup;
            
            // Close popup when clicking outside
            document.addEventListener('click', (event) => {
                if (popup.style.display === 'block' && 
                    !popup.contains(event.target) && 
                    event.target.id !== CONFIG.BTN_ID) {
                    this.closePopup();
                }
            });

            return popup;
        },

        async updatePopupContent() {
            if (!state.popupRef) return;

            const currentLocationName = state.currentLocation?.name || 'Detecting...';
            const currentThemeName = state.currentTheme?.name || 'None';

            state.popupRef.innerHTML = `
                <div style="margin-bottom: 16px;">
                    <h3 style="margin: 0 0 6px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                        🎨 GHL Theme Builder
                    </h3>
                    <div style="color: #6b7280; font-size: 12px; line-height: 1.4;">
                        <div><strong>Location:</strong> ${currentLocationName}</div>
                        <div><strong>Current Theme:</strong> ${currentThemeName}</div>
                    </div>
                </div>

                <div style="margin-bottom: 16px;">
                    <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 14px; font-weight: 600;">
                        Available Themes
                    </h4>
                    <div id="theme-buttons-container" style="min-height: 60px; max-height: 120px; overflow-y: auto; margin-bottom: 12px;">
                        <div style="text-align: center; color: #6b7280; padding: 10px; font-size: 12px;">
                            Loading themes...
                        </div>
                    </div>
                </div>

                <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
                    <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 14px; font-weight: 600;">
                        Quick Actions
                    </h4>
                    
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <button id="create-theme" 
                                style="flex: 1; padding: 8px 12px; background: #8B5CF6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500;">
                            🎨 Create Theme
                        </button>
                        ${state.currentTheme ? `
                        <button id="remove-theme" 
                                style="flex: 1; padding: 8px 12px; background: #DC2626; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500;">
                            🗑️ Remove
                        </button>
                        ` : ''}
                        <button id="refresh-data" 
                                style="flex: 1; padding: 8px 12px; background: #059669; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500;">
                            🔄 Refresh
                        </button>
                        <button id="close-popup" 
                                style="flex: 1; padding: 8px 12px; background: transparent; color: #6b7280; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500;">
                            Close
                        </button>
                    </div>
                </div>
            `;

            this.attachPopupEventListeners();
            await this.loadThemesIntoPopup();
        },

        attachPopupEventListeners() {
            const createBtn = document.getElementById('create-theme');
            const closeBtn = document.getElementById('close-popup');
            const removeBtn = document.getElementById('remove-theme');
            const refreshBtn = document.getElementById('refresh-data');

            if (createBtn) createBtn.addEventListener('click', () => this.createSimpleTheme());
            if (closeBtn) closeBtn.addEventListener('click', () => this.closePopup());
            if (removeBtn) removeBtn.addEventListener('click', () => this.confirmRemoveTheme());
            if (refreshBtn) refreshBtn.addEventListener('click', () => this.refreshData());
        },

        async createSimpleTheme() {
            const themeName = `My Theme ${new Date().toLocaleDateString()}`;
            
            const themeData = {
                name: themeName,
                textColor: '#ffffff',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                sidebarGradientStart: '#2563EB',
                sidebarGradientEnd: '#1D4ED8',
                headerGradientStart: '#2563EB',
                headerGradientEnd: '#1D4ED8'
            };

            try {
                await themeManager.createCustomTheme(themeData);
                this.showNotification('Theme created and applied!', 'success');
                this.closePopup();
            } catch (error) {
                this.showNotification(`Failed to create theme: ${error.message}`, 'error');
            }
        },

        async loadThemesIntoPopup() {
            const container = document.getElementById('theme-buttons-container');
            if (!container) return;

            try {
                await themeManager.loadThemes();
                
                if (state.themes.length === 0) {
                    container.innerHTML = `
                        <div style="text-align: center; color: #6b7280; padding: 10px; font-size: 12px;">
                            No themes found. Create one!
                        </div>
                    `;
                    return;
                }

                container.innerHTML = state.themes.map(theme => {
                    const isActive = state.currentTheme && state.currentTheme._id === theme._id;
                    const color = theme.sidebarGradientStart || '#2563EB';
                    
                    return `
                        <div class="theme-item" data-theme-id="${theme._id}"
                             style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin: 4px 0; padding: 6px 8px; border-radius: 4px; border: ${isActive ? '1px solid #10B981' : '1px solid #e5e7eb'}; background: ${isActive ? '#f0fdf4' : '#f9fafb'}; cursor: pointer; transition: all 0.2s ease; font-size: 11px;">
                            <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${color};"></div>
                                <div style="font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${theme.name}</div>
                            </div>
                            ${isActive ? '<span style="color: #10B981; font-weight: 600; font-size: 10px;">Active</span>' : ''}
                        </div>
                    `;
                }).join('');

                // Add event listeners
                container.querySelectorAll('.theme-item').forEach(item => {
                    const themeId = item.getAttribute('data-theme-id');
                    const theme = state.themes.find(t => t._id === themeId);
                    
                    item.addEventListener('click', () => {
                        themeManager.applyTheme(themeId)
                            .then(() => {
                                this.showNotification(`"${theme.name}" applied!`, 'success');
                                this.updatePopupContent();
                            })
                            .catch(error => {
                                this.showNotification(`Failed to apply theme: ${error.message}`, 'error');
                            });
                    });
                });

            } catch (error) {
                container.innerHTML = `
                    <div style="text-align: center; color: #DC2626; padding: 10px; font-size: 11px;">
                        Failed to load themes
                    </div>
                `;
            }
        },

        async refreshData() {
            this.showNotification('Refreshing data...', 'info');
            try {
                await themeManager.loadThemes();
                await themeManager.loadCurrentTheme();
                await this.updatePopupContent();
                this.showNotification('Data refreshed!', 'success');
            } catch (error) {
                this.showNotification(`Refresh failed: ${error.message}`, 'error');
            }
        },

        confirmRemoveTheme() {
            if (!state.currentTheme) return;
            
            if (confirm(`Remove "${state.currentTheme.name}"?`)) {
                themeManager.removeTheme()
                    .then(() => {
                        this.showNotification('Theme removed!', 'success');
                        this.updatePopupContent();
                    })
                    .catch(error => {
                        this.showNotification(`Failed to remove: ${error.message}`, 'error');
                    });
            }
        },

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.innerHTML = message;
            
            notification.style.position = 'fixed';
            notification.style.top = '60px';
            notification.style.right = '20px';
            notification.style.background = this.getNotificationColor(type);
            notification.style.color = '#ffffff';
            notification.style.padding = '8px 12px';
            notification.style.borderRadius = '4px';
            notification.style.zIndex = '100003';
            notification.style.fontSize = '11px';
            notification.style.fontWeight = '500';
            notification.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        },

        getNotificationColor(type) {
            const colors = {
                success: '#10B981',
                error: '#DC2626',
                warning: '#F59E0B',
                info: '#2563EB'
            };
            return colors[type] || colors.info;
        }
    };

    // =========================
    // Simple Initialization
    // =========================
    async function initializeThemeBuilder() {
        // Wait for body to be ready
        if (!document.body) {
            setTimeout(initializeThemeBuilder, 100);
            return;
        }

        console.log(`🚀 Initializing GHL Theme Builder v${CONFIG.VERSION}...`);

        try {
            // Get current location
            const currentLocation = urlLocationService.getCurrentLocation();
            if (!currentLocation || !currentLocation.locationId) {
                console.log('❌ No GHL location detected');
                return;
            }

            state.currentLocation = currentLocation;

            // Check access
            const accessCheck = await accessService.checkThemeBuilderAccess();
            if (!accessCheck.permitted) {
                console.log('❌ Access not permitted');
                return;
            }

            state.accessInfo = accessCheck.accessInfo;

            // Load current theme
            await themeManager.loadCurrentTheme();

            // Create UI button
            uiService.createFloatingButton();
            
            console.log('✅ Theme Builder initialized successfully');

        } catch (error) {
            console.error('❌ Failed to initialize Theme Builder:', error);
        }
    }

    // =========================
    // Public API
    // =========================
    window.GHLThemeBuilder = {
        init: initializeThemeBuilder,
        open: () => uiService.openPopup(),
        close: () => uiService.closePopup(),
        getCurrentTheme: () => state.currentTheme,
        getCurrentLocation: () => state.currentLocation
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeThemeBuilder);
    } else {
        initializeThemeBuilder();
    }

    console.log(`🎨 GHL Theme Builder v${CONFIG.VERSION} - Loaded`);
})();
