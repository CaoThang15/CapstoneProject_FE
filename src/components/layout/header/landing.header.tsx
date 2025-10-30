import { Category, Home, Person, Recycling, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";

const LandingHeader: React.FC = () => {
    const [totalCartItems, setTotalCartItems] = React.useState<number>(0);

    return (
        <AppBar
            position="sticky"
            sx={{ top: 0 }}
            className="shadow-m w-full justify-center rounded-xl bg-white px-3 py-2"
        >
            <Box className="container mx-auto">
                <Box className="flex basis-3/5 items-center justify-between">
                    <Stack direction={"row"} spacing={2} alignItems="center" className="pe-4">
                        <IconButton
                            disableRipple
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <Recycling />
                        </IconButton>
                        <Typography variant="h6" className="w-1/2 whitespace-nowrap">
                            S-Market
                        </Typography>
                        {/* <Box display={{ xs: "none", lg: "block" }} className="w-full">
                            <SearchBox
                                iconPosition="start"
                                className="hidden md:block"
                                onChange={(value) => console.log(value)}
                            />
                        </Box> */}
                    </Stack>
                    <Stack flexDirection="row" className="ml-4 basis-2/5 space-x-3" alignItems="center">
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={<Home />}
                            className="h-9 rounded-xl border-gray-300 px-5"
                            onClick={() => (window.location.href = "/")}
                        >
                            <Typography className="hidden whitespace-nowrap md:inline">Home</Typography>
                        </Button>
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={<Category />}
                            className="h-9 rounded-xl border-gray-300 px-5"
                        >
                            <Typography className="hidden whitespace-nowrap md:inline">Categories</Typography>
                        </Button>
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={<Person />}
                            className="h-9 rounded-xl border-gray-300 px-5"
                        >
                            <Typography className="hidden whitespace-nowrap md:inline">My Account</Typography>
                        </Button>
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={
                                <Badge
                                    badgeContent={0}
                                    color="primary"
                                    overlap="circular"
                                    variant="standard"
                                    className={classNames({ "me-3": totalCartItems > 0 })}
                                    sx={{
                                        "& .MuiBadge-badge": { fontSize: 10, minWidth: 15, height: 15, right: -5 },
                                    }}
                                >
                                    <ShoppingCart fontSize="small" />
                                </Badge>
                            }
                            className="h-9 rounded-xl border-gray-300 px-5"
                        >
                            <Typography className="hidden whitespace-nowrap md:inline">Cart</Typography>
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </AppBar>
    );
};

export default LandingHeader;
