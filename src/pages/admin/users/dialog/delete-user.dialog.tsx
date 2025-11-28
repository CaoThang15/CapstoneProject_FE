import { Button, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import { useMutationDeleteUser } from "~/services/users/hooks/mutations";
import { showToast } from "~/utils";

interface Props extends IBaseDialogProps {
    userId: number;
    userName: string;
}

export const DeleteUserConfirmPopup: React.FC<Props> = ({ open, onClose, userId, userName }) => {
    const { mutateAsync: deleteUser, isPending: isDeleting } = useMutationDeleteUser();

    const handleApprove = async () => {
        await deleteUser(userId);
        showToast.success("User deleted successfully");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Dialog.Header title="Confirm delete user" />
            <Dialog.Body>
                <BoxSection className="mx-2 my-4">
                    <Typography>Are you sure you want to delete user: {userName}?</Typography>
                    <Typography>This action cannot be undone.</Typography>
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
