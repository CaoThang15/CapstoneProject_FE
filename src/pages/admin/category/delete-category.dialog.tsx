import { Button, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import { useMutationDeleteCategory } from "~/services/categories/hooks/mutations";
import { showToast } from "~/utils";

interface Props extends IBaseDialogProps {
    categoryId: number;
}

export const DeleteCategoryConfirmPopup: React.FC<Props> = ({ open, onClose, categoryId }) => {
    const { mutateAsync: deleteCategory, isPending: isDeleting } = useMutationDeleteCategory();

    const handleApprove = async () => {
        await deleteCategory(categoryId);
        showToast.success("Category deleted successfully");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Dialog.Header title="Confirm delete user" />
            <Dialog.Body>
                <BoxSection className="mx-2 my-4">
                    <Typography>Are you sure you want to delete this category ?</Typography>
                </BoxSection>
            </Dialog.Body>
            <Dialog.Action>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleApprove} loading={isDeleting} loadingPosition="start">
                    Remove
                </Button>
            </Dialog.Action>
        </Dialog>
    );
};
