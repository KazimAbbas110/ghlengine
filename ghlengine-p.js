(function() {
  const css = `
   /* Blue Background Only */
/* Blue Background Only */


.transition-slowest .flex-col > .overflow-hidden {
   background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
}
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
