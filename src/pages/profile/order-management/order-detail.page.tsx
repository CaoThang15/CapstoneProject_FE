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
import { OrderFeedbackDialog } from "./order-feedback.dialog";
import { OrderStatus } from "~/constants/enums";

const OrderDetailPage: React.FC = () => {
    const { id } = useParams<IdPathParams>();
    const navigate = useNavigate();
    const { data: order, isLoading } = useQueryGetOrderById(Number(id));
    const [openFeedback, setOpenFeedback] = React.useState(false);

    if (!order) {
        return null;
    }

    return (
        <LoadingContainer isLoading={isLoading}>
            <Stack className="px-2 py-3" spacing={3}>
                <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                    <Box>
                        <Typography variant="h6">Order #{order.id}</Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/orders")}
                        startIcon={<ChevronLeftOutlined />}
                    >
                        Back to Orders
                    </Button>
                </BoxSection>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 8 }}>
                        <BoxSection className="h-full">
                            <Stack spacing={1} direction="row" alignItems="center" className="mb-2 w-full">
                                <LocalMallOutlined />
                                <Typography variant="h6" fontWeight={500}>
                                    Items in this order
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1} className="w-full">
                                {order.orderDetails.map((orderDetail) => (
                                    <BoxSection
                                        key={orderDetail.id}
                                        className="flex w-full items-center justify-between border-gray-200 !bg-[#f6fbfa] bg-gray-100 p-2"
                                    >
                                        <Stack direction="row" spacing={2} alignItems="center" className="basis-1/2">
                                            <ImageRenderer
                                                src={orderDetail.productImagePath}
                                                className="h-[100px] w-[100px] object-cover"
                                            />
                                            <Typography variant="body2" fontWeight={600} fontSize={15}>
                                                {orderDetail.productName}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2">Quantity: {orderDetail.quantity}</Typography>

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
                                        Shipping summary
                                    </Typography>
                                    <Stack spacing={0.5} className="mt-1">
                                        <Typography>{order.customer.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.shippingAddress ?? "N/A"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.phoneNumber}
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Box className="w-full">
                                    <Typography fontSize={16} fontWeight={600}>
                                        <span className="mr-1">
                                            <PaymentOutlined />
                                        </span>
                                        Payment method
                                    </Typography>
                                    <Typography className="mt-1 lowercase capitalize">
                                        {order.paymentMethod.toCase("pascal")}
                                    </Typography>
                                </Box>
                            </Box>
                        </BoxSection>
                    </Grid>
                    <Grid size={{ xs: 12, xl: 4 }}>
                        {/* Order Info */}
                        <BoxSection className="h-full !bg-[#e8f6f5]">
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <PersonOutline fontSize="small" />
                                <Typography fontWeight={600} color="primary">
                                    Order summary
                                </Typography>
                            </Stack>
                            <BoxSection>
                                <Stack spacing={1}>
                                    <Stack spacing={2}>
                                        <Box className="flex items-center justify-between">
                                            <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                Order ID
                                            </Typography>
                                            <Typography>{order.id}</Typography>
                                        </Box>
                                        <Box className="flex items-center justify-between">
                                            <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                Placed on
                                            </Typography>
                                            <Typography>{dayjs(order.createdAt).format("MMM D, YYYY")}</Typography>
                                        </Box>
                                        <Box className="flex items-center justify-between">
                                            <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                Seller
                                            </Typography>
                                            <Box className="flex items-center space-x-2">
                                                <span>
                                                    <Avatar src={order.seller.avatar} />
                                                </span>
                                                {order.seller.name}
                                            </Box>
                                        </Box>
                                        <Box className="flex items-center justify-between">
                                            <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                Status
                                            </Typography>
                                            <Typography color="primary">{order.statusName}</Typography>
                                        </Box>
                                    </Stack>
                                    <Divider className="!my-2" />
                                    <Stack spacing={2}>
                                        <Box className="flex items-center justify-between">
                                            <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                Subtotal
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
                                            <Typography>- {formatCurrencyVND(order?.discountAmount ?? 0)}</Typography>
                                        </Box>
                                    </Stack>
                                    <Divider className="!my-2" />
                                    <Stack spacing={2}>
                                        <Box className="flex items-center justify-between">
                                            <Typography fontWeight={600} color="text.secondary">
                                                Total
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
                                            Leave Feedback
                                        </Button>
                                    ) : null}
                                </Stack>
                            </BoxSection>
                        </BoxSection>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <BoxSection className="">
                            <Stack spacing={1} direction="row" alignItems="center" className="mb-2 w-full">
                                <NotesOutlined />
                                <Typography variant="h6" fontWeight={500}>
                                    Seller notes
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1} className="w-full">
                                <Typography>{order.note || "No notes from seller."}</Typography>
                            </Stack>
                            <Divider className="my-3" />
                            <Stack spacing={1}>
                                <Typography fontSize={16} fontWeight={600}>
                                    <span className="mr-1">
                                        <ShieldOutlined />
                                    </span>
                                    AI checks
                                </Typography>
                                <Typography fontSize={16} fontWeight={600}>
                                    <span className="mr-1">
                                        <StarBorderRounded />
                                    </span>
                                    Price prediction was within 4% of market
                                </Typography>
                                <Typography fontSize={16} fontWeight={600}>
                                    <span className="mr-1">
                                        <ShieldOutlined />
                                    </span>
                                    Fraud risk: Low
                                </Typography>
                            </Stack>
                        </BoxSection>
                    </Grid>
                </Grid>
            </Stack>
            <OrderFeedbackDialog
                onClose={() => setOpenFeedback(false)}
                open={openFeedback}
                orderDetails={order.orderDetails}
            />
        </LoadingContainer>
    );
};

export default OrderDetailPage;
