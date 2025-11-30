import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { BoxSection, ImageRenderer } from "~/components/common";
import { AgDataGrid, useAgGrid } from "~/components/common/ag-grid";
import { SearchBox } from "~/components/common/search-box";
import { ProductStatus } from "~/constants/enums";
import { Product } from "~/entities";
import { usePagination } from "~/hooks";
import { IdPathParams } from "~/routes/types";
import { useQueryCategoryById } from "~/services/categories/hooks/queries";
import { useQueryGetProductWithPagination } from "~/services/products/hooks/queries";
import { formatCurrencyVND } from "~/utils/currency";

const CategoryDetailPage: React.FC = () => {
    const { id } = useParams<IdPathParams>();
    const navigate = useNavigate();
    const agGrid = useAgGrid();
    const { handlePageChange, pageIndex, pageSize } = usePagination();
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const { data: category, isLoading: isLoadingCategory } = useQueryCategoryById({ categoryId: id });
    const {
        isLoading: isLoadingProducts,
        data: { items: products, total },
    } = useQueryGetProductWithPagination({ categoryId: Number(id), page: pageIndex, pageSize, keyword: searchTerm });

    const colDefs: ColDef<Product>[] = [
        {
            width: 80,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams<Product>) => {
                const rowNumber = params.node.rowIndex + 1 + pageIndex * pageSize;
                return <Typography>{rowNumber}</Typography>;
            },
        },

        {
            headerName: "Name",
            flex: 1.5,
            cellStyle: { whiteSpace: "normal", lineHeight: "1.4" },
            autoHeight: true,
            cellRenderer: (params: ICellRendererParams<Product>) => {
                return (
                    <Box className="flex items-center gap-3 p-2">
                        <ImageRenderer
                            src={params.data.sharedFiles?.[0]?.path}
                            alt={params.data.name}
                            className="h-[100px] w-[100px] object-cover"
                        />
                        <Typography className="break-words" sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                            {params.data.name}
                        </Typography>
                    </Box>
                );
            },
        },

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
    ];

    return (
        <Stack className="px-2 py-3" spacing={3}>
            <BoxSection className="flex justify-end">
                <Button
                    variant="text"
                    onClick={() => {
                        navigate("/admin/categories");
                    }}
                >
                    &larr; Back to Categories
                </Button>
            </BoxSection>
            <BoxSection>
                <Box className="flex items-center justify-between">
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Danh sách sản phẩm của "{category?.name}"
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {isLoadingCategory ? "Đang chờ..." : `Có ${total} sản phẩm trong danh mục này`}
                        </Typography>
                    </Box>
                    <SearchBox
                        onChange={(value) => setSearchTerm(value)}
                        className="my-3 max-w-sm"
                        placeholder="Tìm kiếm sản phẩm trong danh mục..."
                    />
                </Box>
                <AgDataGrid
                    columnDefs={colDefs}
                    rowData={products}
                    pagination={true}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    loading={isLoadingProducts}
                    totalItems={total}
                    onPageChange={handlePageChange}
                    {...agGrid}
                />
            </BoxSection>
        </Stack>
    );
};

export default CategoryDetailPage;
