// ghl-dashboard-v2.js
(function() {
  const css = `
    .crm-opportunities-conversion-rate .dashboard-widget-module-custom .hl-card-header {
      background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
    }
    .crm-opportunities-funnel .dashboard-widget-module-custom .hl-card-header {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      color: #fff;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();
