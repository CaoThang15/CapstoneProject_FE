import { PaletteOptions } from "@mui/material";

export const themePalette: PaletteOptions = {
    primary: {
        main: "#FF9B00",
        light: "#FFB84A", // tint
        dark: "#CC7C00", // shade
        contrastText: "#FFFFFF",
    },
    secondary: {
        main: "#FFE100",
        light: "#FFF066",
        dark: "#CCB400",
        contrastText: "#1A1A1A",
    },
    warning: {
        main: "#FFC900",
        light: "#FFDA4D",
        dark: "#CC9F00",
        contrastText: "#1A1A1A",
    },
    info: {
        main: "#EBE389",
        light: "#F5F1C0",
        dark: "#C0BA6F",
        contrastText: "#1A1A1A",
    },
    success: {
        main: "#5CB85C",
        light: "#8EDC8D",
        dark: "#419241",
        contrastText: "#FFFFFF",
    },
    error: {
        main: "#FF5A5A",
        light: "#FF8A8A",
        dark: "#CC4848",
        contrastText: "#FFFFFF",
    },
    text: {
        primary: "#2F2F2F",
        secondary: "#5C5C5C",
    },
    background: {
        default: "#FFFBEF", // soft warm background
        paper: "#FFFFFF",
    },
};
