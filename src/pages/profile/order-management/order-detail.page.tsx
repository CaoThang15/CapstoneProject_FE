import {
    ChevronLeftOutlined,
    LocalMallOutlined,
    LocationOnOutlined,
    NotesOutlined,
    PaymentOutlined,
    PersonOutline,
    ShieldOutlined,
    StarBorderRounded,
} from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { BoxSection, ImageRenderer, LoadingContainer } from "~/components/common";
import { IdPathParams } from "~/routes/types";
import { useQueryGetOrderById } from "~/services/orders/hooks/queries";
import { formatCurrencyVND } from "~/utils/currency";
import { OrderFeedbackDialog } from "./order-feedback/create-order-feedback.dialog";
import { OrderStatus } from "~/constants/enums";
import { useQueryGetProductFeedbacksWithPagination } from "~/services/feedbacks/hooks/queries";
import { useAuth } from "~/contexts/auth.context";

const OrderDetailPage: React.FC = () => {
    const { id } = useParams<IdPathParams>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: order, isLoading: isLoadingOrder } = useQueryGetOrderById(Number(id));
    const {
        data: { total },
        isLoading: isLoadingFeedbacks,
    } = useQueryGetProductFeedbacksWithPagination({
        page: 1,
        pageSize: 1,
        productId: order?.orderDetails[0]?.productId,
        userId: user?.id,
    });

    const [openFeedback, setOpenFeedback] = React.useState(false);

    if (!order) {
        return null;
    }

    return (
        <LoadingContainer isLoading={isLoadingOrder || isLoadingFeedbacks}>
            {order && (
                <>
                    <Stack className="px-2 py-3" spacing={3}>
                        <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                            <Box>
                                <Typography variant="h6">Đơn hàng #{order.id}</Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => navigate("/orders")}
                                startIcon={<ChevronLeftOutlined />}
                            >
                                Quay lại danh sách đơn
                            </Button>
                        </BoxSection>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, xl: 8 }}>
                                <BoxSection className="h-full">
                                    <Stack spacing={1} direction="row" alignItems="center" className="mb-2 w-full">
                                        <LocalMallOutlined />
                                        <Typography variant="h6" fontWeight={500}>
                                            Sản phẩm trong đơn
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={1} className="w-full">
                                        {order.orderDetails.map((orderDetail) => (
                                            <BoxSection
                                                key={orderDetail.id}
                                                className="flex w-full items-center justify-between border-gray-200 !bg-[#f6fbfa] bg-gray-100 p-2"
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    alignItems="center"
                                                    className="basis-1/2"
                                                >
                                                    <ImageRenderer
                                                        src={orderDetail.productImagePath}
                                                        className="h-[100px] w-[100px] object-cover"
                                                    />
                                                    <Typography variant="body2" fontWeight={600} fontSize={15}>
                                                        {orderDetail.productName}
                                                    </Typography>
                                                </Stack>

                                                <Typography variant="body2">
                                                    Số lượng: {orderDetail.quantity}
                                                </Typography>

                                                <Typography variant="body2" className="text-gray-500">
                                                    {formatCurrencyVND(orderDetail.quantity * orderDetail.unitPrice)}
                                                </Typography>
                                            </BoxSection>
                                        ))}
                                    </Stack>

                                    <Divider className="my-3" />

                                    <Box className="flex space-x-3">
                                        <Box className="w-full">
                                            <Typography fontSize={16} fontWeight={600}>
                                                <span className="mr-1">
                                                    <LocationOnOutlined />
                                                </span>
                                                Thông tin giao hàng
                                            </Typography>
                                            <Stack spacing={0.5} className="mt-1">
                                                <Typography>{order.customer.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {order.shippingAddress ?? "Không có"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {order.phoneNumber}
                                                </Typography>
                                            </Stack>
                                        </Box>

                                        {/* Payment method */}
                                        <Box className="w-full">
                                            <Typography fontSize={16} fontWeight={600}>
                                                <span className="mr-1">
                                                    <PaymentOutlined />
                                                </span>
                                                Phương thức thanh toán
                                            </Typography>
                                            <Typography className="mt-1 lowercase capitalize">
                                                {order.paymentMethod.toCase("pascal")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </BoxSection>
                            </Grid>

                            <Grid size={{ xs: 12, xl: 4 }}>
                                <BoxSection className="h-full">
                                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                        <PersonOutline fontSize="small" />
                                        <Typography fontWeight={600} color="primary">
                                            Thông tin đơn hàng
                                        </Typography>
                                    </Stack>

                                    <BoxSection>
                                        <Stack spacing={1}>
                                            <Stack spacing={2}>
                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                        Mã đơn hàng
                                                    </Typography>
                                                    <Typography>{order.id}</Typography>
                                                </Box>

                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                        Ngày đặt
                                                    </Typography>
                                                    <Typography>
                                                        {dayjs(order.createdAt).format("DD/MM/YYYY")}
                                                    </Typography>
                                                </Box>

                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                        Người bán
                                                    </Typography>
                                                    <Box className="flex items-center">
                                                        <Avatar src={order.seller.avatar} className="me-2" />
                                                        {order.seller.name}
                                                    </Box>
                                                </Box>

                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                        Trạng thái
                                                    </Typography>
                                                    <Typography color="primary">{order.statusName}</Typography>
                                                </Box>
                                            </Stack>

                                            <Divider className="!my-2" />

                                            <Stack spacing={2}>
                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                        Tạm tính
                                                    </Typography>
                                                    <Typography>
                                                        {formatCurrencyVND(
                                                            order.orderDetails.reduce(
                                                                (acc, item) => acc + item.quantity * item.unitPrice,
                                                                0,
                                                            ),
                                                        )}
                                                    </Typography>
                                                </Box>

                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                        Voucher
                                                    </Typography>
                                                    <Typography>
                                                        - {formatCurrencyVND(order?.discountAmount ?? 0)}
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            <Divider className="!my-2" />

                                            <Stack spacing={2}>
                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={600} color="text.secondary">
                                                        Tổng cộng
                                                    </Typography>
                                                    <Typography fontWeight={600} color="text.secondary">
                                                        {formatCurrencyVND(order.totalAmount - order.discountAmount)}
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            {order.statusId === OrderStatus.Delivered ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setOpenFeedback(true)}
                                                    startIcon={<StarBorderRounded />}
                                                >
                                                    {total > 0 ? "Chỉnh sửa đánh giá" : "Đánh giá sản phẩm"}
                                                </Button>
                                            ) : null}
                                        </Stack>
                                    </BoxSection>
                                </BoxSection>
                            </Grid>
                        </Grid>
                    </Stack>

                    <OrderFeedbackDialog
                        onClose={() => setOpenFeedback(false)}
                        open={openFeedback}
                        orderDetails={order.orderDetails}
                    />
                </>
            )}
        </LoadingContainer>
    );
};

export default OrderDetailPage;
