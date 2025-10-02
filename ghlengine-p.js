


(function() {
  const css = `
 
/* purple Background Only */



/* ===============================
   Variables (for easy maintenance)
================================= */
:root {
    --text-white: #fff;
    --bg-white-light: rgba(255, 255, 255, 0.33);
    --font-main: Roboto, sans-serif;
}

/* ------------------------------
   Sidebar Color Styling
------------------------------ */

.transition-slowest .flex-col > .overflow-hidden {
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);

}
/* ------------------------------
   Sidebar Header Color Styling
------------------------------ */

.sidebar-v2-location .hl_header .container-fluid {
          background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    }
     .notification-banner-top-bar {
              background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
        }
           
/* ===============================
   General Text Colors
================================= */
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
    color: var(--text-white);
}

.sidebar-v2-location .hl_force-block {
    font-weight: 100;
}

/* ===============================
   Sidebar Typography
================================= */
.hl_switcher-loc-name,
.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
.sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
    font-family: var(--font-main);
    font-weight: 400;
}

.hl_switcher-loc-name,
.sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
    font-size: 15px;
}

/* ===============================
   Sidebar Backgrounds
================================= */
.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener,
.sidebar-v2-location #sidebar-v2 #quickActions,
.sidebar-v2-location #sidebar-v2 #backButtonv2,
#sb_conversation_ai_settings_v2 .hl_new_badge,
#sb_knowledge-base-settings .hl_new_badge,
#sb_objects .hl_new_badge,
#sb_labs .hl_new_badge,
#sb_brand-boards .hl_new_badge {
    background-color: var(--bg-white-light);
}

/* ===============================
   Notification Banner
================================= */
.notification-banner-top-bar {
    /* Add custom styles if needed */
}

#notification_banner-btn-close .h-5 {
    background-color: var(--text-white);
}

  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();


