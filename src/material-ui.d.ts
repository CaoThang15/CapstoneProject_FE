export {};

declare module "@mui/material/styles" {
    interface Palette {
        tertiary: Palette["primary"];
        quaternary: Palette["primary"];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions["primary"];
        quaternary?: PaletteOptions["primary"];
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        light: true;
    }
}
