import { Box } from "@mui/material";
import React from "react";
import { CommitmentSection } from "./commitment.section";
import { HeroSection } from "./hero-section.section";
import { PopularCategoriesSection } from "./popular-categories.section";
import { TotalItemSection } from "./total-item.section";
import { TrendingProductsSection } from "./trending-products.section";

const HomePage: React.FC = () => {
    return (
        <Box className="container mx-auto py-3">
            <HeroSection />
            <TrendingProductsSection />
            <CommitmentSection />
            <PopularCategoriesSection />
            <TotalItemSection />
        </Box>
    );
};

export default HomePage;
