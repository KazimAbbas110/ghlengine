// (function () {
//   const BTN_ID = "ghl-theme-switcher-btn";
//   const POPUP_ID = "ghl-theme-popup";

//   const API_URL = "https://ghle-backend.vercel.app/api/themes";
//   const BACKEND_API = "https://ghle-backend.vercel.app/api/subaccount";
//   const COMPANY_ID = "uomZrOy5NrTiYDHZojm4"; // 👈 replace with your actual companyId

//   let SUBACCOUNT_LOCATION_ID = null;
//   let popupRef = null;
//   let btnRef = null;

//   /* ------------------- Toast Helper ------------------- */
//   function showToast(msg, isError = false) {
//     const el = document.createElement("div");
//     Object.assign(el.style, {
//       position: "fixed",
//       bottom: "20px",
//       left: "20px",
//       padding: "10px 16px",
//       background: isError ? "#ef4444" : "#2563eb",
//       color: "#fff",
//       borderRadius: "6px",
//       fontSize: "14px",
//       zIndex: 999999,
//     });
//     el.textContent = msg;
//     document.body.appendChild(el);
//     setTimeout(() => el.remove(), 3000);
//   }

//   /* ------------------- API Calls ------------------- */
//   async function fetchSubAccounts() {
//     try {
//       const res = await fetch(`${BACKEND_API}/${COMPANY_ID}`);
//       if (!res.ok) throw new Error("Failed to fetch subaccounts");
//       const data = await res.json();
//       return data.subAccounts || [];
//     } catch (err) {
//       console.error("fetchSubAccounts error:", err);
//       showToast("Failed to load subaccounts", true);
//       return [];
//     }
//   }

//   async function fetchThemes() {
//     try {
//       const res = await fetch(API_URL);
//       return await res.json();
//     } catch (err) {
//       console.error("fetchThemes error:", err);
//       return [];
//     }
//   }

//   async function fetchSubAccountTheme(locationId) {
//     try {
//       const res = await fetch(`${BACKEND_API}/location/${locationId}`);
//       const data = await res.json();
//       return data.subAccount?.theme || null;
//     } catch (err) {
//       console.error("fetchSubAccountTheme error:", err);
//       return null;
//     }
//   }

//   async function saveTheme(locationId, themeId) {
//     try {
//       const res = await fetch(`${BACKEND_API}/location/${locationId}/theme`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ themeId }),
//       });
//       return res.ok;
//     } catch (err) {
//       console.error("saveTheme error:", err);
//       return false;
//     }
//   }

//   /* ------------------- Theme Loader ------------------- */
//   function injectTheme(cdnUrl) {
//     if (!cdnUrl) return;
//     const old = document.getElementById("dynamic-theme-script");
//     if (old) old.remove();

//     const s = document.createElement("script");
//     s.id = "dynamic-theme-script";
//     s.src = cdnUrl + "?v=" + Date.now();
//     s.onerror = () => showToast("Failed to load theme script", true);
//     document.head.appendChild(s);
//   }

//   async function loadSavedTheme(locationId) {
//     const theme = await fetchSubAccountTheme(locationId);
//     if (theme?.cdnUrl) {
//       injectTheme(theme.cdnUrl);
//       console.log("Loaded saved theme:", theme.cdnUrl);
//     }
//   }

//   /* ------------------- Popup ------------------- */
//   async function makePopup(themes) {
//     if (popupRef) return popupRef;

//     const div = document.createElement("div");
//     div.id = POPUP_ID;
//     Object.assign(div.style, {
//       display: "none",
//       position: "fixed",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       background: "#fff",
//       padding: "20px",
//       borderRadius: "12px",
//       boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
//       zIndex: 99999,
//       maxWidth: "320px",
//       textAlign: "center",
//       fontFamily: "system-ui, sans-serif",
//     });

//     const title = document.createElement("h3");
//     title.textContent = "🎨 Select a Theme";
//     title.style.marginBottom = "15px";
//     div.appendChild(title);

//     themes.forEach((theme) => {
//       const btn = document.createElement("button");
//       btn.textContent = theme.name;
//       Object.assign(btn.style, {
//         display: "block",
//         width: "100%",
//         margin: "5px 0",
//         padding: "8px 10px",
//         borderRadius: "8px",
//         border: "none",
//         cursor: "pointer",
//         background: theme.primaryColor || "#4F46E5",
//         color: "#fff",
//         fontWeight: "600",
//       });

//       btn.onclick = async () => {
//         injectTheme(theme.cdnUrl);
//         const ok = await saveTheme(SUBACCOUNT_LOCATION_ID, theme._id);
//         showToast(ok ? "Theme saved ✅" : "Failed to save theme", !ok);
//         closePopup();
//       };

//       div.appendChild(btn);
//     });

//     const closeBtn = document.createElement("button");
//     closeBtn.textContent = "Close";
//     Object.assign(closeBtn.style, {
//       marginTop: "10px",
//       padding: "6px 14px",
//       border: "none",
//       borderRadius: "8px",
//       background: "#e74c3c",
//       color: "#fff",
//       cursor: "pointer",
//     });
//     closeBtn.onclick = closePopup;
//     div.appendChild(closeBtn);

//     document.body.appendChild(div);
//     popupRef = div;
//     return div;
//   }

//   function openPopup() {
//     if (!popupRef) return;
//     popupRef.style.display = "block";
//   }

//   function closePopup() {
//     if (popupRef) popupRef.style.display = "none";
//   }

//   /* ------------------- Floating Button ------------------- */
//   function makeBtn() {
//     if (btnRef) return btnRef;

//     const btn = document.createElement("div");
//     btn.id = BTN_ID;
//     btn.textContent = "Change Theme";
//     Object.assign(btn.style, {
//       position: "fixed",
//       top: "20px",
//       right: "20px",
//       background: "#2563EB",
//       color: "#fff",
//       padding: "8px 12px",
//       borderRadius: "8px",
//       cursor: "pointer",
//       fontWeight: "600",
//       zIndex: "99999",
//     });
//     btn.onclick = openPopup;

//     document.body.appendChild(btn);
//     btnRef = btn;
//   }

//   /* ------------------- Initialize ------------------- */
//   document.addEventListener("DOMContentLoaded", async () => {
//     makeBtn();

//     // 1️⃣ Fetch subaccounts
//     const subAccounts = await fetchSubAccounts();
//     if (!subAccounts.length) return showToast("No subaccounts found", true);

//     // 2️⃣ Pick first subaccount (can replace with selector later)
//     SUBACCOUNT_LOCATION_ID = subAccounts[0].locationId;
//     console.log("Using subaccount:", SUBACCOUNT_LOCATION_ID);

//     // 3️⃣ Fetch themes
//     const themes = await fetchThemes();

//     // 4️⃣ Create popup with themes
//     await makePopup(themes);

//     // 5️⃣ Load saved theme from backend
//     await loadSavedTheme(SUBACCOUNT_LOCATION_ID);
//   });
// })();











(function() {
    const LOCATION_ID = '9DFET0sGvLGqfeRXA2Gt'; // replace dynamically if needed
    const API_BASE = 'http://localhost:5000/api'; // keep your existing backend URL

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '650px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    container.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body{font-family:Arial,sans-serif;padding:20px;background:#f9f9f9;}
                select,button{padding:6px 10px;margin:5px 0;}
                #previewIframe{width:100%;height:300px;border:1px solid #ccc;margin-top:10px;}
            </style>
        </head>
        <body>
            <h3>🎨 Theme Builder</h3>
            <div id="accessMessage"></div>
            <div id="builderUI" style="display:none">
                <label>Select Theme:</label>
                <select id="themeSelect"><option value="">-- Select Theme --</option></select><br>
                <button id="applyBtn">Apply Theme</button>
                <button id="removeBtn">Remove Theme</button>
                <h4>Preview:</h4>
                <iframe id="previewIframe"></iframe>
            </div>
            <script>
                const LOCATION_ID = '${LOCATION_ID}';
                const API_BASE = '${API_BASE}';

                async function apiCall(endpoint, options={}) {
                    const res = await fetch(API_BASE+endpoint, {
                        method: options.method||'GET',
                        headers: {'Content-Type':'application/json', ...options.headers},
                        body: options.body
                    });
                    return await res.json();
                }

                async function checkAccess() {
                    const res = await apiCall('/access/status/'+LOCATION_ID);
                    if(res.success && res.data.themeBuilderAccess){
                        document.getElementById('builderUI').style.display='block';
                        loadThemes();
                    } else {
                        document.getElementById('accessMessage').textContent='⚠️ No access to Theme Builder';
                    }
                }

                async function loadThemes(){
                    const res = await apiCall('/themes');
                    if(res.success){
                        const select = document.getElementById('themeSelect');
                        res.data.forEach(t=>{
                            const opt = document.createElement('option');
                            opt.value = t._id;
                            opt.textContent = t.name;
                            select.appendChild(opt);
                        });
                    }
                }

                async function previewTheme(themeId){
                    const iframe = document.getElementById('previewIframe');
                    if(!themeId){ iframe.srcdoc=''; return; }
                    const res = await apiCall('/themes/generate-css/'+themeId);
                    iframe.srcdoc='<style>'+res.data.css+'</style><div>Preview content</div>';
                }

                document.getElementById('themeSelect').addEventListener('change', e=>previewTheme(e.target.value));
                document.getElementById('applyBtn').addEventListener('click', async ()=>{
                    const themeId = document.getElementById('themeSelect').value;
                    if(!themeId)return alert('Select theme');
                    const res = await apiCall('/themes/apply',{method:'POST', body:JSON.stringify({locationId:LOCATION_ID, themeId})});
                    alert(res.message);
                });
                document.getElementById('removeBtn').addEventListener('click', async ()=>{
                    const res = await apiCall('/themes/remove',{method:'POST', body:JSON.stringify({locationId:LOCATION_ID})});
                    alert(res.message);
                });

                checkAccess();
            <\/script>
        </body>
        </html>
    `);
    doc.close();
})();
