export const THEME_KEY = "theme";

export const getInitialTheme = (): "dark" | "light" => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  const userPref = window.confirm("Use dark theme? OK = dark, Cancel = light.");
  const theme = userPref ? "dark" : "light";
  localStorage.setItem(THEME_KEY, theme);
  return theme;
};
