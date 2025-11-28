import { CheckOutlined, Close } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection, HighlightCard } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { SellerRequest } from "~/entities/seller-request.entity";
import { useMutationResponseSellerRequest } from "~/services/seller-request/hooks/mutations";
import { showToast } from "~/utils";
import { ISellerApprovalResponseFormValue } from "./types";

interface Props extends IBaseDialogProps {
    isApproval: boolean;
    sellerRequest?: SellerRequest;
}

const SellerApprovalResponsePopup: React.FC<Props> = ({ onClose, open, isApproval, sellerRequest }) => {
    const form = useForm<ISellerApprovalResponseFormValue>();
    const { mutateAsync: responseSellerRequest, isPending: isResponsePending } = useMutationResponseSellerRequest();

    const handleSubmit = async () => {
        await responseSellerRequest({
            data: {
                internalNote: form.getValues().internalNote,
                messageToSeller: form.getValues().messageToSeller,
                isApproved: isApproval,
            },
            requestId: sellerRequest!.id,
        });
        showToast.success(`Seller request has been ${isApproval ? "approved" : "rejected"} successfully.`);
        onClose();
    };

    return (
        <DynamicForm form={form} onSubmit={handleSubmit}>
            <Dialog open={open} onClose={onClose}>
                <Dialog.Header
                    onClose={onClose}
                    title={isApproval ? "Approve seller request" : "Reject seller request"}
                />
                <Dialog.Body>
                    <Box className="p-3">
                        <BoxSection className="flex space-x-3">
                            <Avatar />
                            <Box>
                                <Typography fontWeight={600} fontSize={14}>
                                    {sellerRequest?.fullName}
                                </Typography>
                                <Typography fontSize={12} fontWeight={300}>
                                    {sellerRequest?.user.email} - {sellerRequest?.storeName}
                                </Typography>
                            </Box>
                        </BoxSection>
                        <Box className="mt-4 flex h-full space-x-4">
                            <Box className="flex-1 space-y-3">
                                <FormItem label={"Internal Note"} required render="text-area" name="internalNote" />
                                <FormItem
                                    label={"Message To Seller"}
                                    required
                                    render="text-area"
                                    name="messageToSeller"
                                />
                            </Box>
                            <Box className="h-full w-1/3">
                                <Typography fontSize={12} fontWeight={500} className="mb-2">
                                    Summary
                                </Typography>
                                <BoxSection className="h-full">
                                    <Stack spacing={1}>
                                        <Box className="flex items-center justify-between space-x-3">
                                            <Typography fontWeight={400} fontSize={14}>
                                                Final status
                                            </Typography>
                                            <Chip
                                                label={isApproval ? "Approved" : "Rejected"}
                                                color={isApproval ? "primary" : "error"}
                                                icon={isApproval ? <CheckOutlined /> : <Close />}
                                            />
                                        </Box>
                                        <Box className="flex items-center justify-between">
                                            <Typography fontWeight={400} fontSize={14}>
                                                Category
                                            </Typography>
                                            <HighlightCard typography={sellerRequest?.primaryCategory.name} />
                                        </Box>
                                    </Stack>
                                </BoxSection>
                            </Box>
                        </Box>
                    </Box>
                </Dialog.Body>
                <Dialog.Action>
                    <Box className="flex w-full justify-end space-x-3">
                        <Button variant="outlined" color={"inherit"} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color={isApproval ? "primary" : "error"}
                            onClick={handleSubmit}
                            loading={isResponsePending}
                            loadingPosition="start"
                        >
                            {isApproval ? "Approve" : "Reject"}
                        </Button>
                    </Box>
                </Dialog.Action>
            </Dialog>
        </DynamicForm>
    );
};

export default SellerApprovalResponsePopup;
