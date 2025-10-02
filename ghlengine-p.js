


(function() {
  const css = `
 
/* purple Background Only */

/* ------------------------------
   Global Card Styling
------------------------------ */

.transition-slowest .flex-col > .overflow-hidden {
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);

}


.sidebar-v2-location #sidebar-v2 .default-bg-color {
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);


}
.notification-banner-top-bar {
                background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);

}
/* ------------------------------
   Global Card Styling
------------------------------ */
.hl-card-header {
     background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    color: #fff;
    font-weight: 600;


    padding: 12px 16px;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.hl-card-footer,
.hl-card .hl-card-footer {
    background: #f9f9f9;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 14px;
    border-top: 1px solid #ddd;
    border-radius: 0 0 10px 10px;
}

/* ------------------------------
   CRM Reports
------------------------------ */
.crm-opportunities-status .hl-card-header,
.crm-opportunities-value .hl-card-header,
.crm-opportunities-conversion-rate .hl-card-header,
.crm-opportunities-stages-distribution .hl-card-header,
.crm-opportunities-sales-efficiency .hl-card-header,
.crm-conversations-manual-actions .hl-card-header {}

/* ------------------------------
   Dashboard Reports
------------------------------ */
.chart-container.chart-filter .hl-card-header,
.location-dashboard-task-container .hl-card-header,
.location-dashboard-lead-source-report .hl-card-header {}

/* ------------------------------
   Automations & Analytics
------------------------------ */
.automations-reporting-google-analytics-count-report .hl-card-header,
.automations-reporting-google-analytics-chart-report .hl-card-header,
.automations-reporting-gmb-report .hl-card-header,
.automations-reporting-facebook-ads-report .hl-card-header,
.automations-reporting-google-ads-report .hl-card-header {}

/* ------------------------------
   Global Header
------------------------------ */
.hl_header .container-fluid {
     background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    color: #fff;
    font-weight: 700;
}

/* ------------------------------
   Other Layout Elements
------------------------------ */
.flex-row .flex-1 > div { padding: 10px; }
.border-b-0 { border-bottom: none !important; }
.bg-gray-25.justify-between { background: #f5f5f5; }
.flex-page-bar { background: #ffffff; border-bottom: 1px solid #ddd; }
.breadcrumb { font-size: 14px; color: #666; }

/* ===============================
   General Text Colors
================================= */
.crm-opportunities-status .hl-text,
.notification-title-message,
.sidebar-v2-location .hl_force-block,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-placeholder,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-icon,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-shortcut {
    color: #fff;
}

.sidebar-v2-location .hl_force-block {
    font-weight: 100;
}

/* ===============================
   Sidebar Navigation Titles
================================= */
.sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title {
    color: #fff;
    font-weight: 400;
    font-family: Roboto, sans-serif;
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
    background-color: rgba(255, 255, 255, 0.33);
}

  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();


