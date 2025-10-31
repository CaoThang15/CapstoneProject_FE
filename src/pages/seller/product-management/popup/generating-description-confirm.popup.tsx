import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { BoxSection } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";

interface Props extends IBaseDialogProps {
    description: string;
}

export const GeneratingDescriptionConfirmPopup: React.FC<Props> = ({ open, onClose, description }) => {
    const form = useFormContext();

    const handleApprove = () => {
        form.setValue("description", description);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header title="Generate product description" />
            <Dialog.Body>
                <BoxSection className="m-2">
                    <Stack spacing={2}>
                        <Typography>
                            This is the suggested product description generated based on the information you provided.
                            Do you want to use this description for your product?
                        </Typography>
                        <BoxSection>
                            <Typography variant="subtitle2" gutterBottom>
                                Suggested Description:
                            </Typography>
                            <Typography>{description}</Typography>
                        </BoxSection>
                    </Stack>
                </BoxSection>
            </Dialog.Body>
            <Dialog.Action>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleApprove}>
                    Confirm
                </Button>
            </Dialog.Action>
        </Dialog>
    );
};
