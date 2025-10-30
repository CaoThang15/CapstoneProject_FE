import { Compost, Shield, Star } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { HighlightCard } from "~/components/common";

const image: string[] = [
    "https://i.pinimg.com/736x/60/c3/12/60c3126713a0db1a79bc7ab38b0e9a6c.jpg",
    "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_air-3_2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKd4DWucbPZvVeWMVftGy4MNt-ngMhcoB4Ng&s",
    "https://www.phucanh.vn/media/news/2003_macbook-la-gi-1.jpg",
];

export const HeroSection: React.FC = () => {
    return (
        <Box className="flex items-center justify-between space-x-3 bg-white p-3 md:p-6">
            <Box className="basis-3/5">
                <Typography variant="h4" className="font-bold">
                    Smarket - Nơi mua sắm đáng tin cậy
                </Typography>
                <Typography className="mt-3 text-sm">
                    Chào mừng bạn đến với Smarket, nơi bạn có thể tìm thấy những sản phẩm chất lượng với giá cả hợp lý.
                    Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tuyệt vời nhất.
                </Typography>
                <Stack direction="row" spacing={2} className="mt-6">
                    <HighlightCard
                        startIcon={<Star />}
                        typography={<Typography variant="body2">AI price prediction</Typography>}
                    />
                    <HighlightCard
                        startIcon={<Shield />}
                        typography={<Typography variant="body2">Fraud protection</Typography>}
                    />
                    <HighlightCard
                        startIcon={<Compost />}
                        typography={<Typography variant="body2">Circular economy</Typography>}
                    />
                </Stack>
            </Box>
            <Box className="basis-2/5">
                <Grid container spacing={2}>
                    {image.map((img, index) => (
                        <Grid size={6} key={index}>
                            <img src={img} alt={`Hero Image ${index + 1}`} className="h-[200px] w-full rounded-lg" />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
