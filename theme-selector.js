// public/theme-selector.js
(async () => {
  const API_URL = "https://unadducible-abbigail-knitted.ngrok-free.dev/api/themes";

  try {
    // Fetch all available themes
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch themes");
    const themes = await res.json();

    // Floating theme selector
    const container = document.createElement("div");
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

    // Generate theme buttons
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
        transition: "opacity 0.2s ease",
      });
      btn.onmouseover = () => (btn.style.opacity = "0.8");
      btn.onmouseout = () => (btn.style.opacity = "1");

      // On click → inject CDN theme JS
      btn.onclick = () => {
        const script = document.createElement("script");
        script.src = theme.cdnUrl;
        document.body.appendChild(script);

        alert(`✅ ${theme.name} applied!`);
      };

      container.appendChild(btn);
    });

    // Append to page
    document.body.appendChild(container);
  } catch (err) {
    console.error("❌ Error loading themes:", err);
  }
})();
