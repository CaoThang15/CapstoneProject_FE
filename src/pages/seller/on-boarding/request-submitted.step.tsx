import {
    CategoryOutlined,
    CheckCircle,
    HomeOutlined,
    NotificationsOutlined,
    PersonOutline,
    QueryBuilderOutlined,
    ShieldOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection, HighlightCard } from "~/components/common";
import { DATE_TIME_FORMAT } from "~/constants/date-time.format";
import { SellerRequest } from "~/entities/seller-request.entity";
import { formatDate } from "~/utils/date-time";

interface Props {
    sellerRequest?: SellerRequest;
}
const RequestSubmittedStep: React.FC<Props> = ({ sellerRequest }) => {
    return (
        <Stack className="p-4" spacing={4}>
            <BoxSection className="mx-auto w-full text-center">
                <Stack>
                    <CheckCircle color="primary" fontSize="large" className="w-full text-center" />
                    <Typography variant="h6">Seller application submitted</Typography>
                    <Typography>
                        Thanks, {sellerRequest?.fullName}. Your request has been received and is now in review. We will
                        email you within 1-2 business days.
                    </Typography>
                    <Stack direction="row" spacing={2} className="mt-4 justify-center">
                        <HighlightCard
                            startIcon={<QueryBuilderOutlined />}
                            typography={`Status: ${sellerRequest?.statusName}`}
                        />
                        <HighlightCard startIcon={"#"} typography={`Ref: ${sellerRequest?.id}`} />
                    </Stack>
                </Stack>
            </BoxSection>
            <Box className="flex space-x-4">
                <BoxSection className="h-full flex-1">
                    <Typography variant="h6" className="mb-4 font-bold">
                        What happens next?
                    </Typography>
                    <Divider className="my-2" />
                    <Stack spacing={2}>
                        <Typography>
                            <span className="me-2">
                                <ShieldOutlined />
                            </span>
                            Our time verifiese your identity and store details. If needed, we'll reach out for
                            clarification
                        </Typography>
                        <Typography>
                            <span className="me-2">
                                <NotificationsOutlined />
                            </span>
                            You'll receive an email when your account is approved. Notifications will also appear in My
                            Account.
                        </Typography>
                        <Typography>
                            <span className="me-2">
                                <CategoryOutlined />
                            </span>
                            After approval you'll unlock the Seller Dashboard to create listings, manage orders, and
                        </Typography>
                    </Stack>
                </BoxSection>
                <BoxSection className="max-w-1/2 h-full">
                    <Typography variant="h6" className="mb-4 font-bold">
                        Application summary
                    </Typography>
                    <Divider className="my-2" />
                    <Stack spacing={2}>
                        <BoxSection className="flex justify-between">
                            <Typography className="me-3">Người đăng ký</Typography>
                            <Typography
                                fontWeight={600}
                            >{`${sellerRequest?.fullName} - ${sellerRequest?.email}`}</Typography>
                        </BoxSection>
                        <BoxSection className="flex justify-between">
                            <Typography className="me-3">Tên cửa hàng</Typography>
                            <Typography fontWeight={600}>{`${sellerRequest?.storeName}`}</Typography>
                        </BoxSection>
                        <BoxSection className="flex justify-between">
                            <Typography className="me-3">Danh mục</Typography>
                            <Typography fontWeight={600}>{`${sellerRequest?.primaryCategory.name}`}</Typography>
                        </BoxSection>
                        <BoxSection className="flex justify-between">
                            <Typography className="me-3">Xác thực</Typography>
                            <Typography fontWeight={600}>Đã xác thực</Typography>
                        </BoxSection>
                        <BoxSection className="flex justify-between">
                            <Typography className="me-3">Submitted</Typography>
                            <Typography fontWeight={600}>
                                {formatDate(sellerRequest?.createdAt, DATE_TIME_FORMAT["dd/MM/yyyy HH:mm"])}
                            </Typography>
                        </BoxSection>
                    </Stack>
                </BoxSection>
            </Box>
            <BoxSection className="mx-auto flex justify-end space-x-4">
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => (window.location.href = "/")}
                    startIcon={<HomeOutlined />}
                >
                    Về trang chủ
                </Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => (window.location.href = "/user/profile")}
                    startIcon={<PersonOutline />}
                >
                    Vào tài khoản của tôi
                </Button>
            </BoxSection>
        </Stack>
    );
};

export default RequestSubmittedStep;
