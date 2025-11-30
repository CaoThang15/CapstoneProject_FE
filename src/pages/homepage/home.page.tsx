import { Stack } from "@mui/material";
import React from "react";
import { HeroSection } from "./hero-section.section";
import { PopularCategoriesSection } from "./popular-categories.section";
import { TrendingProductsSection } from "./trending-products.section";

const HomePage: React.FC = () => {
    return (
        <>
            <div
                className="absolute left-0 top-0 z-0 h-[200px] w-full"
                style={{
                    background: "linear-gradient(180deg,#ffba01,#ffdb3a 54.33%,#ffe62f)",
                }}
            >
                <div
                    style={{
                        backgroundImage:
                            "url(https:cdn.chotot.com/admincentre/9srAfpKOzsqUJHo7Y6QWQC7Qu2eFObPBEvQLCvGwijo/preset:raw/plain/f22189d121c21189410279fcf9696c38-2941305024038426223.jpg",
                        backgroundSize: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                ></div>
            </div>
            <Stack spacing={2} className="container relative z-10">
                <HeroSection />
                <PopularCategoriesSection />
                <TrendingProductsSection />
            </Stack>
        </>
    );
};

export default HomePage;
