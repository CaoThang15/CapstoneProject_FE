import { FacebookOutlined, LinkedIn, YouTube } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const LandingFooter: React.FC = () => {
    return (
        <Box className="w-full justify-between bg-white px-3 py-6">
            <Box className="container mx-auto flex justify-evenly">
                <Stack spacing={1} className="w-1/5">
                    <Typography fontSize={12} fontWeight={600}>
                        Hỗ trợ khách hàng
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Trung tâm trợ giúp
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        An toàn mua bán
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Liên hệ hỗ trợ
                    </Typography>
                </Stack>
                <Stack spacing={1} className="w-1/5">
                    <Typography fontSize={12} fontWeight={600}>
                        Về S-Market
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Giới thiệu
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Quy chế hoạt động sàn
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Chính sách bảo mật
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Giải quyết tranh chấp
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Tuyển dụng
                    </Typography>
                </Stack>
                <Stack spacing={1} className="w-1/5">
                    <Typography fontSize={12} fontWeight={600}>
                        Liên kết
                    </Typography>
                    <Box className="flex space-x-2">
                        <LinkedIn fontSize="small" />
                        <FacebookOutlined fontSize="small" />
                        <YouTube fontSize="small" />
                    </Box>
                    <Typography fontSize={12} fontWeight={400}>
                        Email: trogiup@s-market.com
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        CSKH: 19003003(1.000đ/phút)
                    </Typography>
                    <Typography fontSize={12} fontWeight={400}>
                        Địa chỉ: Tầng 18, Toà nhà UOA, Số 6 đường Tân Trào, Phường Tân Mỹ, Thành phố Hồ Chí Minh, Việt
                        Nam
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
};

export default LandingFooter;
