import { Button, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import { useMutationDeleteProduct } from "~/services/products/hooks/mutation";
import { showToast } from "~/utils";

interface Props extends IBaseDialogProps {
    productId: number;
}

export const DeleteProductConfirmPopup: React.FC<Props> = ({ open, onClose, productId }) => {
    const { mutateAsync: deleteProduct, isPending: isDeleting } = useMutationDeleteProduct();

    const handleApprove = async () => {
        await deleteProduct(productId);
        showToast.success("Product deleted successfully");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Dialog.Header title="Confirm delete product" />
            <Dialog.Body>
                <BoxSection className="mx-2 my-4">
                    <Typography>Are you sure you want to delete this product?</Typography>
                    <Typography>This action cannot be undone.</Typography>
                </BoxSection>
            </Dialog.Body>
            <Dialog.Action>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleApprove} loading={isDeleting} loadingPosition="start">
                    Confirm
                </Button>
            </Dialog.Action>
        </Dialog>
    );
};
