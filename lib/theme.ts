// Runs before paint so saved and system themes never flash the wrong palette.
export const themeScript = `(() => {
  let theme;
  try { theme = localStorage.getItem("dybdev-theme"); } catch {}
  if (theme !== "dark" && theme !== "light") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
})();`;
