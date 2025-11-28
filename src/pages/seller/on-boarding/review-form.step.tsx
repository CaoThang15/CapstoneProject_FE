import { Box, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { BoxSection } from "~/components/common";
import { SellerOnboardingFormValues } from "./types";
import { PersonOutline } from "@mui/icons-material";

const ReviewFormStep = () => {
    const form = useFormContext<SellerOnboardingFormValues>();
    return (
        <Box>
            <Typography variant="h6" className="mb-4 font-bold">
                Xem lại thông tin của bạn
            </Typography>
            <Stack spacing={2}>
                <BoxSection className="flex justify-between">
                    <Box>
                        <PersonOutline />
                        <span>Họ và tên</span>
                    </Box>
                    <Typography fontWeight={600}>{`${form.getValues("fullName")}`}</Typography>
                </BoxSection>
                <BoxSection className="flex justify-between">
                    <Typography>Người đăng ký</Typography>
                    <Typography
                        fontWeight={600}
                    >{`${form.getValues("fullName")} - ${form.getValues("email")}`}</Typography>
                </BoxSection>
                <BoxSection className="flex justify-between">
                    <Typography>Tên cửa hàng</Typography>
                    <Typography fontWeight={600}>{`${form.getValues("storeName")}`}</Typography>
                </BoxSection>
                <BoxSection className="flex justify-between">
                    <Typography>Danh mục</Typography>
                    <Typography fontWeight={600}>{`${form.getValues("primaryCategoryName")}`}</Typography>
                </BoxSection>
                <BoxSection className="flex justify-between">
                    <Typography>Xác thực</Typography>
                    <Typography fontWeight={600}>Đã xác thực</Typography>
                </BoxSection>
            </Stack>
        </Box>
    );
};

export default ReviewFormStep;
