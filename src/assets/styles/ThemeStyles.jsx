const ThemeStyles = {
  fonts: {
    body: "'Inter', sans-serif",
    primary: "'Outfit', sans-serif",
    secondary: "'Orbitron', sans-serif",
    title: "'Kufam', sans-serif",
    title2: "'Bebas Neue', sans-serif",
  },

  colors: {
    white: "#ffffff",
    black: "#111111",
    blackSolid: "#000000",
    yellow: "#FCD930",
    primary: "#1dffe0", // Updated to teal
    secondary: "#1e7a6a", // Darker teal
    themeBlue: "#122a3a", // Darker blue
    themeGreen: "#1dffe0", // Teal instead of green

    dark: {
      bgBody: "#0a1a25", // Darker blue to match background
      bgHeader: "#0a1a25",
      bgHeaderMobile: "#061520e6",
      bgDropdownDemo: "#122a3a",
      bgBannerV1: "#0a1a25",
      bgBannerV2: "#071520e6",
      bgBannerV9: "#0a1a25b2",
      bgPresaleBtn: "#1e7a6acc",
      bgModalOverlay: "#0a1a25b3",
      bgModal: "#122a3a",
      cardBg: "rgba(9, 43, 60, 0.8)",
      cardBorder: "rgba(29, 255, 220, 0.15)",
      cardText: "rgba(255, 255, 255, 0.9)",
      headingText: "#ffffff",
      bodyText: "#e6e6e6",
      chartText: "#ffffff",
      tokenomicsBg: "rgba(9, 43, 60, 0.9)",
      tokenomicsDetailBg: "rgba(7, 35, 50, 0.9)",
      tokenomicsInfoBg: "rgba(15, 55, 75, 0.8)",
      accentColor: "#1dffe0",
      highlightGradient: "linear-gradient(180deg, #fff 0%, #1dffe0 100%)",
    },

    light: {
      bgBody: "#f0f7ff",
      bgHeader: "#ffffff",
      bgHeaderMobile: "#ffffffe6",
      bgDropdownDemo: "#ffffff",
      bgBannerV1: "#e5f0ff",
      bgBannerV2: "#f0f7ffe6",
      bgBannerV9: "#e5f0ff",
      bgPresaleBtn: "#1e7a6acc",
      bgModalOverlay: "#e5f0ffb3",
      bgModal: "#ffffff",
      cardBg: "rgba(255, 255, 255, 0.95)",
      cardBorder: "rgba(29, 190, 170, 0.3)",
      cardText: "rgba(7, 35, 50, 0.9)",
      headingText: "#072538",
      bodyText: "#1a4060",
      chartText: "#072538",
      tokenomicsBg: "rgba(225, 240, 255, 0.95)",
      tokenomicsDetailBg: "rgba(255, 255, 255, 0.95)",
      tokenomicsInfoBg: "rgba(235, 245, 255, 0.9)",
      accentColor: "#1e7a6a",
      highlightGradient: "linear-gradient(180deg, #072538 0%, #1e7a6a 100%)",
    },

    conicGradient:
      "conic-gradient(from 0deg at 50% 50%,#1dffe0 0deg,#1e7a6a 360deg)", // Updated to teal
    bannerv3LinearGradient: "linear-gradient(180deg, #fff 0%, #1dffe0 100%)", // Updated to teal
    linearGradient: "linear-gradient(90deg, #1dffe0 0%, #122a3a 100%)", // Updated to teal/blue
    linearGradientBanner:
      "linear-gradient(180deg,#05050529 0%,#0a1a25 77.08%,#122a3a 100%);", // Updated to blue
    linearGradient2: "linear-gradient(90deg, #1dffe0 0%, #1e7a6a 100%)", // Updated to teal
  },
};

export default ThemeStyles;
