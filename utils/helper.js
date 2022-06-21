export const getMoonIcon = (moonPhase) => {
    if (moonPhase === "First Quarter") return "🌓";
    if (moonPhase === "Waxing Crescent") return "🌒";
    if (moonPhase === "New Moon") return "🌑";
    if (moonPhase === "Waning Crescent") return "🌘";
    if (moonPhase === "Third Quarter") return "🌗";
    if (moonPhase === "Waning Gibbous") return "🌖";
    if (moonPhase === "Full Moon") return "🌕";
    if (moonPhase === "Wazing Gibbous") return "🌔";
};
