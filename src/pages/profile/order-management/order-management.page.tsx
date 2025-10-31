import { LocalShippingOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BoxSection, ImageRenderer, LoadingContainer } from "~/components/common";
import { SearchBox } from "~/components/common/search-box";
import DynamicForm from "~/components/form/dynamic-form";
import { useForm } from "~/components/form/hooks/use-form";
import { OrderStatus } from "~/constants/enums";
import { usePagination } from "~/hooks";
import { useQueryGetInfinityOrders } from "~/services/orders/hooks/queries";
import { GetOrdersRequest } from "~/services/orders/infras";
import { formatCurrencyVND } from "~/utils/currency";

const ORDER_STATUS_OPTIONS = [
    { label: "Chờ xác nhận", value: OrderStatus.PendingConfirmation },
    { label: "Chờ giao hàng", value: OrderStatus.PendingShipment },
    { label: "Đang giao", value: OrderStatus.Shipping },
    { label: "Đã giao", value: OrderStatus.Delivered },
    { label: "Hoàn trả", value: OrderStatus.Returned },
    { label: "Đã hủy", value: OrderStatus.Cancelled },
];

const StatusTypography: React.FC<{ statusId: OrderStatus; statusName: string }> = ({ statusId, statusName }) => {
    switch (statusId) {
        case OrderStatus.Delivered:
            return (
                <Stack direction="row" spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center" className="border-r pr-2">
                        <LocalShippingOutlined color="primary" />
                        <Typography variant="body2" color="primary.main">
                            Giao hàng thành công
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="primary.main">
                        {statusName}
                    </Typography>
                </Stack>
            );
        case OrderStatus.PendingConfirmation:
        case OrderStatus.PendingShipment:
        case OrderStatus.Shipping:
        case OrderStatus.Returned:
        case OrderStatus.Cancelled:
            return (
                <Typography variant="body2" color="primary.main">
                    {statusName}
                </Typography>
            );
    }
};
const OrderManagementPage: React.FC = () => {
    const [statusFilter, setStatusFilter] = React.useState<OrderStatus | null>(null);

    const form = useForm<GetOrdersRequest>();
    const { pageIndex, pageSize } = usePagination();
    const [searchValue, setSearchValue] = React.useState<string>("");

    const {
        data: { items: listOrders, total: totalOrders },
        fetchNextPage,
        hasNextPage,
        isLoading,
    } = useQueryGetInfinityOrders({
        page: pageIndex,
        pageSize,
        keyword: searchValue,
        statusId: statusFilter ?? null,
        ...form.watch(),
    });

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setStatusFilter(newValue === 0 ? null : newValue);
    };

    const totalPendingOrders = React.useMemo(() => {
        return listOrders.filter(
            (order) =>
                order.statusId === OrderStatus.PendingConfirmation || order.statusId === OrderStatus.PendingShipment,
        ).length;
    }, [isLoading, totalOrders]);

    const totalPrice = React.useMemo(() => {
        return listOrders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    }, [isLoading, totalOrders]);

    return (
        <DynamicForm form={form}>
            <Stack className="px-2 py-3" spacing={3}>
                <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                    <Box>
                        <Typography variant="h6">My Orders</Typography>
                        <Typography className="text-sm text-gray-500">Manage your orders here</Typography>
                    </Box>
                </BoxSection>
                <Stack direction="row" spacing={2}>
                    <BoxSection className="w-full border border-gray-200">
                        <Typography variant="h6">{totalOrders}</Typography>
                        <Typography className="text-sm text-gray-500">Total orders</Typography>
                    </BoxSection>
                    <BoxSection className="w-full border border-gray-200">
                        <Typography variant="h6">{formatCurrencyVND(totalPrice)}</Typography>
                        <Typography className="text-sm text-gray-500">Revenue value</Typography>
                    </BoxSection>
                    <BoxSection className="w-full border border-gray-200">
                        <Typography variant="h6">{totalPendingOrders}</Typography>
                        <Typography className="text-sm text-gray-500">Pending orders</Typography>
                    </BoxSection>
                </Stack>

                <BoxSection className="flex items-center justify-between border border-gray-200 !p-0">
                    <Stack direction="row" alignItems="center" justifyContent="space-between" className="w-full">
                        <Tabs
                            value={statusFilter ?? 0}
                            onChange={handleChange}
                            variant="fullWidth"
                            textColor="primary"
                            className="w-full"
                            indicatorColor="primary"
                            sx={{
                                "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
                            }}
                        >
                            <Tab label="Tất cả" value={0} />
                            {ORDER_STATUS_OPTIONS.map((status) => (
                                <Tab key={status.value} label={status.label} value={status.value} />
                            ))}
                        </Tabs>
                    </Stack>
                </BoxSection>

                <SearchBox
                    onChange={(value) => setSearchValue(value)}
                    placeholder="Search by ID, item or customer"
                    sx={{
                        "& .MuiInputBase-root": {
                            borderRadius: 2,
                        },
                    }}
                />
                <LoadingContainer isLoading={isLoading}>
                    <InfiniteScroll
                        dataLength={listOrders.length}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={
                            <Box className="flex justify-center py-4">
                                <CircularProgress size={24} />
                            </Box>
                        }
                    >
                        {listOrders?.length <= 0 ? (
                            <Box className="flex justify-center py-20">
                                <Typography variant="body1" color="text.secondary">
                                    No orders found
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {listOrders.map((order) => (
                                    <Grid size={{ xs: 12 }} key={order.id}>
                                        <Box>
                                            <BoxSection>
                                                <Box className="mb-2 flex items-center justify-between">
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Shop: {order.seller?.name}
                                                    </Typography>

                                                    <StatusTypography
                                                        statusId={order.statusId}
                                                        statusName={order.statusName}
                                                    />
                                                </Box>

                                                <Divider className="my-2" />
                                                {order.orderDetails.map((orderDetail) => (
                                                    <Stack
                                                        direction="row"
                                                        spacing={2}
                                                        key={orderDetail.id}
                                                        className="mb-2 flex cursor-pointer items-center"
                                                        onClick={() => {
                                                            window.location.href = `/orders/${order.id}`;
                                                        }}
                                                    >
                                                        <ImageRenderer
                                                            src={orderDetail.productImagePath}
                                                            alt={orderDetail.productName}
                                                            className="h-[64px] w-[64px] rounded-lg object-cover"
                                                        />
                                                        <Box className="ml-3 min-w-0 flex-1">
                                                            <Typography fontWeight={500} className="truncate">
                                                                {orderDetail.productName}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Quantity: {orderDetail.quantity}
                                                            </Typography>
                                                        </Box>
                                                        <Typography color="primary">
                                                            {formatCurrencyVND(
                                                                orderDetail.unitPrice * orderDetail.quantity,
                                                            )}
                                                        </Typography>
                                                    </Stack>
                                                ))}
                                            </BoxSection>
                                            <BoxSection className="flex justify-end bg-gray-50">
                                                <Typography fontSize={14}>
                                                    Total:{" "}
                                                    <span className="text-primary text-xl font-semibold">
                                                        {formatCurrencyVND(order.totalAmount)}
                                                    </span>
                                                </Typography>
                                            </BoxSection>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </InfiniteScroll>
                </LoadingContainer>
            </Stack>
        </DynamicForm>
    );
};

export default OrderManagementPage;
