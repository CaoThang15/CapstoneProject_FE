import { Avatar, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import { OrderDetail } from "~/entities";

// TODO: handle view detail feedback

interface OrderFeedbackDetailDialogProps extends IBaseDialogProps {
    orderDetails: OrderDetail[];
}
export const OrderFeedbackDetailDialog: React.FC<OrderFeedbackDetailDialogProps> = ({
    orderDetails,
    onClose,
    open,
}) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <Dialog.Header title="Leave Feedback " />
            <Dialog.Body className="mt-3">
                <Stack spacing={3}>
                    {orderDetails.map((orderDetail) => (
                        <BoxSection key={orderDetail.id}>
                            <Stack spacing={2}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        src={orderDetail.productImagePath}
                                        variant="square"
                                        sx={{ width: 60, height: 60 }}
                                    />
                                    <Typography fontWeight={500}>{orderDetail.productName}</Typography>
                                </Stack>
                            </Stack>
                        </BoxSection>
                    ))}
                </Stack>
            </Dialog.Body>
            <Divider />
        </Dialog>
    );
};
