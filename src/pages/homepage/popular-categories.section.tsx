import { Category } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { BoxSection, ImageRenderer } from "~/components/common";
import { useQueryCategories } from "~/services/categories/hooks/queries";

export const PopularCategoriesSection: React.FC = () => {
    const { data: categories } = useQueryCategories();
    const navigate = useNavigate();

    const displayedCategories = categories?.slice(0, 15) || [];

    return (
        <BoxSection>
            <Grid container spacing={3} className="mt-3">
                {displayedCategories?.map((category) => (
                    <Grid key={category.id} size={1.5}>
                        <Box
                            onClick={() => navigate("category/" + category.slug)}
                            className="flex cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-110"
                        >
                            <ImageRenderer
                                src={category.thumbnail?.path}
                                alt={category.name}
                                className="mb-2 h-20 w-20 rounded-lg object-cover"
                            />
                            <Typography variant="body2" className="text-center font-medium">
                                {category.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
                <Grid size={1.5}>
                    <Box
                        onClick={() => navigate("/category")}
                        className="flex cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-110"
                    >
                        <Box className="mb-2 flex h-20 w-20 items-center justify-center rounded-lg object-cover">
                            <Category className="h-12 w-12" />
                        </Box>
                        <Typography variant="body2" className="text-center font-medium">
                            Tất cả danh mục
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </BoxSection>
    );
};
