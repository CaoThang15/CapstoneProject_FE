import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import React from "react";
import { useForm } from "react-hook-form";
import { BoxSection } from "~/components/common";
import { AgDataGrid, useAgGrid } from "~/components/common/ag-grid";
import { SearchBox } from "~/components/common/search-box";
import DynamicForm from "~/components/form/dynamic-form";
import { usePagination } from "~/hooks";
import { GetProductWithPaginationRequest } from "~/services/products/infras";
import SellerApprovalResponsePopup from "./seller-approval-response.popup";
import { useQueryGetSellerRequestWithPagination } from "~/services/seller-request/hooks/queries";
import { SellerRequest, SellerRequestStatus } from "~/entities/seller-request.entity";
import { DATE_TIME_FORMAT } from "~/constants/date-time.format";
import { formatDate } from "~/utils/date-time";
import SellerApprovalDetailDialog from "./seller-approval-detail.page ";

const SellerApprovalManagementPage = () => {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [selectedSellerRequest, setSelectedSellerRequest] = React.useState<SellerRequest | null>(null);
    const [isResponsePopupOpen, setIsResponsePopupOpen] = React.useState<boolean>(false);
    const [isApproval, setIsApproval] = React.useState<boolean>(false);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState<boolean>(false);
    const [selectedSellerRequestId, setSelectedSellerRequestId] = React.useState<number | null>(null);

    const form = useForm<GetProductWithPaginationRequest>();
    const agGrid = useAgGrid();
    const { handlePageChange, pageIndex, pageSize } = usePagination();

    const {
        data: { items: sellerRequests, total: totalSellerRequests },
        isLoading,
    } = useQueryGetSellerRequestWithPagination({ page: pageIndex, pageSize, searchTerm });

    const colDefs: ColDef<SellerRequest>[] = [
        {
            width: 80,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams) => {
                const rowNumber = params.node.rowIndex + 1 + (pageIndex - 1) * pageSize;
                return <Typography>{rowNumber}</Typography>;
            },
        },
        {
            headerName: "Applicant",
            autoHeight: true,
            cellStyle: { whiteSpace: "normal", lineHeight: "1.4" },
            flex: 1.5,
            cellClass: "ag-cell-center",
            cellRenderer: (params: ICellRendererParams<SellerRequest>) => {
                return (
                    <Box className="flex items-center gap-3 p-2">
                        <Avatar src={params.data.user.avatar}>{params.data.fullName.charAt(0)}</Avatar>
                        <Typography className="break-words" sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                            {params.data.fullName}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            headerName: "Store",
            field: "storeName",
            cellClass: "ag-cell-center",
            flex: 1,
        },
        {
            headerName: "Application Date",
            valueFormatter: (params: ValueFormatterParams<SellerRequest>) => {
                return formatDate(params.data.createdAt, DATE_TIME_FORMAT["dd/MM/yyyy HH:mm"]);
            },
            cellClass: "ag-cell-center",
            flex: 1,
        },
        {
            headerName: "Category",
            cellClass: "ag-cell-center",
            field: "primaryCategory.name",
            flex: 1,
        },
        {
            headerName: "Legal Type",
            cellClass: "ag-cell-center",
            field: "legalTypeName",
            flex: 1,
        },
        {
            headerName: "Status",
            field: "statusName",
            cellClass: "ag-cell-center",
            flex: 1,
        },
        {
            headerName: "Actions",
            cellClass: "ag-cell-center",
            flex: 1.5,
            cellRenderer: (params: ICellRendererParams<SellerRequest>) => {
                return (
                    <Box className="flex justify-center space-x-2">
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => {
                                setSelectedSellerRequestId(params.data.id);
                                setIsDetailDialogOpen(true);
                            }}
                        >
                            View
                        </Button>
                        {params.data.sellerRequestStatus == SellerRequestStatus.PENDING && (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        setSelectedSellerRequest(params.data);
                                        setIsApproval(true);
                                        setIsResponsePopupOpen(true);
                                    }}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                        setSelectedSellerRequest(params.data);
                                        setIsApproval(false);
                                        setIsResponsePopupOpen(true);
                                    }}
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                    </Box>
                );
            },
        },
    ];
    return (
        <>
            <DynamicForm form={form}>
                <Stack className="px-2 py-3" spacing={3}>
                    <BoxSection className="flex items-center justify-between border border-gray-200 p-3">
                        <Box>
                            <Typography variant="h6">Seller Requests</Typography>
                            <Typography className="text-sm text-gray-500">
                                Review, approve, or reject seller applications
                            </Typography>
                        </Box>
                        <SearchBox
                            onChange={(value) => {
                                setSearchTerm(value);
                            }}
                            placeholder="Search by applicant name, store name, or email"
                            className="w-1/4"
                        />
                    </BoxSection>

                    <AgDataGrid
                        columnDefs={colDefs}
                        rowData={sellerRequests}
                        pagination={true}
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        totalItems={totalSellerRequests}
                        loading={isLoading}
                        onPageChange={handlePageChange}
                        {...agGrid}
                    />
                </Stack>
                <SellerApprovalDetailDialog
                    requestId={selectedSellerRequestId}
                    open={isDetailDialogOpen}
                    onClose={() => {
                        setIsDetailDialogOpen(false);
                        setSelectedSellerRequestId(null);
                    }}
                />
                <SellerApprovalResponsePopup
                    isApproval={isApproval}
                    open={isResponsePopupOpen}
                    sellerRequest={selectedSellerRequest}
                    onClose={() => {
                        setIsResponsePopupOpen(false);
                        setSelectedSellerRequest(null);
                        setIsApproval(false);
                    }}
                />
            </DynamicForm>
        </>
    );
};

export default SellerApprovalManagementPage;
