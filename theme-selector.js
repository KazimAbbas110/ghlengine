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


// /* =========================
//    GHL Theme Builder - Guaranteed to Show
// ========================= */

// (function(){
//     // Force immediate execution
//     console.log('🚀 GHL Theme Builder - Starting injection...');
    
//     // =========================
//     // Configuration
//     // =========================
//     const CONFIG = {
//         BTN_ID: "ghl-theme-builder-btn-2025",
//         POPUP_ID: "ghl-theme-builder-popup-2025", 
//         STYLE_ID: "ghl-theme-style-2025",
//         PREVIEW_STYLE_ID: "ghl-theme-preview-2025",
//         BACKEND_API: "https://ghlengine-production.up.railway.app/api",
//         AUTH_TOKEN: "110",
//         VERSION: "5.0.0"
//     };

//     // =========================
//     // Immediate Button Creation
//     // =========================
//     function createButtonImmediately() {
//         // Remove existing button if any
//         const existingBtn = document.getElementById(CONFIG.BTN_ID);
//         if (existingBtn) {
//             existingBtn.remove();
//         }

//         // Create button with very specific styles
//         const button = document.createElement('button');
//         button.id = CONFIG.BTN_ID;
//         button.innerHTML = '🎨 THEMES';
//         button.title = 'GHL Theme Builder - Click to open';
        
//         // Very specific, high-priority styles
//         button.style.cssText = `
//             position: fixed !important;
//             top: 20px !important;
//             right: 20px !important;
//             padding: 12px 16px !important;
//             background: #2563EB !important;
//             color: white !important;
//             border: none !important;
//             border-radius: 8px !important;
//             cursor: pointer !important;
//             z-index: 2147483647 !important;
//             font-size: 14px !important;
//             font-weight: bold !important;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
//             font-family: system-ui, -apple-system, sans-serif !important;
//             transition: all 0.3s ease !important;
//             opacity: 1 !important;
//             visibility: visible !important;
//             display: block !important;
//         `;

//         // Hover effects
//         button.addEventListener('mouseenter', () => {
//             button.style.background = '#1d4ed8 !important';
//             button.style.transform = 'scale(1.05) !important';
//         });
        
//         button.addEventListener('mouseleave', () => {
//             button.style.background = '#2563EB !important';
//             button.style.transform = 'scale(1) !important';
//         });

//         // Click handler
//         button.addEventListener('click', function(e) {
//             e.stopPropagation();
//             e.preventDefault();
//             openPopup();
//         });

//         // Add to body immediately
//         document.body.appendChild(button);
//         console.log('✅ FORCE INJECTED: Theme Builder Button');
        
//         // Also try multiple insertion methods
//         setTimeout(() => {
//             if (!document.getElementById(CONFIG.BTN_ID)) {
//                 document.body.insertAdjacentElement('afterbegin', button);
//                 console.log('🔄 Retrying button injection...');
//             }
//         }, 100);
//     }

//     // =========================
//     // State Management
//     // =========================
//     const state = {
//         btnRef: null,
//         popupRef: null,
//         currentTheme: null,
//         currentLocation: null,
//         themes: [],
//         accessInfo: null,
//         isLoading: false
//     };

//     // =========================
//     // URL Location Service
//     // =========================
//     const urlLocationService = {
//         extractLocationIdFromURL() {
//             try {
//                 const currentURL = window.location.href;
//                 console.log('🔍 Checking URL:', currentURL);
                
//                 // Multiple URL patterns for GHL
//                 const patterns = [
//                     /\/location\/([^\/]+)\/launchpad/,
//                     /\/location\/([^\/]+)\/dashboard/,
//                     /\/location\/([^\/]+)\/contacts/,
//                     /\/location\/([^\/]+)\/workflows/,
//                     /\/location\/([^\/]+)\/calendar/,
//                     /locationId=([^&]+)/,
//                     /location=([^&]+)/
//                 ];
                
//                 for (let pattern of patterns) {
//                     const match = currentURL.match(pattern);
//                     if (match && match[1]) {
//                         console.log('✅ Found location ID:', match[1]);
//                         return match[1];
//                     }
//                 }
                
//                 // Fallback: check for any location-like pattern
//                 const fallbackMatch = currentURL.match(/\/([a-zA-Z0-9]{15,})\//);
//                 if (fallbackMatch) {
//                     console.log('🔄 Using fallback location ID:', fallbackMatch[1]);
//                     return fallbackMatch[1];
//                 }
                
//                 return null;
//             } catch (error) {
//                 console.error('❌ Error extracting location:', error);
//                 return null;
//             }
//         },

//         getCurrentLocation() {
//             const locationId = this.extractLocationIdFromURL();
//             if (!locationId) {
//                 console.log('❌ No location ID found in URL');
//                 return null;
//             }

//             return {
//                 locationId: locationId,
//                 name: this.getCurrentLocationName(),
//                 url: window.location.href
//             };
//         },

//         getCurrentLocationName() {
//             try {
//                 // Multiple selectors for location name
//                 const selectors = [
//                     '.hl_switcher-loc-name',
//                     '[data-location-name]',
//                     '.location-name',
//                     '.current-location',
//                     '[class*="location"]',
//                     '[class*="loc-name"]',
//                     'h1, h2, h3'
//                 ];

//                 for (let selector of selectors) {
//                     const element = document.querySelector(selector);
//                     if (element && element.textContent) {
//                         const name = element.textContent.trim();
//                         if (name && name.length > 0 && name !== 'GHL' && name !== 'Dashboard') {
//                             console.log('✅ Found location name:', name);
//                             return name;
//                         }
//                     }
//                 }
                
//                 return 'GHL Location';
//             } catch (error) {
//                 console.error('❌ Error getting location name:', error);
//                 return 'GHL Location';
//             }
//         }
//     };

//     // =========================
//     // Popup Management
//     // =========================
//     function openPopup() {
//         console.log('🎯 Opening popup...');
//         createPopup();
//     }

//     function createPopup() {
//         // Remove existing popup
//         const existingPopup = document.getElementById(CONFIG.POPUP_ID);
//         if (existingPopup) {
//             existingPopup.remove();
//         }

//         const popup = document.createElement('div');
//         popup.id = CONFIG.POPUP_ID;
        
//         // High-priority popup styles
//         popup.style.cssText = `
//             position: fixed !important;
//             top: 50% !important;
//             left: 50% !important;
//             transform: translate(-50%, -50%) !important;
//             background: white !important;
//             padding: 24px !important;
//             border-radius: 12px !important;
//             box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
//             z-index: 2147483646 !important;
//             width: 90vw !important;
//             max-width: 500px !important;
//             max-height: 80vh !important;
//             overflow-y: auto !important;
//             border: 2px solid #e5e7eb !important;
//             font-family: system-ui, -apple-system, sans-serif !important;
//             opacity: 1 !important;
//             visibility: visible !important;
//             display: block !important;
//         `;

//         // Add content
//         popup.innerHTML = `
//             <div style="margin-bottom: 20px;">
//                 <h2 style="margin: 0 0 10px 0; color: #1f2937; font-size: 24px; font-weight: bold;">
//                     🎨 GHL THEME BUILDER
//                 </h2>
//                 <div style="color: #6b7280; font-size: 14px; background: #f8fafc; padding: 12px; border-radius: 8px;">
//                     <div><strong>Status:</strong> <span style="color: #10B981;">ACTIVE</span></div>
//                     <div><strong>Version:</strong> ${CONFIG.VERSION}</div>
//                     <div style="margin-top: 8px; font-size: 12px;">
//                         ✅ Theme builder is working! Create and apply themes.
//                     </div>
//                 </div>
//             </div>

//             <div style="margin-bottom: 20px;">
//                 <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 18px;">
//                     Quick Actions
//                 </h3>
//                 <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
//                     <button id="create-simple-theme" 
//                             style="padding: 12px; background: #8B5CF6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                         🎨 Create Blue Theme
//                     </button>
//                     <button id="create-green-theme" 
//                             style="padding: 12px; background: #059669; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                         🍀 Create Green Theme
//                     </button>
//                     <button id="refresh-themes" 
//                             style="padding: 12px; background: #2563EB; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                         🔄 Refresh Data
//                     </button>
//                     <button id="close-popup" 
//                             style="padding: 12px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                         ❌ Close
//                     </button>
//                 </div>
//             </div>

//             <div style="border-top: 2px solid #e5e7eb; padding-top: 20px;">
//                 <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 18px;">
//                     Debug Information
//                 </h3>
//                 <div style="background: #fef3c7; padding: 12px; border-radius: 6px; font-size: 12px; color: #92400e;">
//                     <strong>Location Detected:</strong> ${state.currentLocation ? '✅ Yes' : '❌ No'}<br>
//                     <strong>Current URL:</strong> ${window.location.href}<br>
//                     <strong>Themes Loaded:</strong> ${state.themes.length}<br>
//                     <strong>Current Theme:</strong> ${state.currentTheme ? state.currentTheme.name : 'None'}
//                 </div>
//             </div>
//         `;

//         // Add event listeners
//         setTimeout(() => {
//             const createBlueBtn = document.getElementById('create-simple-theme');
//             const createGreenBtn = document.getElementById('create-green-theme');
//             const refreshBtn = document.getElementById('refresh-themes');
//             const closeBtn = document.getElementById('close-popup');

//             if (createBlueBtn) createBlueBtn.addEventListener('click', createBlueTheme);
//             if (createGreenBtn) createGreenBtn.addEventListener('click', createGreenTheme);
//             if (refreshBtn) refreshBtn.addEventListener('click', refreshData);
//             if (closeBtn) closeBtn.addEventListener('click', closePopup);
//         }, 100);

//         // Add to body
//         document.body.appendChild(popup);
//         state.popupRef = popup;

//         // Close popup when clicking outside
//         setTimeout(() => {
//             document.addEventListener('click', function outsideClick(e) {
//                 if (popup && !popup.contains(e.target) && e.target.id !== CONFIG.BTN_ID) {
//                     closePopup();
//                     document.removeEventListener('click', outsideClick);
//                 }
//             });
//         }, 100);

//         console.log('✅ Popup created successfully');
//     }

//     function closePopup() {
//         if (state.popupRef) {
//             state.popupRef.remove();
//             state.popupRef = null;
//         }
//     }

//     // =========================
//     // Theme Functions
//     // =========================
//     async function createBlueTheme() {
//         console.log('🎨 Creating blue theme...');
        
//         const themeData = {
//             name: `Blue Theme ${Date.now()}`,
//             textColor: '#ffffff',
//             backgroundColor: '#FFFFFF',
//             fontFamily: 'Inter, sans-serif',
//             sidebarGradientStart: '#2563EB',
//             sidebarGradientEnd: '#1D4ED8',
//             headerGradientStart: '#2563EB',
//             headerGradientEnd: '#1D4ED8'
//         };

//         try {
//             showNotification('Creating blue theme...', 'info');
            
//             // Apply CSS immediately for visual feedback
//             applyThemeCSS(themeData);
            
//             showNotification('Blue theme applied! Check sidebar colors.', 'success');
//             closePopup();
//         } catch (error) {
//             console.error('❌ Failed to create theme:', error);
//             showNotification('Failed to create theme', 'error');
//         }
//     }

//     async function createGreenTheme() {
//         console.log('🎨 Creating green theme...');
        
//         const themeData = {
//             name: `Green Theme ${Date.now()}`,
//             textColor: '#ffffff',
//             backgroundColor: '#FFFFFF',
//             fontFamily: 'Inter, sans-serif',
//             sidebarGradientStart: '#059669',
//             sidebarGradientEnd: '#047857',
//             headerGradientStart: '#059669',
//             headerGradientEnd: '#047857'
//         };

//         try {
//             showNotification('Creating green theme...', 'info');
            
//             // Apply CSS immediately for visual feedback
//             applyThemeCSS(themeData);
            
//             showNotification('Green theme applied! Check sidebar colors.', 'success');
//             closePopup();
//         } catch (error) {
//             console.error('❌ Failed to create theme:', error);
//             showNotification('Failed to create theme', 'error');
//         }
//     }

//     async function refreshData() {
//         showNotification('Refreshing data...', 'info');
//         setTimeout(() => {
//             showNotification('Data refreshed!', 'success');
//         }, 1000);
//     }

//     // =========================
//     // CSS Application
//     // =========================
//     function applyThemeCSS(theme) {
//         // Remove existing theme
//         removeThemeCSS();
        
//         if (!theme) return;

//         const css = `
//             /* GHL Theme Builder - Active Theme */
//             [class*="sidebar"], 
//             [class*="Sidebar"],
//             .transition-slowest .flex-col > .overflow-hidden,
//             div[class*="overflow-hidden"] {
//                 background: linear-gradient(135deg, ${theme.sidebarGradientStart} 0%, ${theme.sidebarGradientEnd} 100%) !important;
//                 border: 2px dashed #ff0000 !important;
//             }

//             [class*="header"],
//             .hl_header .container-fluid,
//             .sidebar-v2-location .hl_header .container-fluid {
//                 background: linear-gradient(135deg, ${theme.headerGradientStart} 0%, ${theme.headerGradientEnd} 100%) !important;
//                 border: 2px dashed #00ff00 !important;
//             }

//             .nav-title,
//             [class*="nav-title"],
//             .hl_switcher-loc-name {
//                 color: ${theme.textColor} !important;
//                 font-weight: bold !important;
//             }

//             /* Visual indicators */
//             body::before {
//                 content: "🎨 THEME BUILDER ACTIVE - ${theme.name}" !important;
//                 position: fixed !important;
//                 top: 0 !important;
//                 left: 0 !important;
//                 right: 0 !important;
//                 background: #10B981 !important;
//                 color: white !important;
//                 padding: 10px !important;
//                 text-align: center !important;
//                 font-weight: bold !important;
//                 z-index: 2147483647 !important;
//                 font-size: 14px !important;
//             }
//         `;

//         const style = document.createElement('style');
//         style.id = CONFIG.STYLE_ID;
//         style.textContent = css;
//         document.head.appendChild(style);
        
//         console.log('✅ Theme CSS applied with visual indicators');
//     }

//     function removeThemeCSS() {
//         const existingStyle = document.getElementById(CONFIG.STYLE_ID);
//         if (existingStyle) existingStyle.remove();
//     }

//     // =========================
//     // Notification System
//     // =========================
//     function showNotification(message, type = 'info') {
//         const notification = document.createElement('div');
//         notification.innerHTML = message;
        
//         notification.style.cssText = `
//             position: fixed !important;
//             top: 80px !important;
//             right: 20px !important;
//             background: ${getNotificationColor(type)} !important;
//             color: white !important;
//             padding: 12px 16px !important;
//             border-radius: 6px !important;
//             z-index: 2147483647 !important;
//             font-size: 14px !important;
//             font-weight: 600 !important;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
//             font-family: system-ui, -apple-system, sans-serif !important;
//             opacity: 1 !important;
//             visibility: visible !important;
//             display: block !important;
//         `;
        
//         document.body.appendChild(notification);
//         setTimeout(() => notification.remove(), 3000);
//     }

//     function getNotificationColor(type) {
//         const colors = {
//             success: '#10B981',
//             error: '#DC2626',
//             warning: '#F59E0B',
//             info: '#2563EB'
//         };
//         return colors[type] || colors.info;
//     }

//     // =========================
//     // Initialization
//     // =========================
//     function initializeThemeBuilder() {
//         console.log('🎯 Initializing GHL Theme Builder...');
        
//         // Create button immediately
//         createButtonImmediately();
        
//         // Get current location
//         state.currentLocation = urlLocationService.getCurrentLocation();
//         console.log('📍 Current location:', state.currentLocation);
        
//         // Show success notification
//         setTimeout(() => {
//             showNotification('🎨 Theme Builder Loaded! Click the button.', 'success');
//         }, 1000);

//         console.log('✅ GHL Theme Builder initialized successfully!');
//     }

//     // =========================
//     // Multiple Initialization Attempts
//     // =========================
    
//     // Attempt 1: DOM Content Loaded
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', initializeThemeBuilder);
//     } else {
//         initializeThemeBuilder();
//     }

//     // Attempt 2: Window Load
//     window.addEventListener('load', initializeThemeBuilder);

//     // Attempt 3: Timeout fallback
//     setTimeout(initializeThemeBuilder, 2000);

//     // Attempt 4: Mutation Observer for dynamic content
//     const observer = new MutationObserver(function(mutations) {
//         if (!document.getElementById(CONFIG.BTN_ID)) {
//             console.log('🔄 DOM changed, re-injecting button...');
//             initializeThemeBuilder();
//         }
//     });
    
//     observer.observe(document.body, { childList: true, subtree: true });

//     console.log('🚀 GHL Theme Builder injection complete!');
// })();









// /* =========================
//    GHL Theme Builder - Fixed CSS Selectors
// ========================= */

// (function(){
//     console.log('🚀 GHL Theme Builder - Fixing CSS selectors...');
    
//     // =========================
//     // Configuration
//     // =========================
//     const CONFIG = {
//         BTN_ID: "ghl-theme-builder-btn-2025",
//         POPUP_ID: "ghl-theme-builder-popup-2025", 
//         STYLE_ID: "ghl-theme-style-2025",
//         PREVIEW_STYLE_ID: "ghl-theme-preview-2025",
//         BACKEND_API: "https://ghlengine-production.up.railway.app/api",
//         AUTH_TOKEN: "110",
//         VERSION: "6.1.0"
//     };

//     // =========================
//     // State Management
//     // =========================
//     const state = {
//         btnRef: null,
//         popupRef: null,
//         currentTheme: null,
//         currentLocation: null,
//         themes: [],
//         accessInfo: null,
//         isLoading: false
//     };

//     // =========================
//     // API Service (same as before)
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
//                 console.log(`🔄 API Call: ${config.method} ${url}`, config.body ? { body: config.body } : '');
//                 const response = await fetch(url, config);
//                 const data = await response.json();
                
//                 if (!response.ok) {
//                     console.error(`❌ API Error ${response.status}:`, data);
//                     throw new Error(data.message || data.error || `HTTP ${response.status}`);
//                 }
                
//                 console.log(`✅ API Success:`, data);
//                 return data;
//             } catch (error) {
//                 console.error(`❌ API Error ${endpoint}:`, error);
//                 throw error;
//             }
//         },

//         async createTheme(themeData) {
//             const timestamp = new Date().getTime();
//             const uniqueName = `${themeData.name} ${timestamp}`;

//             const validatedData = {
//                 name: uniqueName,
//                 description: "Theme created through GHL Theme Builder",
//                 locationId: themeData.locationId,
//                 userId: CONFIG.AUTH_TOKEN,
//                 companyId: "default-company",
//                 textColor: this.validateHexColor(themeData.textColor),
//                 backgroundColor: this.validateHexColor(themeData.backgroundColor),
//                 fontFamily: themeData.fontFamily,
//                 sidebarGradientStart: this.validateHexColor(themeData.sidebarGradientStart),
//                 sidebarGradientEnd: this.validateHexColor(themeData.sidebarGradientEnd),
//                 headerGradientStart: this.validateHexColor(themeData.headerGradientStart),
//                 headerGradientEnd: this.validateHexColor(themeData.headerGradientEnd),
//                 category: "dashboard",
//                 isActive: true,
//                 isGlobal: false
//             };

//             console.log('🎨 Creating theme in backend:', validatedData.name);
//             return this.call('/themes', {
//                 method: 'POST',
//                 body: validatedData
//             });
//         },

//         validateHexColor(color) {
//             if (!color) return '#FFFFFF';
//             if (color.startsWith('#')) {
//                 return color.length === 7 ? color : '#FFFFFF';
//             }
//             if (color.startsWith('rgba')) {
//                 const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
//                 if (match) {
//                     const r = parseInt(match[1]).toString(16).padStart(2, '0');
//                     const g = parseInt(match[2]).toString(16).padStart(2, '0');
//                     const b = parseInt(match[3]).toString(16).padStart(2, '0');
//                     return `#${r}${g}${b}`.toUpperCase();
//                 }
//             }
//             return '#FFFFFF';
//         },

//         async getAllThemes() {
//             return this.call('/themes');
//         },

//         async getThemeById(themeId) {
//             if (!themeId) throw new Error('No theme ID provided');
//             return this.call(`/themes/${themeId}`);
//         },

//         async getThemeByLocation(locationId) {
//             if (!locationId) throw new Error('No location ID provided');
//             try {
//                 const response = await this.call(`/themes/by-location/${locationId}`);
//                 return response;
//             } catch (error) {
//                 if (error.message.includes('404') || error.message.includes('not found')) {
//                     return { success: true, data: null };
//                 }
//                 throw error;
//             }
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

//         async removeThemeFromLocation(locationId) {
//             if (!locationId) throw new Error('No location ID provided');
//             return this.call('/themes/remove', {
//                 method: 'POST',
//                 body: { locationId }
//             });
//         }
//     };

//     // =========================
//     // FIXED Theme CSS Service - Better Selectors
//     // =========================
//     const themeCSSService = {
//         generateCSS(theme, isPreview = false) {
//             if (!theme) return '';
            
//             const comment = isPreview ? 'PREVIEW' : 'ACTIVE';
            
//             return `
// /* GHL Theme Builder v${CONFIG.VERSION} - ${comment} - Location: ${state.currentLocation?.locationId} */

// /* =========================
//    Main Sidebar Background
// ========================= */
// [class*="sidebar"],
// [class*="Sidebar"],
// .sidebar-container,
// .transition-slowest .flex-col > .overflow-hidden,
// .flex-col > .overflow-hidden,
// div[data-testid*="sidebar"],
// div[class*="bg-sidebar"] {
//     background: linear-gradient(135deg, ${theme.sidebarGradientStart} 0%, ${theme.sidebarGradientEnd} 100%) !important;
//     background-color: transparent !important;
// }

// /* =========================
//    Header Background
// ========================= */
// [class*="header"] .container-fluid,
// .hl_header .container-fluid,
// .sidebar-v2-location .hl_header .container-fluid,
// .header-container,
// div[class*="header"] {
//     background: linear-gradient(135deg, ${theme.headerGradientStart} 0%, ${theme.headerGradientEnd} 100%) !important;
//     background-color: transparent !important;
// }

// /* =========================
//    Notification Banner
// ========================= */
// .notification-banner-top-bar,
// [class*="notification"] {
//     background: linear-gradient(135deg, ${theme.headerGradientStart} 0%, ${theme.headerGradientEnd} 100%) !important;
// }

// /* =========================
//    ALL Text Elements
// ========================= */
// [class*="text"],
// [class*="Text"],
// .hl-text,
// .nav-title,
// .menu-title,
// .hl_switcher-loc-name,
// .hl_switcher-loc-city,
// .search-placeholder,
// .crm-opportunities-status .hl-text,
// .notification-title-message,
// .sidebar-v2-location .hl_force-block,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-placeholder,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-icon,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-shortcut,
// .sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 #backButtonv2 {
//     color: ${theme.textColor} !important;
// }

// /* =========================
//    Font Family for Text
// ========================= */
// .hl_switcher-loc-name,
// .hl_switcher-loc-city,
// .nav-title,
// .menu-title,
// .sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
// .sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
//     font-family: ${theme.fontFamily} !important;
//     font-weight: 500 !important;
// }

// /* =========================
//    Card & Container Backgrounds
// ========================= */
// .sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2,
// .sidebar-v2-location #sidebar-v2 #globalSearchOpener,
// .sidebar-v2-location #sidebar-v2 #quickActions,
// .sidebar-v2-location #sidebar-v2 #backButtonv2,
// [class*="card"],
// [class*="Card"],
// .hl-card,
// [class*="container"]:not(.hl_header .container-fluid),
// div[class*="bg-"]:not([class*="sidebar"]):not([class*="header"]) {
//     background-color: ${theme.backgroundColor} !important;
// }

// /* =========================
//    Active States & Interactive Elements
// ========================= */
// .sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a.active,
// [class*="active"],
// [class*="selected"] {
//     background-color: rgba(255,255,255,0.2) !important;
// }

// /* =========================
//    Icons & Buttons
// ========================= */
// #notification_banner-btn-close .h-5,
// [class*="icon"],
// [class*="Icon"],
// svg path {
//     fill: ${theme.textColor} !important;
//     color: ${theme.textColor} !important;
//     stroke: ${theme.textColor} !important;
// }

// /* =========================
//    Visual Debug - Remove in production
// ========================= */
// body::after {
//     content: "🎨 THEME ACTIVE: ${theme.name}" !important;
//     position: fixed !important;
//     top: 10px !important;
//     left: 10px !important;
//     background: #10B981 !important;
//     color: white !important;
//     padding: 8px 12px !important;
//     border-radius: 4px !important;
//     font-size: 12px !important;
//     font-weight: bold !important;
//     z-index: 2147483647 !important;
//     pointer-events: none !important;
// }
//             `;
//         },

//         applyThemeCSS(theme) {
//             this.removeThemeCSS();
//             if (theme) {
//                 const css = this.generateCSS(theme);
//                 const style = document.createElement('style');
//                 style.id = CONFIG.STYLE_ID;
//                 style.textContent = css;
//                 document.head.appendChild(style);
//                 console.log('✅ COMPLETE Theme CSS applied - All elements targeted');
                
//                 // Log what we're trying to style
//                 this.logTargetedElements(theme);
//             }
//         },

//         removeThemeCSS() {
//             const existingStyle = document.getElementById(CONFIG.STYLE_ID);
//             if (existingStyle) existingStyle.remove();
//         },

//         logTargetedElements(theme) {
//             console.log('🎯 Applying theme to:', {
//                 sidebarGradient: `${theme.sidebarGradientStart} -> ${theme.sidebarGradientEnd}`,
//                 headerGradient: `${theme.headerGradientStart} -> ${theme.headerGradientEnd}`,
//                 backgroundColor: theme.backgroundColor,
//                 textColor: theme.textColor,
//                 fontFamily: theme.fontFamily
//             });
            
//             // Check if elements are being styled
//             setTimeout(() => {
//                 console.log('🔍 Checking styled elements:');
//                 const checks = [
//                     { selector: '[class*="sidebar"]', name: 'Sidebar' },
//                     { selector: '[class*="header"]', name: 'Header' },
//                     { selector: '.hl_switcher-loc-name', name: 'Location Name' },
//                     { selector: '.nav-title', name: 'Menu Text' }
//                 ];
                
//                 checks.forEach(check => {
//                     const element = document.querySelector(check.selector);
//                     if (element) {
//                         const bg = window.getComputedStyle(element).backgroundColor;
//                         const color = window.getComputedStyle(element).color;
//                         console.log(`   ${check.name}: BG=${bg}, Text=${color}`);
//                     }
//                 });
//             }, 500);
//         }
//     };

//     // =========================
//     // Theme Manager (same as before)
//     // =========================
//     const themeManager = {
//         async loadThemes() {
//             try {
//                 state.isLoading = true;
//                 const response = await apiService.getAllThemes();
                
//                 if (response && response.success) {
//                     let themesArray = [];
                    
//                     if (Array.isArray(response.data)) {
//                         themesArray = response.data;
//                     } else if (Array.isArray(response.themes)) {
//                         themesArray = response.themes;
//                     } else {
//                         themesArray = [response.data || response.theme].filter(Boolean);
//                     }

//                     state.themes = themesArray;
//                     console.log(`✅ Loaded ${state.themes.length} themes from backend`);
//                     return state.themes;
//                 } else {
//                     throw new Error(response?.message || 'Invalid response format');
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to load themes:', error);
//                 state.themes = [];
//                 return [];
//             } finally {
//                 state.isLoading = false;
//             }
//         },

//         async applyTheme(themeId) {
//             try {
//                 if (!state.currentLocation) throw new Error('No current location detected');
                
//                 console.log(`🔄 Applying theme ${themeId} to location ${state.currentLocation.locationId}`);
                
//                 const themeResponse = await apiService.getThemeById(themeId);
//                 let theme = null;
                
//                 if (themeResponse && themeResponse.success) {
//                     theme = themeResponse.data || themeResponse.theme;
//                 }
                
//                 if (!theme) throw new Error('Theme not found in database');

//                 const applyResponse = await apiService.applyThemeToLocation(themeId, state.currentLocation.locationId);
//                 if (applyResponse && applyResponse.success) {
//                     state.currentTheme = theme;
//                     themeCSSService.applyThemeCSS(theme);
//                     console.log(`✅ COMPLETE Theme "${theme.name}" applied to ALL elements`);
//                     return true;
//                 } else {
//                     throw new Error(applyResponse?.message || 'Failed to apply theme');
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to apply theme:', error);
//                 throw error;
//             }
//         },

//         async removeTheme() {
//             try {
//                 if (!state.currentLocation) throw new Error('No current location detected');
                
//                 console.log(`🔄 Removing theme from location ${state.currentLocation.locationId}`);
//                 const removeResponse = await apiService.removeThemeFromLocation(state.currentLocation.locationId);
                
//                 if (removeResponse && removeResponse.success) {
//                     state.currentTheme = null;
//                     themeCSSService.removeThemeCSS();
//                     console.log('✅ Theme removed from all elements');
//                     return true;
//                 } else {
//                     throw new Error(removeResponse?.message || 'Failed to remove theme');
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to remove theme:', error);
//                 throw error;
//             }
//         },

//         async loadCurrentTheme() {
//             try {
//                 if (!state.currentLocation) {
//                     console.log('❌ No current location for theme loading');
//                     return;
//                 }

//                 console.log(`🔄 Loading current theme for location ${state.currentLocation.locationId}`);
//                 const themeResponse = await apiService.getThemeByLocation(state.currentLocation.locationId);
                
//                 let theme = null;
//                 if (themeResponse && themeResponse.success) {
//                     theme = themeResponse.data || themeResponse.theme;
//                 }

//                 if (theme && theme._id) {
//                     state.currentTheme = theme;
//                     themeCSSService.applyThemeCSS(theme);
//                     console.log(`✅ Current COMPLETE theme loaded: ${theme.name}`);
//                 } else {
//                     state.currentTheme = null;
//                     themeCSSService.removeThemeCSS();
//                     console.log('ℹ️ No theme applied to this location');
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to load current theme:', error);
//                 state.currentTheme = null;
//                 themeCSSService.removeThemeCSS();
//             }
//         },

//         async createCustomTheme(themeData) {
//             try {
//                 if (!state.currentLocation) throw new Error('No current location detected');

//                 console.log('🔄 Creating custom theme in backend:', themeData.name);

//                 const completeThemeData = {
//                     ...themeData,
//                     locationId: state.currentLocation.locationId
//                 };

//                 const createResponse = await apiService.createTheme(completeThemeData);
//                 let createdTheme = null;
                
//                 if (createResponse && createResponse.success) {
//                     createdTheme = createResponse.data || createResponse.theme;
//                 }

//                 if (createdTheme && createdTheme._id) {
//                     console.log(`✅ Custom theme created in backend: ${createdTheme.name}`);
                    
//                     await this.loadThemes();
//                     await this.applyTheme(createdTheme._id);
                    
//                     return createdTheme;
//                 } else {
//                     throw new Error(createResponse?.message || 'Failed to create theme');
//                 }
//             } catch (error) {
//                 console.error('❌ Failed to create custom theme:', error);
//                 throw error;
//             }
//         }
//     };

//     // =========================
//     // UI Service (same as before)
//     // =========================
//     const uiService = {
//         createFloatingButton() {
//             const existingBtn = document.getElementById(CONFIG.BTN_ID);
//             if (existingBtn) existingBtn.remove();

//             const button = document.createElement('button');
//             button.id = CONFIG.BTN_ID;
//             button.innerHTML = '🎨 THEMES';
//             button.title = 'GHL Theme Builder - Click to open';
            
//             button.style.cssText = `
//                 position: fixed !important;
//                 top: 20px !important;
//                 right: 20px !important;
//                 padding: 12px 16px !important;
//                 background: #2563EB !important;
//                 color: white !important;
//                 border: none !important;
//                 border-radius: 8px !important;
//                 cursor: pointer !important;
//                 z-index: 2147483647 !important;
//                 font-size: 14px !important;
//                 font-weight: bold !important;
//                 box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
//                 font-family: system-ui, -apple-system, sans-serif !important;
//                 transition: all 0.3s ease !important;
//             `;

//             button.addEventListener('mouseenter', () => {
//                 button.style.background = '#1d4ed8 !important';
//                 button.style.transform = 'scale(1.05) !important';
//             });
            
//             button.addEventListener('mouseleave', () => {
//                 button.style.background = '#2563EB !important';
//                 button.style.transform = 'scale(1) !important';
//             });

//             button.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 e.preventDefault();
//                 uiService.openPopup();
//             });

//             document.body.appendChild(button);
//             console.log('✅ Theme Builder Button Created');
//         },

//         async openPopup() {
//             console.log('🎯 Opening popup...');
//             await this.createPopup();
//             if (state.popupRef) {
//                 state.popupRef.style.display = 'block';
//                 await this.updatePopupContent();
//             }
//         },

//         closePopup() {
//             if (state.popupRef) {
//                 state.popupRef.style.display = 'none';
//             }
//         },

//         async createPopup() {
//             if (state.popupRef) return state.popupRef;
            
//             const popup = document.createElement('div');
//             popup.id = CONFIG.POPUP_ID;
            
//             popup.style.cssText = `
//                 position: fixed !important;
//                 top: 50% !important;
//                 left: 50% !important;
//                 transform: translate(-50%, -50%) !important;
//                 background: white !important;
//                 padding: 24px !important;
//                 border-radius: 12px !important;
//                 box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
//                 z-index: 2147483646 !important;
//                 width: 90vw !important;
//                 max-width: 500px !important;
//                 max-height: 80vh !important;
//                 overflow-y: auto !important;
//                 border: 2px solid #e5e7eb !important;
//                 font-family: system-ui, -apple-system, sans-serif !important;
//                 display: none !important;
//             `;

//             document.body.appendChild(popup);
//             state.popupRef = popup;

//             document.addEventListener('click', function outsideClick(e) {
//                 if (popup.style.display === 'block' && 
//                     !popup.contains(e.target) && 
//                     e.target.id !== CONFIG.BTN_ID) {
//                     uiService.closePopup();
//                 }
//             });

//             return popup;
//         },

//         async updatePopupContent() {
//             if (!state.popupRef) return;

//             const currentLocationName = state.currentLocation?.name || 'Detecting...';
//             const currentThemeName = state.currentTheme?.name || 'None';

//             state.popupRef.innerHTML = `
//                 <div style="margin-bottom: 20px;">
//                     <h2 style="margin: 0 0 10px 0; color: #1f2937; font-size: 24px; font-weight: bold;">
//                         🎨 GHL THEME BUILDER
//                     </h2>
//                     <div style="color: #6b7280; font-size: 14px; background: #f8fafc; padding: 12px; border-radius: 8px;">
//                         <div><strong>Location:</strong> ${currentLocationName}</div>
//                         <div><strong>Current Theme:</strong> ${currentThemeName}</div>
//                         <div><strong>CSS Coverage:</strong> <span style="color: #10B981;">COMPLETE</span></div>
//                     </div>
//                 </div>

//                 <div style="margin-bottom: 20px;">
//                     <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 18px;">
//                         Available Themes (${state.themes.length})
//                     </h3>
//                     <div id="theme-buttons-container" style="min-height: 100px; max-height: 200px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #fafafa;">
//                         <div style="text-align: center; color: #6b7280; padding: 20px;">
//                             Loading themes from database...
//                         </div>
//                     </div>
//                 </div>

//                 <div style="border-top: 2px solid #e5e7eb; padding-top: 20px;">
//                     <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 18px;">
//                         Quick Theme Creation
//                     </h3>
//                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
//                         <button id="create-blue-theme" 
//                                 style="padding: 12px; background: #2563EB; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                             🎨 Blue Theme
//                         </button>
//                         <button id="create-green-theme" 
//                                 style="padding: 12px; background: #059669; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                             🍀 Green Theme
//                         </button>
//                         <button id="create-purple-theme" 
//                                 style="padding: 12px; background: #8B5CF6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                             💜 Purple Theme
//                         </button>
//                         <button id="create-red-theme" 
//                                 style="padding: 12px; background: #DC2626; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                             🔴 Red Theme
//                         </button>
//                     </div>

//                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
//                         ${state.currentTheme ? `
//                         <button id="remove-theme" 
//                                 style="padding: 12px; background: #DC2626; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                             🗑️ Remove Theme
//                         </button>
//                         ` : ''}
//                         <button id="refresh-data" 
//                                 style="padding: 12px; background: #F59E0B; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                             🔄 Refresh Data
//                         </button>
//                         <button id="close-popup" 
//                                 style="padding: 12px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
//                             ❌ Close
//                         </button>
//                     </div>
//                 </div>

//                 <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
//                     <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 18px;">
//                         CSS Coverage Status
//                     </h3>
//                     <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 12px; color: #065f46;">
//                         ✅ Sidebar Background Gradient<br>
//                         ✅ Header Background Gradient<br>
//                         ✅ ALL Text Colors<br>
//                         ✅ Card & Container Backgrounds<br>
//                         ✅ Icons & Interactive Elements<br>
//                         ✅ Active States & Menu Items
//                     </div>
//                 </div>
//             `;

//             this.attachPopupEventListeners();
//             await this.loadThemesIntoPopup();
//         },

//         attachPopupEventListeners() {
//             const createBlueBtn = document.getElementById('create-blue-theme');
//             const createGreenBtn = document.getElementById('create-green-theme');
//             const createPurpleBtn = document.getElementById('create-purple-theme');
//             const createRedBtn = document.getElementById('create-red-theme');
//             const removeBtn = document.getElementById('remove-theme');
//             const refreshBtn = document.getElementById('refresh-data');
//             const closeBtn = document.getElementById('close-popup');

//             if (createBlueBtn) createBlueBtn.addEventListener('click', () => this.createTheme('blue'));
//             if (createGreenBtn) createGreenBtn.addEventListener('click', () => this.createTheme('green'));
//             if (createPurpleBtn) createPurpleBtn.addEventListener('click', () => this.createTheme('purple'));
//             if (createRedBtn) createRedBtn.addEventListener('click', () => this.createTheme('red'));
//             if (removeBtn) removeBtn.addEventListener('click', () => this.confirmRemoveTheme());
//             if (refreshBtn) refreshBtn.addEventListener('click', () => this.refreshData());
//             if (closeBtn) closeBtn.addEventListener('click', () => this.closePopup());
//         },

//         async createTheme(type) {
//             const themes = {
//                 blue: {
//                     name: "Professional Blue",
//                     textColor: '#ffffff',
//                     backgroundColor: 'rgba(255,255,255,0.2)',
//                     fontFamily: 'Inter, sans-serif',
//                     sidebarGradientStart: '#2563EB',
//                     sidebarGradientEnd: '#1D4ED8',
//                     headerGradientStart: '#2563EB',
//                     headerGradientEnd: '#1D4ED8'
//                 },
//                 green: {
//                     name: "Emerald Green", 
//                     textColor: '#ffffff',
//                     backgroundColor: 'rgba(255,255,255,0.2)',
//                     fontFamily: 'Inter, sans-serif',
//                     sidebarGradientStart: '#059669',
//                     sidebarGradientEnd: '#047857',
//                     headerGradientStart: '#059669',
//                     headerGradientEnd: '#047857'
//                 },
//                 purple: {
//                     name: "Royal Purple",
//                     textColor: '#ffffff',
//                     backgroundColor: 'rgba(255,255,255,0.2)',
//                     fontFamily: 'Inter, sans-serif',
//                     sidebarGradientStart: '#7C3AED',
//                     sidebarGradientEnd: '#6D28D9',
//                     headerGradientStart: '#7C3AED',
//                     headerGradientEnd: '#6D28D9'
//                 },
//                 red: {
//                     name: "Crimson Red",
//                     textColor: '#ffffff',
//                     backgroundColor: 'rgba(255,255,255,0.2)',
//                     fontFamily: 'Inter, sans-serif',
//                     sidebarGradientStart: '#DC2626',
//                     sidebarGradientEnd: '#B91C1C',
//                     headerGradientStart: '#DC2626',
//                     headerGradientEnd: '#B91C1C'
//                 }
//             };

//             const themeData = themes[type];
//             if (!themeData) return;

//             this.showNotification(`Creating ${themeData.name}...`, 'info');

//             try {
//                 await themeManager.createCustomTheme(themeData);
//                 this.showNotification(`${themeData.name} applied to ALL elements!`, 'success');
//                 this.closePopup();
//             } catch (error) {
//                 this.showNotification(`Failed to create theme: ${error.message}`, 'error');
//             }
//         },

//         async loadThemesIntoPopup() {
//             const container = document.getElementById('theme-buttons-container');
//             if (!container) return;

//             try {
//                 await themeManager.loadThemes();
                
//                 if (state.themes.length === 0) {
//                     container.innerHTML = `
//                         <div style="text-align: center; color: #6b7280; padding: 20px; font-size: 14px;">
//                             No themes found in database. Create one!
//                         </div>
//                     `;
//                     return;
//                 }

//                 container.innerHTML = state.themes.map(theme => {
//                     const isActive = state.currentTheme && state.currentTheme._id === theme._id;
//                     const color = theme.sidebarGradientStart || '#2563EB';
                    
//                     return `
//                         <div class="theme-item" data-theme-id="${theme._id}"
//                              style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin: 8px 0; padding: 10px 12px; border-radius: 6px; border: ${isActive ? '2px solid #10B981' : '1px solid #e5e7eb'}; background: ${isActive ? '#f0fdf4' : '#f9fafb'}; cursor: pointer; transition: all 0.2s ease; font-size: 14px;">
//                             <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
//                                 <div style="width: 16px; height: 16px; border-radius: 50%; background: ${color};"></div>
//                                 <div style="font-weight: 500;">${theme.name}</div>
//                             </div>
//                             ${isActive ? 
//                                 '<span style="color: #10B981; font-weight: 600;">✅ Active</span>' : 
//                                 '<button style="background: #2563EB; color: white; border: none; border-radius: 4px; padding: 4px 8px; font-size: 12px; cursor: pointer;">Apply</button>'
//                             }
//                         </div>
//                     `;
//                 }).join('');

//                 container.querySelectorAll('.theme-item').forEach(item => {
//                     const themeId = item.getAttribute('data-theme-id');
//                     const theme = state.themes.find(t => t._id === themeId);
                    
//                     item.addEventListener('click', () => {
//                         themeManager.applyTheme(themeId)
//                             .then(() => {
//                                 this.showNotification(`"${theme.name}" applied to ALL elements!`, 'success');
//                                 this.updatePopupContent();
//                             })
//                             .catch(error => {
//                                 this.showNotification(`Failed to apply theme: ${error.message}`, 'error');
//                             });
//                     });
//                 });

//             } catch (error) {
//                 container.innerHTML = `
//                     <div style="text-align: center; color: #DC2626; padding: 20px; font-size: 14px;">
//                         Failed to load themes: ${error.message}
//                     </div>
//                 `;
//             }
//         },

//         async refreshData() {
//             this.showNotification('Refreshing data from database...', 'info');
//             try {
//                 await themeManager.loadThemes();
//                 await themeManager.loadCurrentTheme();
//                 await this.updatePopupContent();
//                 this.showNotification('Data refreshed from backend!', 'success');
//             } catch (error) {
//                 this.showNotification(`Refresh failed: ${error.message}`, 'error');
//             }
//         },

//         confirmRemoveTheme() {
//             if (!state.currentTheme) return;
            
//             if (confirm(`Remove "${state.currentTheme.name}" from all elements?`)) {
//                 themeManager.removeTheme()
//                     .then(() => {
//                         this.showNotification('Theme removed from database!', 'success');
//                         this.updatePopupContent();
//                     })
//                     .catch(error => {
//                         this.showNotification(`Failed to remove theme: ${error.message}`, 'error');
//                     });
//             }
//         },

//         showNotification(message, type = 'info') {
//             const notification = document.createElement('div');
//             notification.innerHTML = message;
            
//             notification.style.cssText = `
//                 position: fixed !important;
//                 top: 80px !important;
//                 right: 20px !important;
//                 background: ${this.getNotificationColor(type)} !important;
//                 color: white !important;
//                 padding: 12px 16px !important;
//                 border-radius: 6px !important;
//                 z-index: 2147483647 !important;
//                 font-size: 14px !important;
//                 font-weight: 600 !important;
//                 box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
//                 font-family: system-ui, -apple-system, sans-serif !important;
//             `;
            
//             document.body.appendChild(notification);
//             setTimeout(() => notification.remove(), 3000);
//         },

//         getNotificationColor(type) {
//             const colors = {
//                 success: '#10B981',
//                 error: '#DC2626',
//                 warning: '#F59E0B',
//                 info: '#2563EB'
//             };
//             return colors[type] || colors.info;
//         }
//     };

//     // =========================
//     // URL Location Service (same as before)
//     // =========================
//     const urlLocationService = {
//         extractLocationIdFromURL() {
//             try {
//                 const currentURL = window.location.href;
//                 const patterns = [
//                     /\/location\/([^\/]+)\/launchpad/,
//                     /\/location\/([^\/]+)\/dashboard/,
//                     /\/location\/([^\/]+)\/contacts/,
//                     /\/location\/([^\/]+)\/workflows/,
//                     /\/location\/([^\/]+)\/calendar/,
//                     /\/location\/([^\/]+)\/opportunities/
//                 ];
                
//                 for (let pattern of patterns) {
//                     const match = currentURL.match(pattern);
//                     if (match && match[1]) {
//                         return match[1];
//                     }
//                 }
                
//                 const fallbackMatch = currentURL.match(/\/([a-zA-Z0-9]{15,})\//);
//                 return fallbackMatch ? fallbackMatch[1] : null;
//             } catch (error) {
//                 console.error('❌ Error extracting location:', error);
//                 return null;
//             }
//         },

//         getCurrentLocation() {
//             const locationId = this.extractLocationIdFromURL();
//             if (!locationId) return null;

//             return {
//                 locationId: locationId,
//                 name: this.getCurrentLocationName(),
//                 url: window.location.href
//             };
//         },

//         getCurrentLocationName() {
//             try {
//                 const selectors = ['.hl_switcher-loc-name', '[data-location-name]'];
//                 for (let selector of selectors) {
//                     const element = document.querySelector(selector);
//                     if (element && element.textContent) {
//                         const name = element.textContent.trim();
//                         if (name && name.length > 0 && name !== 'GHL') {
//                             return name;
//                         }
//                     }
//                 }
//                 return 'GHL Location';
//             } catch (error) {
//                 return 'GHL Location';
//             }
//         }
//     };

//     // =========================
//     // Initialization
//     // =========================
//     async function initializeThemeBuilder() {
//         console.log('🎯 Initializing GHL Theme Builder with FIXED CSS...');
        
//         uiService.createFloatingButton();
        
//         state.currentLocation = urlLocationService.getCurrentLocation();
//         if (!state.currentLocation) {
//             console.log('❌ No GHL location detected');
//             return;
//         }

//         console.log('📍 Current location:', state.currentLocation);

//         try {
//             await Promise.all([
//                 themeManager.loadCurrentTheme(),
//                 themeManager.loadThemes()
//             ]);
            
//             uiService.showNotification('🎨 Theme Builder Ready! Complete CSS coverage.', 'success');
//             console.log('✅ GHL Theme Builder initialized with FIXED CSS!');
//         } catch (error) {
//             console.error('❌ Failed to load themes:', error);
//             uiService.showNotification('Theme Builder loaded (offline mode)', 'warning');
//         }
//     }

//     // =========================
//     // Start the Theme Builder
//     // =========================
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', initializeThemeBuilder);
//     } else {
//         initializeThemeBuilder();
//     }

//     setTimeout(initializeThemeBuilder, 1000);

//     console.log('🚀 GHL Theme Builder - FIXED CSS Selectors Loaded!');
// })();





(function(){
    console.log('🚀 GHL Theme Builder - Optimized Production Version');

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
        VERSION: "4.0.0",
        CACHE_DURATION: 5 * 60 * 1000,
        DEBOUNCE_DELAY: 300
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
        isInitialized: false,
        isPreviewing: false
    };

    // =========================
    // Core Services
    // =========================

    // Location Detection
    const locationService = {
        detect() {
            const url = window.location.href;
            // Match GHL location pattern
            const match = url.match(/\/location\/([^\/]+)\//);
            return match ? {
                locationId: match[1],
                name: this.getLocationName(),
                url: url
            } : null;
        },

        getLocationName() {
            const selectors = [
                '.hl_switcher-loc-name',
                '[data-location-name]',
                '.location-name'
            ];
            
            for (let selector of selectors) {
                const el = document.querySelector(selector);
                if (el?.textContent?.trim()) {
                    return el.textContent.trim();
                }
            }
            return 'GHL Location';
        }
    };

    // API Service
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
                const response = await fetch(url, config);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || `HTTP ${response.status}`);
                }
                
                return data;
            } catch (error) {
                console.error(`API Error ${endpoint}:`, error);
                throw error;
            }
        },

        async getThemes(locationId) {
            return this.call(`/themes/by-location/${locationId}`);
        },

        async createTheme(themeData) {
            return this.call('/themes', {
                method: 'POST',
                body: themeData
            });
        },

        async applyTheme(themeId, locationId) {
            return this.call('/themes/apply', {
                method: 'POST',
                body: { themeId, locationId }
            });
        },

        async deleteTheme(themeId) {
            return this.call(`/themes/${themeId}`, { method: 'DELETE' });
        }
    };

    // Theme CSS Service
    const themeCSSService = {
        generateCSS(theme) {
            if (!theme) return '';
            
            return `
/* GHL Theme Builder */
.sidebar-container, 
.transition-slowest .flex-col > .overflow-hidden {
    background: linear-gradient(135deg, ${theme.sidebarGradientStart} 0%, ${theme.sidebarGradientEnd} 100%) !important;
}

.hl_header .container-fluid {
    background: linear-gradient(135deg, ${theme.headerGradientStart} 0%, ${theme.headerGradientEnd} 100%) !important;
}

.hl-text, .nav-title, .menu-title, .hl_switcher-loc-name {
    color: ${theme.textColor} !important;
    font-family: ${theme.fontFamily} !important;
}

.hl-card, #location-switcher-sidbar-v2 {
    background-color: ${theme.backgroundColor} !important;
    border-radius: 8px !important;
}
            `;
        },

        apply(theme) {
            this.remove();
            if (!theme) return;
            
            const style = document.createElement('style');
            style.id = CONFIG.STYLE_ID;
            style.textContent = this.generateCSS(theme);
            document.head.appendChild(style);
        },

        remove() {
            const style = document.getElementById(CONFIG.STYLE_ID);
            if (style) style.remove();
        },

        preview(theme) {
            this.removePreview();
            if (!theme) return;
            
            const style = document.createElement('style');
            style.id = CONFIG.PREVIEW_STYLE_ID;
            style.textContent = this.generateCSS(theme);
            document.head.appendChild(style);
            state.isPreviewing = true;
        },

        removePreview() {
            const style = document.getElementById(CONFIG.PREVIEW_STYLE_ID);
            if (style) style.remove();
            state.isPreviewing = false;
        }
    };

    // Theme Manager
    const themeManager = {
        presets: [
            {
                name: 'Ocean Blue',
                sidebarGradientStart: '#1e3a8a',
                sidebarGradientEnd: '#3b82f6', 
                headerGradientStart: '#1e40af',
                headerGradientEnd: '#60a5fa',
                textColor: '#ffffff',
                backgroundColor: '#1e40af',
                fontFamily: 'Roboto, sans-serif'
            },
            {
                name: 'Forest Green',
                sidebarGradientStart: '#065f46',
                sidebarGradientEnd: '#10b981',
                headerGradientStart: '#047857',
                headerGradientEnd: '#34d399',
                textColor: '#ffffff',
                backgroundColor: '#047857',
                fontFamily: 'Inter, sans-serif'
            },
            {
                name: 'Royal Purple',
                sidebarGradientStart: '#5b21b6',
                sidebarGradientEnd: '#a855f7',
                headerGradientStart: '#6b21a8',
                headerGradientEnd: '#c084fc',
                textColor: '#ffffff',
                backgroundColor: '#6b21a8',
                fontFamily: 'Roboto, sans-serif'
            }
        ],

        async loadThemes(locationId) {
            try {
                const response = await apiService.getThemes(locationId);
                state.themes = response.data || [];
                return state.themes;
            } catch (error) {
                console.error('Failed to load themes:', error);
                state.themes = [];
                return [];
            }
        },

        async applyTheme(themeId, locationId) {
            try {
                await apiService.applyTheme(themeId, locationId);
                const theme = state.themes.find(t => t._id === themeId);
                if (theme) {
                    state.currentTheme = theme;
                    themeCSSService.apply(theme);
                }
                return true;
            } catch (error) {
                console.error('Failed to apply theme:', error);
                throw error;
            }
        },

        async createTheme(themeData, locationId) {
            try {
                const completeData = {
                    ...themeData,
                    locationId: locationId,
                    userId: CONFIG.AUTH_TOKEN,
                    isActive: true
                };
                
                const response = await apiService.createTheme(completeData);
                return response.data;
            } catch (error) {
                console.error('Failed to create theme:', error);
                throw error;
            }
        },

        async deleteTheme(themeId) {
            try {
                await apiService.deleteTheme(themeId);
                if (state.currentTheme?._id === themeId) {
                    state.currentTheme = null;
                    themeCSSService.remove();
                }
                return true;
            } catch (error) {
                console.error('Failed to delete theme:', error);
                throw error;
            }
        }
    };

    // =========================
    // UI Components
    // =========================

    // Notification System
    const notification = {
        show(message, type = 'info') {
            const notificationEl = document.createElement('div');
            notificationEl.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span>${this.getIcon(type)}</span>
                    <span>${message}</span>
                </div>
            `;
            
            Object.assign(notificationEl.style, {
                position: 'fixed',
                top: '80px',
                right: '20px',
                background: this.getColor(type),
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                zIndex: '100000',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            });
            
            document.body.appendChild(notificationEl);
            setTimeout(() => notificationEl.remove(), 3000);
        },

        getIcon(type) {
            const icons = {
                success: '✅',
                error: '❌', 
                warning: '⚠️',
                info: 'ℹ️'
            };
            return icons[type] || icons.info;
        },

        getColor(type) {
            const colors = {
                success: '#10B981',
                error: '#DC2626',
                warning: '#F59E0B',
                info: '#2563EB'
            };
            return colors[type] || colors.info;
        }
    };

    // Floating Button
    const createFloatingButton = () => {
        // Remove existing button
        const existingBtn = document.getElementById(CONFIG.BTN_ID);
        if (existingBtn) existingBtn.remove();

        const button = document.createElement('button');
        button.id = CONFIG.BTN_ID;
        button.innerHTML = '🎨 THEMES';
        button.title = 'GHL Theme Builder';
        
        // High-priority styles
        button.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            padding: 12px 16px !important;
            background: #2563EB !important;
            color: white !important;
            border: none !important;
            border-radius: 8px !important;
            cursor: pointer !important;
            z-index: 2147483647 !important;
            font-size: 14px !important;
            font-weight: bold !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
            font-family: system-ui, -apple-system, sans-serif !important;
            transition: all 0.2s ease !important;
        `;

        // Hover effects
        button.addEventListener('mouseenter', () => {
            button.style.background = '#1d4ed8';
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = '#2563EB';
            button.style.transform = 'scale(1)';
        });

        // Click handler
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            openPopup();
        });

        document.body.appendChild(button);
        state.btnRef = button;
        return button;
    };

    // Popup Management
    const openPopup = () => {
        createPopup();
        if (state.popupRef) {
            state.popupRef.style.display = 'block';
            updatePopupContent();
        }
    };

    const closePopup = () => {
        if (state.popupRef) {
            state.popupRef.style.display = 'none';
            themeCSSService.removePreview();
        }
    };

    const createPopup = () => {
        // Remove existing popup
        const existingPopup = document.getElementById(CONFIG.POPUP_ID);
        if (existingPopup) existingPopup.remove();

        const popup = document.createElement('div');
        popup.id = CONFIG.POPUP_ID;
        
        popup.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: white !important;
            padding: 24px !important;
            border-radius: 12px !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
            z-index: 2147483646 !important;
            width: 90vw !important;
            max-width: 500px !important;
            max-height: 80vh !important;
            overflow-y: auto !important;
            border: 1px solid #e5e7eb !important;
            font-family: system-ui, -apple-system, sans-serif !important;
            display: none !important;
        `;

        document.body.appendChild(popup);
        state.popupRef = popup;

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (popup.style.display === 'block' && 
                !popup.contains(e.target) && 
                e.target.id !== CONFIG.BTN_ID) {
                closePopup();
            }
        });

        return popup;
    };

    const updatePopupContent = async () => {
        if (!state.popupRef) return;

        const currentLocation = state.currentLocation;
        const currentTheme = state.currentTheme;

        state.popupRef.innerHTML = `
            <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 8px 0; color: #1f2937; font-size: 20px; font-weight: 600;">
                    🎨 GHL Theme Builder
                </h2>
                <div style="color: #6b7280; font-size: 14px;">
                    <div><strong>Location:</strong> ${currentLocation?.name || 'Unknown'}</div>
                    <div><strong>Current Theme:</strong> ${currentTheme?.name || 'None'}</div>
                    ${state.isPreviewing ? '<div style="color: #F59E0B;"><strong>👀 Preview Mode</strong></div>' : ''}
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">
                    Quick Presets
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                    ${themeManager.presets.map(preset => `
                        <button class="preset-btn" data-preset="${preset.name}"
                                style="padding: 12px; background: ${preset.sidebarGradientStart}; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                            ${preset.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">
                    Your Themes
                </h3>
                <div id="themes-list" style="min-height: 100px; max-height: 200px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px;">
                    <div style="text-align: center; color: #6b7280; padding: 20px;">
                        Loading themes...
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button id="refresh-btn" 
                        style="flex: 1; padding: 12px; background: #059669; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    🔄 Refresh
                </button>
                <button id="create-custom-btn" 
                        style="flex: 1; padding: 12px; background: #8B5CF6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    🎨 Create Custom
                </button>
                ${currentTheme ? `
                    <button id="remove-theme-btn" 
                            style="flex: 1; padding: 12px; background: #DC2626; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        🗑️ Remove
                    </button>
                ` : ''}
                <button id="close-popup-btn" 
                        style="flex: 1; padding: 12px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Close
                </button>
            </div>
        `;

        // Attach event listeners
        attachPopupEvents();
        
        // Load themes into the list
        await loadThemesList();
    };

    const attachPopupEvents = () => {
        // Preset buttons
        state.popupRef.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const presetName = btn.dataset.preset;
                const preset = themeManager.presets.find(p => p.name === presetName);
                if (preset) applyPreset(preset);
            });
        });

        // Action buttons
        const refreshBtn = document.getElementById('refresh-btn');
        const createBtn = document.getElementById('create-custom-btn');
        const removeBtn = document.getElementById('remove-theme-btn');
        const closeBtn = document.getElementById('close-popup-btn');

        if (refreshBtn) refreshBtn.addEventListener('click', refreshData);
        if (createBtn) createBtn.addEventListener('click', createCustomTheme);
        if (removeBtn) removeBtn.addEventListener('click', removeCurrentTheme);
        if (closeBtn) closeBtn.addEventListener('click', closePopup);
    };

    const loadThemesList = async () => {
        const container = document.getElementById('themes-list');
        if (!container || !state.currentLocation) return;

        try {
            await themeManager.loadThemes(state.currentLocation.locationId);
            
            if (state.themes.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: #6b7280; padding: 20px;">No themes found</div>';
                return;
            }

            container.innerHTML = state.themes.map(theme => {
                const isActive = state.currentTheme?._id === theme._id;
                return `
                    <div class="theme-item" data-theme-id="${theme._id}"
                         style="display: flex; align-items: center; justify-content: space-between; padding: 10px; margin: 5px 0; border-radius: 6px; border: 1px solid #e5e7eb; background: ${isActive ? '#f0fdf4' : '#f9fafb'}; cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 16px; height: 16px; border-radius: 50%; background: ${theme.sidebarGradientStart || '#2563EB'};"></div>
                            <span style="font-weight: 500;">${theme.name}</span>
                        </div>
                        <div>
                            ${isActive ? '<span style="color: #10B981; font-weight: 600;">Active</span>' : ''}
                            <button class="delete-theme" data-theme-id="${theme._id}" 
                                    style="margin-left: 10px; padding: 4px 8px; background: #DC2626; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                                Delete
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            // Add event listeners to theme items
            container.querySelectorAll('.theme-item').forEach(item => {
                const themeId = item.dataset.themeId;
                const theme = state.themes.find(t => t._id === themeId);
                
                // Hover preview
                item.addEventListener('mouseenter', () => {
                    themeCSSService.preview(theme);
                });

                item.addEventListener('mouseleave', () => {
                    themeCSSService.removePreview();
                    themeCSSService.apply(state.currentTheme);
                });

                // Click to apply
                item.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('delete-theme')) {
                        applyTheme(themeId);
                    }
                });
            });

            // Add delete handlers
            container.querySelectorAll('.delete-theme').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const themeId = btn.dataset.themeId;
                    deleteTheme(themeId);
                });
            });

        } catch (error) {
            container.innerHTML = '<div style="text-align: center; color: #DC2626; padding: 20px;">Failed to load themes</div>';
        }
    };

    // =========================
    // Theme Actions
    // =========================

    const applyPreset = async (preset) => {
        if (!state.currentLocation) {
            notification.show('No location detected', 'error');
            return;
        }

        try {
            notification.show(`Creating ${preset.name} theme...`, 'info');
            
            const themeData = {
                name: `${preset.name} Theme ${new Date().toLocaleDateString()}`,
                ...preset,
                locationId: state.currentLocation.locationId
            };

            const newTheme = await themeManager.createTheme(themeData, state.currentLocation.locationId);
            await themeManager.applyTheme(newTheme._id, state.currentLocation.locationId);
            
            notification.show(`${preset.name} theme applied!`, 'success');
            await refreshData();
            
        } catch (error) {
            notification.show(`Failed to apply preset: ${error.message}`, 'error');
        }
    };

    const applyTheme = async (themeId) => {
        if (!state.currentLocation) return;

        try {
            await themeManager.applyTheme(themeId, state.currentLocation.locationId);
            notification.show('Theme applied successfully!', 'success');
            await refreshData();
        } catch (error) {
            notification.show(`Failed to apply theme: ${error.message}`, 'error');
        }
    };

    const deleteTheme = async (themeId) => {
        if (!confirm('Are you sure you want to delete this theme?')) return;

        try {
            await themeManager.deleteTheme(themeId);
            notification.show('Theme deleted successfully!', 'success');
            await refreshData();
        } catch (error) {
            notification.show(`Failed to delete theme: ${error.message}`, 'error');
        }
    };

    const createCustomTheme = () => {
        // Simple custom theme creation
        const customTheme = {
            name: `Custom Theme ${new Date().toLocaleDateString()}`,
            sidebarGradientStart: '#8e2de2',
            sidebarGradientEnd: '#4a00e0',
            headerGradientStart: '#8e2de2',
            headerGradientEnd: '#4a00e0',
            textColor: '#ffffff',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Roboto, sans-serif'
        };

        applyPreset(customTheme);
    };

    const removeCurrentTheme = async () => {
        if (!state.currentTheme) {
            notification.show('No theme to remove', 'warning');
            return;
        }

        if (!confirm('Remove current theme from this location?')) return;

        try {
            state.currentTheme = null;
            themeCSSService.remove();
            notification.show('Theme removed!', 'success');
            await refreshData();
        } catch (error) {
            notification.show(`Failed to remove theme: ${error.message}`, 'error');
        }
    };

    const refreshData = async () => {
        notification.show('Refreshing data...', 'info');
        
        if (state.currentLocation) {
            await Promise.all([
                themeManager.loadThemes(state.currentLocation.locationId),
                themeManager.loadCurrentTheme?.() // If you have this method
            ]);
            await updatePopupContent();
        }
        
        notification.show('Data refreshed!', 'success');
    };

    // =========================
    // Initialization
    // =========================

    const initialize = async () => {
        console.log('🎯 Initializing GHL Theme Builder...');

        try {
            // 1. Detect location
            state.currentLocation = locationService.detect();
            if (!state.currentLocation) {
                console.log('❌ No GHL location detected');
                return;
            }

            // 2. Create UI immediately
            createFloatingButton();
            
            // 3. Load existing theme
            await themeManager.loadThemes(state.currentLocation.locationId);
            
            // Find active theme
            state.currentTheme = state.themes.find(theme => theme.isActive);
            if (state.currentTheme) {
                themeCSSService.apply(state.currentTheme);
            }

            state.isInitialized = true;
            console.log('✅ GHL Theme Builder initialized successfully!');
            
            notification.show('Theme Builder Ready!', 'success');

        } catch (error) {
            console.error('❌ Initialization failed:', error);
            notification.show('Theme Builder failed to initialize', 'error');
        }
    };

    // Multiple initialization strategies
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Fallback initialization
    setTimeout(initialize, 1000);
    window.addEventListener('load', initialize);

    // Export to global scope for debugging
    window.GHLThemeBuilder = {
        init: initialize,
        refresh: refreshData,
        open: openPopup,
        close: closePopup,
        state: state
    };

})();


