import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useQueryCategories } from "~/services/categories/hooks/queries";

export const PopularCategoriesSection: React.FC = () => {
    const { data: categories } = useQueryCategories();
    const navigate = useNavigate();
    return (
        <Box>
            <Typography variant="h6" className="mt-3 font-semibold">
                Popular Categories
            </Typography>
            <Grid container spacing={3} className="mt-3">
                {categories?.map((category) => (
                    <Grid key={category.id} size={3}>
                        <Button
                            onClick={() => {
                                navigate("category/" + category.id);
                            }}
                            color="inherit"
                            endIcon={<KeyboardArrowRight />}
                            className="justify-between rounded-lg border border-gray-300 bg-white py-3"
                            fullWidth
                        >
                            {category.name}
                        </Button>
                    </Grid>
                ))}
                {/* <Grid size={3}>
                    <Button
                        color="inherit"
                        endIcon={<KeyboardArrowRight />}
                        className="justify-between rounded-lg border border-gray-300 bg-white py-3"
                        fullWidth
                    >
                        MacBooks
                    </Button>
                </Grid>
                <Grid size={3}>
                    <Button
                        color="inherit"
                        endIcon={<KeyboardArrowRight />}
                        className="justify-between rounded-lg border border-gray-300 bg-white py-3"
                        fullWidth
                    >
                        iPads
                    </Button>
                </Grid>
                <Grid size={3}>
                    <Button
                        color="inherit"
                        endIcon={<KeyboardArrowRight />}
                        className="justify-between rounded-lg border border-gray-300 bg-white py-3"
                        fullWidth
                    >
                        iPhones
                    </Button>
                </Grid> */}
            </Grid>
        </Box>
    );
};
