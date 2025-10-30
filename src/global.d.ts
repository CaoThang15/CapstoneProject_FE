export {};

declare global {
    interface String {
        toCase(type?: "camel" | "pascal" | "readable"): string;
    }
}

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
