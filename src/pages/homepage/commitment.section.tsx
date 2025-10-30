import { Person, Refresh, Verified, Wallet } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const items: {
    title: string;
    subtitle: string;
    icon: (allProps: any) => React.ReactNode;
}[] = [
    {
        title: "Bảo đảm chất lượng",
        subtitle: "Sản phẩm bảo đảm chất lượng",
        icon: Verified,
    },
    {
        title: "Giao hàng nhanh toàn quốc",
        subtitle: "Gửi hàng đi luôn trong ngày",
        icon: Person,
    },
    {
        title: "Thanh toán linh hoạt",
        subtitle: "Hỗ trợ tiền mặt, chuyển khoản hoặc thẻ",
        icon: Wallet,
    },
    {
        title: "Miễn phí đổi trả",
        subtitle: "Trong vòng 7 ngày",
        icon: Refresh,
    },
];

export const CommitmentSection: React.FC = () => {
    return (
        <Box className="my-4 rounded-xl bg-white p-4 shadow-md md:my-8 md:p-8">
            <Box className="container mx-auto flex flex-col gap-2 md:gap-8">
                <Typography variant="h5" className="text-center">
                    CAM KẾT TỪ CHÚNG TÔI
                </Typography>
                <Box className="grid grid-cols-2 justify-items-center gap-4 max-[400px]:grid-cols-1 md:gap-0 lg:grid-cols-4">
                    {items.map((item) => (
                        <Box
                            key={item.title}
                            className="flex w-fit flex-col items-center justify-center gap-3 py-0 md:gap-6 md:py-4"
                        >
                            <Box
                                className="flex h-10 w-10 items-center justify-center rounded-full md:h-14 md:w-14"
                                sx={{ bgcolor: "primary.main" }}
                            >
                                <item.icon className="text-[16px] text-white md:text-[20px]" />
                            </Box>
                            <Box className="flex flex-col items-center justify-center gap-2 text-center">
                                <Typography className="text-nowrap text-sm font-bold md:text-base">
                                    {item.title}
                                </Typography>
                                <Typography className="text-sm">{item.subtitle}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
