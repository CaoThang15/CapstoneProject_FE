import MenuIcon from "@mui/icons-material/Menu";
import { Box, ClickAwayListener, Divider, IconButton, MenuItem, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useQueryCategories } from "~/services/categories/hooks/queries";

export default function CategoryMenu() {
    const [open, setOpen] = useState(false);
    const { data: categories } = useQueryCategories();

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    className="bg-white"
                    aria-label="danh mục"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    onClick={() => setOpen((prev) => !prev)}
                    sx={{
                        "&:hover": {
                            backgroundColor: "inherit",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {open && (
                    <Paper
                        elevation={8}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: 240,
                            zIndex: 1300,
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <Typography sx={{ px: 2, py: 1, fontWeight: "bold", fontSize: 13 }}>Danh mục</Typography>
                        <Divider />
                        {categories.map((category) => (
                            <MenuItem
                                key={category.id}
                                onClick={() => {
                                    window.location.href = `/category/${category.slug}`;
                                    setOpen(false);
                                }}
                                sx={{
                                    py: 1,
                                    fontWeight: 400,
                                    fontSize: 12,
                                    "&:hover": {
                                        backgroundColor: "primary.50",
                                    },
                                }}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Paper>
                )}
            </Box>
        </ClickAwayListener>
    );
}
