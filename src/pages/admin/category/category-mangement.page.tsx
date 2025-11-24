import { AddOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { AgDataGrid, useAgGrid } from "~/components/common/ag-grid";
import { usePagination } from "~/hooks";

const CategoryManagementPage: React.FC = () => {
    const agGrid = useAgGrid();
    const { handlePageChange, pageIndex, pageSize } = usePagination();
    return (
        // <DynamicForm form={form}>
        <Stack className="px-2 py-3" spacing={3}>
            <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                <Box>
                    <Typography variant="h6">Category</Typography>
                    <Typography className="text-sm text-gray-500">Manage your categoriess</Typography>
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
            <AgDataGrid
                columnDefs={[]}
                rowData={[]}
                pagination={true}
                pageSize={pageSize}
                pageIndex={pageIndex}
                loading={false}
                totalItems={1}
                onPageChange={handlePageChange}
                {...agGrid}
            />
            {/* <DeleteProductConfirmPopup
                open={!!deleteProductId}
                onClose={() => setDeleteProductId(null)}
                productId={deleteProductId!}
            /> */}
        </Stack>
        // </DynamicForm>
    );
};

export default CategoryManagementPage;
