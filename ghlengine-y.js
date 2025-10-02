(function() {
  const css = `
 
/* yellow Background Only */

/* ------------------------------
   Global Card Styling
------------------------------ */

.transition-slowest .flex-col > .overflow-hidden {
 background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);

}


.sidebar-v2-location #sidebar-v2 .default-bg-color {
 background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);


}
.notification-banner-top-bar {
               background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);

}
/* ------------------------------
   Global Card Styling
------------------------------ */
.hl-card-header {
    background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
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
    background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
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


  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();


