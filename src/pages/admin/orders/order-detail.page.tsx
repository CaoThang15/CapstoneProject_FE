import { InfoOutlined, LocalMallOutlined, PersonOutline, UndoOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { BoxSection, ImageRenderer, LoadingContainer } from "~/components/common";
import { DATE_TIME_FORMAT } from "~/constants/date-time.format";
import { IdPathParams } from "~/routes/types";
import { useQueryGetOrderById } from "~/services/orders/hooks/queries";
import { formatCurrencyVND } from "~/utils/currency";
import { formatDate } from "~/utils/date-time";
import { ChangeOrderStatusPopup } from "./change-order-status.popup";

const AdminOrderDetailPage: React.FC = () => {
    const { id } = useParams<IdPathParams>();
    const navigate = useNavigate();
    const { data: order, isLoading } = useQueryGetOrderById(Number(id));

    const [isChangeStatusPopupOpen, setIsChangeStatusPopupOpen] = React.useState<boolean>(false);

    if (!order) {
        return null;
    }

    return (
        <LoadingContainer isLoading={isLoading}>
            <Stack className="px-2 py-3" spacing={3}>
                <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                    <Box>
                        <Typography variant="h6">Chi tiết đơn hàng</Typography>
                        <Typography className="text-sm text-gray-500">
                            Quản lý và theo dõi trạng thái đơn hàng của bạn
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/admin/order")}
                        startIcon={<UndoOutlined />}
                    >
                        Back to list
                    </Button>
                </BoxSection>

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <BoxSection className="">
                            <Stack direction="row" alignItems="center" className="w-full">
                                <LocalMallOutlined />
                                <Typography className="p-3" fontSize={14} fontWeight={500}>
                                    Items ({order.orderDetails.length})
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1} className="w-full">
                                {order.orderDetails.map((orderDetail) => (
                                    <BoxSection
                                        key={orderDetail.id}
                                        className="flex w-full items-center justify-between border-gray-200 bg-gray-100 p-2"
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
                            <Stack direction="row" justifyContent="space-between" fontSize={14}>
                                <Typography>Subtotal</Typography>
                                <Typography>
                                    {formatCurrencyVND(
                                        order.orderDetails.reduce(
                                            (acc, item) => acc + item.quantity * item.unitPrice,
                                            0,
                                        ),
                                    )}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" fontSize={14}>
                                <Typography>Voucher</Typography>
                                <Typography>- {formatCurrencyVND(10000)}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" fontSize={14}>
                                <Typography>Total</Typography>
                                <Typography> {formatCurrencyVND(order.totalAmount)}</Typography>
                            </Stack>
                        </BoxSection>
                    </Grid>
                    <Grid size={6}>
                        {/* Order Info */}
                        <BoxSection>
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <PersonOutline fontSize="small" />
                                <Typography fontWeight={600}>Khách hàng</Typography>
                            </Stack>
                            <Stack spacing={1}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar src={order.customer.avatar} />
                                    <Box>
                                        <Typography fontWeight={600}>{order.customer.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.customer.email} • {order.customer.phone}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Divider />
                                <Box mt={1}>
                                    <Typography fontWeight={500}>Địa chỉ giao hàng:</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {order.shippingAddress}
                                    </Typography>
                                </Box>
                            </Stack>
                        </BoxSection>
                    </Grid>
                    <Grid size={6}>
                        <BoxSection>
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <InfoOutlined fontSize="small" />
                                <Typography fontWeight={600}>Thông tin đơn hàng</Typography>
                            </Stack>

                            <Stack spacing={1} direction="row">
                                <BoxSection className="w-full">
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography>Mã đơn hàng</Typography>
                                        <Typography>{order.id}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography>Ngày đặt hàng</Typography>
                                        <Typography>
                                            {formatDate(order.orderDate, DATE_TIME_FORMAT["dd/MM/yyyy HH:mm"])}
                                        </Typography>
                                    </Stack>
                                </BoxSection>
                                <BoxSection className="w-full">
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography>Trạng thái</Typography>
                                        <Chip
                                            label={order.statusName}
                                            className="cursor-pointer"
                                            color="warning"
                                            size="small"
                                            onClick={() => setIsChangeStatusPopupOpen(true)}
                                        />
                                    </Stack>
                                </BoxSection>
                            </Stack>
                        </BoxSection>
                    </Grid>
                </Grid>
            </Stack>
            {isChangeStatusPopupOpen && (
                <ChangeOrderStatusPopup
                    open={isChangeStatusPopupOpen}
                    onClose={() => setIsChangeStatusPopupOpen(false)}
                    orderId={order.id}
                    currentStatus={order.statusId}
                />
            )}
        </LoadingContainer>
    );
};

export default AdminOrderDetailPage;
