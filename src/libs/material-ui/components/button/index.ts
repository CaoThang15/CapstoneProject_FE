import type { Components } from "@mui/material/styles";

export const buttonThemeConfig: Components = {
    MuiButtonBase: {
        styleOverrides: {
            root: {
                textTransform: "none",

                "&:focus": {
                    outline: "none",
                },
                "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                },
            },
        },
    },
    MuiButton: {
        defaultProps: {
            variant: "outlined",
        },
        styleOverrides: {
            root: {
                textTransform: "none",
                borderRadius: "12px",
            },
            outlined: {
                "&:hover": {},
            },
            containedPrimary: {
                color: "#FFFFFF",
            },
        },
        variants: [
            {
                props: { variant: "contained", color: "light" },
                style: {
                    backgroundColor: "#e6fdf7",
                    color: "#0b8f7b",
                    border: "1px solid #0b8f7b",
                    "&:hover": {
                        backgroundColor: "#d1faf1",
                        borderColor: "#0a7a68",
                    },
                },
            },
        ],
    },
};
