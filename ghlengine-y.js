(function() {
  const css = `
 
/* yellow Background Only */


.transition-slowest .flex-col > .overflow-hidden {
 background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);

}
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

