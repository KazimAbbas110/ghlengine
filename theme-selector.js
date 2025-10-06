(function(){
  const API_URL = "https://ghle-theme-builder.vercel.app/api/themes";
  const CONTAINER_ID = "ghl-theme-selector";
  const HB_MS = 500;

  async function createSelector() {
    try {
      const res = await fetch(API_URL);
      const themes = await res.json();

      // Avoid duplicates
      if (document.getElementById(CONTAINER_ID)) return;

      const container = document.createElement("div");
      container.id = CONTAINER_ID;
      Object.assign(container.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "12px 15px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        zIndex: "99999",
        width: "220px",
        fontFamily: "sans-serif",
      });

      const title = document.createElement("div");
      title.textContent = "🎨 Select Theme";
      title.style.fontWeight = "bold";
      title.style.marginBottom = "8px";
      container.appendChild(title);

      themes.forEach(theme => {
        const btn = document.createElement("button");
        btn.textContent = theme.name;
        Object.assign(btn.style, {
          display: "block",
          width: "100%",
          margin: "5px 0",
          padding: "8px 10px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: theme.primaryColor || "#888",
          color: "#fff",
        });
        btn.onclick = () => {
          const script = document.createElement("script");
          script.src = theme.cdnUrl;
          document.body.appendChild(script);
        };
        container.appendChild(btn);
      });

      document.body.appendChild(container);

    } catch (err) {
      console.error("❌ Error loading themes:", err);
    }
  }

  // Heartbeat to remount if GHL re-renders the DOM
  setInterval(createSelector, HB_MS);
})();
