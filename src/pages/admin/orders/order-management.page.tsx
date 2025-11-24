import { Avatar, Box, Button, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import React from "react";
import { BoxSection } from "~/components/common";
import { AgDataGrid, useAgGrid } from "~/components/common/ag-grid";
import { SearchBox } from "~/components/common/search-box";
import DynamicForm from "~/components/form/dynamic-form";
import { useForm } from "~/components/form/hooks/use-form";
import { DATE_TIME_FORMAT } from "~/constants/date-time.format";
import { OrderStatus } from "~/constants/enums";
import { Order } from "~/entities";
import { usePagination } from "~/hooks";
import { useQueryGetOrdersWithPagination } from "~/services/orders/hooks/queries";
import { GetOrdersRequest } from "~/services/orders/infras";
import { formatCurrencyVND } from "~/utils/currency";
import { formatDate } from "~/utils/date-time";

const ORDER_STATUS_OPTIONS = [
    { label: "Chờ xác nhận", value: OrderStatus.PendingConfirmation },
    { label: "Chờ giao hàng", value: OrderStatus.PendingShipment },
    { label: "Đang giao", value: OrderStatus.Shipping },
    { label: "Đã giao", value: OrderStatus.Delivered },
    { label: "Hoàn trả", value: OrderStatus.Returned },
    { label: "Đã hủy", value: OrderStatus.Cancelled },
];

const AdminOrderManagementPage: React.FC = () => {
    const agGrid = useAgGrid();
    const form = useForm<GetOrdersRequest>();
    const [statusFilter, setStatusFilter] = React.useState<OrderStatus | null>(null);

    const { handlePageChange, pageIndex, pageSize } = usePagination();
    const [searchValue, setSearchValue] = React.useState<string>("");
    const {
        data: { items: listOrders, total: totalOrders },
        isLoading,
    } = useQueryGetOrdersWithPagination({
        page: pageIndex,
        pageSize,
        keyword: searchValue,
        statusId: statusFilter ?? null,
        ...form.watch(),
    });

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setStatusFilter(newValue === 0 ? null : newValue);
    };

    const colDefs: ColDef<Order>[] = [
        {
            headerName: "Order ID",
            field: "id",
            flex: 0.5,
            cellClass: "ag-cell-center",
        },

        {
            headerName: "Customer",
            flex: 1.5,
            cellStyle: { whiteSpace: "normal", lineHeight: "1.4" },
            autoHeight: true,
            cellRenderer: (params: ICellRendererParams<Order>) => {
                return (
                    <Box className="flex items-center gap-3 p-2">
                        <Avatar src={params.data.customer?.avatar} alt={params.data.customer?.name} />
                        <Typography className="break-words" sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                            {params.data.customer?.name}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "createdAt",
            headerName: "Created At",
            cellClass: "ag-cell-center",
            valueGetter: (params) => formatDate(new Date(params.data.createdAt), DATE_TIME_FORMAT["yyyy-MM-dd"]),
            flex: 0.8,
        },
        {
            field: "totalAmount",
            headerName: "Total Amount",
            flex: 0.8,
            cellClass: "ag-cell-center",
            valueGetter: (params) => formatCurrencyVND(params.data.totalAmount),
        },
        {
            field: "statusId",
            headerName: "Status",
            flex: 0.8,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams<Order>) => {
                switch (params.data.statusId) {
                    case OrderStatus.Cancelled:
                        return <Chip label="Cancelled" color="error" />;
                    case OrderStatus.Delivered:
                        return <Chip label="Delivered" color="success" />;
                    case OrderStatus.Returned:
                        return <Chip label="Returned" color="error" />;
                    case OrderStatus.PendingConfirmation:
                        return <Chip label="Pending Confirmation" color="info" />;
                    case OrderStatus.PendingShipment:
                        return <Chip label="Pending Shipment" color="warning" />;
                    case OrderStatus.Shipping:
                        return <Chip label="Shipping" color="primary" />;
                }
            },
        },
        {
            headerName: "Actions",
            cellRenderer: (params: ICellRendererParams<Order>) => {
                return (
                    <Stack direction={"row"} spacing={1} className="h-full items-center justify-center">
                        <Button
                            variant="contained"
                            onClick={() => {
                                window.location.href = `/admin/orders/${params.data.id}`;
                            }}
                        >
                            View
                        </Button>
                    </Stack>
                );
            },
            flex: 1.1,
        },
    ];

    const totalPendingOrders = React.useMemo(() => {
        return listOrders.filter(
            (order) =>
                order.statusId === OrderStatus.PendingShipment || order.statusId === OrderStatus.PendingConfirmation,
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
                        <Typography className="text-sm text-gray-500">Active listings</Typography>
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
                <AgDataGrid
                    columnDefs={colDefs}
                    rowData={listOrders}
                    pagination={true}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    loading={isLoading}
                    totalItems={totalOrders}
                    onPageChange={handlePageChange}
                    {...agGrid}
                />
            </Stack>
        </DynamicForm>
    );
};

export default AdminOrderManagementPage;
