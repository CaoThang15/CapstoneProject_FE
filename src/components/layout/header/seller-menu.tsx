import { Groups2Outlined, KeyboardArrowDownOutlined, SpaceDashboardOutlined } from "@mui/icons-material";
import { Box, Button, MenuItem, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function SellerMenu() {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ position: "relative", display: "inline-block" }}>
            <Button
                variant="contained"
                color="inherit"
                className="bg-transparent shadow-none hover:bg-[#FFFFFF1A] hover:shadow-none"
                endIcon={<KeyboardArrowDownOutlined />}
                onClick={() => setOpen((prev) => !prev)}
            >
                Dành cho người bán
            </Button>

            {open && (
                <Paper
                    elevation={8}
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        mt: 1,
                        width: 240,
                        zIndex: 1300,
                        py: 1,
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            window.location.href = `/seller/on-boarding`;
                            setOpen(false);
                        }}
                        sx={{
                            py: 1.5,
                            fontWeight: 500,
                            "&:hover": {
                                backgroundColor: "primary.50",
                            },
                            gap: 1,
                        }}
                    >
                        <Box sx={{ color: "text.secondary", display: "flex" }}>
                            <Groups2Outlined fontSize="medium" />
                        </Box>
                        <Typography variant="body1" fontSize={14} sx={{ flex: 1 }}>
                            Trở thành đối tác
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            window.location.href = `/seller/dashboard`;
                            setOpen(false);
                        }}
                        sx={{
                            py: 1.5,
                            fontWeight: 500,
                            "&:hover": {
                                backgroundColor: "primary.50",
                            },
                            gap: 1,
                        }}
                    >
                        <Box sx={{ color: "text.secondary", display: "flex" }}>
                            <SpaceDashboardOutlined fontSize="medium" />
                        </Box>
                        <Typography variant="body1" fontSize={14} sx={{ flex: 1 }}>
                            Kênh người bán
                        </Typography>
                    </MenuItem>
                </Paper>
            )}
        </Box>
    );
}
