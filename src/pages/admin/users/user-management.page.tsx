import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import dayjs from "dayjs";
import React from "react";
import { BoxSection } from "~/components/common";
import { AgDataGrid, useAgGrid } from "~/components/common/ag-grid";
import { SearchBox } from "~/components/common/search-box";
import DynamicForm from "~/components/form/dynamic-form";
import { useForm } from "~/components/form/hooks/use-form";
import { User } from "~/entities";
import { usePagination } from "~/hooks";
import { useQueryGetUsersWithPagination } from "~/services/users/hooks/queries";
import { GetUsersWithPaginationRequest } from "~/services/users/infras";
import { DeleteUserConfirmPopup } from "./dialog/delete-user.dialog";

const AdminUserManagementPage: React.FC = () => {
    const form = useForm<GetUsersWithPaginationRequest>();
    const agGrid = useAgGrid();
    const { handlePageChange, pageIndex, pageSize, resetPagination } = usePagination();

    const [searchValue, setSearchValue] = React.useState<string>("");
    const [deleteUserId, setDeleteUserId] = React.useState<number | null>(null);

    const {
        data: { items: listUsers, total: totalUsers },
        isLoading,
    } = useQueryGetUsersWithPagination({
        searchTerm: searchValue,
        page: pageIndex,
        pageSize,
    });

    React.useEffect(() => {
        resetPagination();
    }, [searchValue]);

    const colDefs: ColDef<User>[] = [
        {
            width: 80,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams<User>) => {
                const rowNumber = params.node.rowIndex + 1 + (pageIndex - 1) * pageSize;
                return <Typography>{rowNumber}</Typography>;
            },
        },

        {
            headerName: "Name",
            flex: 1.5,
            cellStyle: { whiteSpace: "normal", lineHeight: "1.4" },
            autoHeight: true,
            cellRenderer: (params: ICellRendererParams<User>) => {
                return (
                    <Box className="flex items-center gap-3 p-2">
                        <Avatar src={params.data.avatar} alt={params.data.name} />
                        <Typography className="break-words" sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                            {params.data.name}
                        </Typography>
                    </Box>
                );
            },
        },

        {
            field: "email",
            headerName: "Email",
            cellClass: "ag-cell-center",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone",
            cellClass: "ag-cell-center",
        },
        {
            headerName: "Role",
            field: "roleName",
            cellClass: "ag-cell-center",
            flex: 1,
        },
        {
            headerName: "Registered at",
            field: "createdAt",
            valueGetter: (params) => `${dayjs(params.data.createdAt).fromNow()}`,
            cellClass: "ag-cell-center",
            flex: 1,
        },
        {
            headerName: "Actions",
            cellRenderer: (params: ICellRendererParams<User>) => {
                return (
                    <Stack direction={"row"} spacing={1} className="h-full items-center justify-center">
                        {params.data.isSuspended ? (
                            <Button color="error" onClick={() => setDeleteUserId(params.data.id)}>
                                Mở khoá
                            </Button>
                        ) : (
                            <Button color="error" onClick={() => setDeleteUserId(params.data.id)}>
                                Khoá tài khoản
                            </Button>
                        )}
                    </Stack>
                );
            },
            flex: 1.1,
        },
    ];

    return (
        <DynamicForm form={form}>
            <Stack className="px-2 py-3" spacing={3}>
                <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                    <Box>
                        <Typography variant="h6">My Userss</Typography>
                        <Typography className="text-sm text-gray-500">
                            Manage your active, sold, and draft items
                        </Typography>
                    </Box>
                </BoxSection>
                <BoxSection className="flex items-center justify-between border border-gray-200">
                    <Stack className="w-full justify-end" direction="row" spacing={1}>
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
                        <Typography variant="h6">{totalUsers}</Typography>
                        <Typography className="text-sm text-gray-500">Active listings</Typography>
                    </BoxSection>
                </Stack>

                <AgDataGrid
                    columnDefs={colDefs}
                    rowData={listUsers}
                    pagination={true}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    loading={isLoading}
                    totalItems={totalUsers}
                    onPageChange={handlePageChange}
                    {...agGrid}
                />
                <DeleteUserConfirmPopup
                    open={!!deleteUserId}
                    onClose={() => setDeleteUserId(null)}
                    userId={deleteUserId!}
                    userName={listUsers.find((user) => user.id === deleteUserId!)?.name || ""}
                />
            </Stack>
        </DynamicForm>
    );
};

export default AdminUserManagementPage;
