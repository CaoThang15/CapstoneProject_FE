import { AddOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { AgDataGrid, useAgGrid } from "~/components/common/ag-grid";
import { usePagination } from "~/hooks";
import CreateCategoryDialog from "./create-category.dialog";
import { useQueryCategories } from "~/services/categories/hooks/queries";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Category } from "~/entities";
import EditCategoryDialog from "./edit-category.dialog";
import { DeleteCategoryConfirmPopup } from "./delete-category.dialog";

const CategoryManagementPage: React.FC = () => {
    const [openCreateDialog, setOpenCreateDialog] = React.useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null);

    const agGrid = useAgGrid();
    const { handlePageChange, pageIndex, pageSize } = usePagination();
    const { data: listCategories, isLoading } = useQueryCategories();

    const columnDefs: ColDef<Category>[] = [
        {
            width: 60,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams<Category>) => {
                const rowNumber = params.node.rowIndex + 1 + (pageIndex - 1) * pageSize;
                return <Typography>{rowNumber}</Typography>;
            },
        },
        {
            headerName: "Category Name",
            flex: 1,
            field: "name",
        },
        {
            headerName: "Actions",
            flex: 0.3,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams<Category>) => (
                <React.Fragment>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => (window.location.href = `/admin/categories/${params.data.id}`)}
                    >
                        View
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => {
                            setSelectedCategoryId(params.data.id);
                            setOpenEditDialog(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        color="error"
                        onClick={() => {
                            setSelectedCategoryId(params.data.id);
                            setOpenDeleteDialog(true);
                        }}
                    >
                        Delete
                    </Button>
                </React.Fragment>
            ),
        },
    ];
    return (
        <Stack className="px-2 py-3" spacing={3}>
            <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                <Box>
                    <Typography variant="h6">Category</Typography>
                    <Typography className="text-sm text-gray-500">Manage your categories</Typography>
                </Box>
                <Stack spacing={2}>
                    <Button variant="contained" startIcon={<AddOutlined />} onClick={() => setOpenCreateDialog(true)}>
                        New Category
                    </Button>
                </Stack>
            </BoxSection>
            <AgDataGrid
                columnDefs={columnDefs}
                rowData={listCategories}
                pagination={true}
                pageSize={pageSize}
                pageIndex={pageIndex}
                loading={isLoading}
                totalItems={1}
                onPageChange={handlePageChange}
                {...agGrid}
            />

            {openCreateDialog && (
                <CreateCategoryDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
            )}

            {openEditDialog && (
                <EditCategoryDialog
                    open={openEditDialog}
                    categoryId={selectedCategoryId}
                    onClose={() => setOpenEditDialog(false)}
                />
            )}

            {openDeleteDialog && (
                <DeleteCategoryConfirmPopup
                    open={openDeleteDialog}
                    categoryId={selectedCategoryId}
                    onClose={() => setOpenDeleteDialog(false)}
                />
            )}
        </Stack>
    );
};

export default CategoryManagementPage;
