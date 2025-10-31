import { AddOutlined } from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import dayjs from "dayjs";
import React from "react";
import { BoxSection } from "~/components/common";
import { AgDataGrid, useAgGrid } from "~/components/common/ag-grid";
import { SearchBox } from "~/components/common/search-box";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { toBaseOption } from "~/components/form/utils";
import { ProductStatus } from "~/constants/enums";
import { useAuth } from "~/contexts/auth.context";
import { Category, Product } from "~/entities";
import { usePagination } from "~/hooks";
import { useQueryCategories } from "~/services/categories/hooks/queries";
import { useQueryGetProductWithPagination } from "~/services/products/hooks/queries";
import { GetProductWithPaginationRequest } from "~/services/products/infras";
import { formatCurrencyVND } from "~/utils/currency";

const ProductManagementPage: React.FC = () => {
    const { user } = useAuth();
    const [searchValue, setSearchValue] = React.useState<string>("");
    const agGrid = useAgGrid();
    const form = useForm<GetProductWithPaginationRequest>();
    const { handlePageChange, pageIndex, pageSize } = usePagination();
    const { data: listCategories } = useQueryCategories();

    const {
        data: { items: listProducts, total: totalProducts },
        isLoading,
    } = useQueryGetProductWithPagination({
        sellerId: user.id,
        keyword: searchValue,
        page: pageIndex,
        pageSize,
        ...form.watch(),
    });

    const colDefs: ColDef<Product>[] = [
        { headerName: "Name", field: "name", flex: 2, cellClass: "ag-cell-center" },

        {
            field: "price",
            headerName: "Price",
            cellClass: "ag-cell-center",
            valueGetter: (params) => formatCurrencyVND(params.data.price),
            flex: 1,
        },
        { field: "stockQuantity", headerName: "Quantity", flex: 0.5, cellClass: "ag-cell-center" },
        {
            field: "status",
            headerName: "Status",
            flex: 0.5,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams<Product>) => {
                switch (params.data.status) {
                    case ProductStatus.APPROVED:
                        return <Chip label="Approved" color="success" />;
                    case ProductStatus.REJECTED:
                        return <Chip label="Rejected" color="error" />;
                    default:
                        return <Chip label="Pending" color="info" />;
                }
            },
        },
        {
            headerName: "Created at",
            field: "createdAt",
            valueGetter: (params) => `Posted ${dayjs(params.data.createdAt).fromNow()}`,
            cellClass: "ag-cell-center",
            flex: 1,
        },
        {
            headerName: "Actions",
            cellRenderer: (params: ICellRendererParams<Product>) => {
                return (
                    <Stack direction={"row"} spacing={1} className="justify-center">
                        <Button
                            variant="contained"
                            onClick={() => (window.location.href = `/seller/products/update/${params.data.id}`)}
                        >
                            Edit
                        </Button>
                        <Button color="error">Remove</Button>
                    </Stack>
                );
            },
            flex: 1.1,
        },
    ];

    const totalProductQuantity = React.useMemo(() => {
        return listProducts.reduce((acc, curr) => acc + curr.stockQuantity, 0);
    }, [isLoading, totalProducts]);

    const totalPrice = React.useMemo(() => {
        return listProducts.reduce((acc, curr) => acc + curr.stockQuantity * curr.price, 0);
    }, [isLoading, totalProducts]);

    return (
        <DynamicForm form={form}>
            <Stack className="px-2 py-3" spacing={3}>
                <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                    <Box>
                        <Typography variant="h6">My Products</Typography>
                        <Typography className="text-sm text-gray-500">
                            Manage your active, sold, and draft items
                        </Typography>
                    </Box>
                    <Stack spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<AddOutlined />}
                            onClick={() => (window.location.href = "/seller/products/create")}
                        >
                            New Product
                        </Button>
                    </Stack>
                </BoxSection>
                <BoxSection className="flex items-center justify-between border border-gray-200">
                    <Stack className="w-full justify-end" direction="row" spacing={1}>
                        <FormItem
                            render="autocomplete"
                            name="categoryId"
                            options={toBaseOption<Category>(listCategories, {
                                label: "name",
                                value: "id",
                            })}
                            placeholder="Categories"
                            className="w-[200px] max-w-[200px] rounded-xl"
                        />
                        <SearchBox
                            onChange={(value) => {
                                setSearchValue(value);
                            }}
                            placeholder="Search products"
                            className="w-1/4"
                        />
                    </Stack>
                </BoxSection>
                <Stack direction="row" spacing={2}>
                    <BoxSection className="w-full border border-gray-200">
                        <Typography variant="h6">{totalProducts}</Typography>
                        <Typography className="text-sm text-gray-500">Active listings</Typography>
                    </BoxSection>
                    <BoxSection className="w-full border border-gray-200">
                        <Typography variant="h6">{formatCurrencyVND(totalPrice)}</Typography>
                        <Typography className="text-sm text-gray-500">Potential value</Typography>
                    </BoxSection>
                    <BoxSection className="w-full border border-gray-200">
                        <Typography variant="h6">{totalProductQuantity}</Typography>
                        <Typography className="text-sm text-gray-500">In reviewing</Typography>
                    </BoxSection>
                </Stack>

                <AgDataGrid
                    columnDefs={colDefs}
                    rowData={listProducts}
                    pagination={true}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    loading={isLoading}
                    totalItems={totalProducts}
                    onPageChange={handlePageChange}
                    {...agGrid}
                />
            </Stack>
        </DynamicForm>
    );
};

export default ProductManagementPage;
