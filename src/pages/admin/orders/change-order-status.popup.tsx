import { Box, Button } from "@mui/material";
import React from "react";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { toBaseOption } from "~/components/form/utils";
import { OrderStatus } from "~/constants/enums";
import { useMutationUpdateStatusOrder } from "~/services/orders/hooks/mutations";
import { showToast } from "~/utils";

const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PendingConfirmation]: [OrderStatus.PendingShipment, OrderStatus.Cancelled],
    [OrderStatus.PendingShipment]: [OrderStatus.Shipping, OrderStatus.Cancelled],
    [OrderStatus.Shipping]: [OrderStatus.Delivered, OrderStatus.Returned],
    [OrderStatus.Delivered]: [],
    [OrderStatus.Returned]: [],
    [OrderStatus.Cancelled]: [],
};

const ORDER_STATUS_OPTIONS = [
    { label: "Chờ xác nhận", value: OrderStatus.PendingConfirmation },
    { label: "Chờ giao hàng", value: OrderStatus.PendingShipment },
    { label: "Đang giao", value: OrderStatus.Shipping },
    { label: "Đã giao", value: OrderStatus.Delivered },
    { label: "Hoàn trả", value: OrderStatus.Returned },
    { label: "Đã hủy", value: OrderStatus.Cancelled },
];

interface ChangeOrderStatusPopupProps extends IBaseDialogProps {
    orderId: number;
    currentStatus: OrderStatus;
}
export const ChangeOrderStatusPopup: React.FC<ChangeOrderStatusPopupProps> = ({
    currentStatus,
    onClose,
    open,
    orderId,
}) => {
    const availableOptions = ORDER_STATUS_OPTIONS.filter((option) =>
        STATUS_TRANSITIONS[currentStatus].includes(option.value),
    );
    const { isPending, mutateAsync: updateOrderStatus } = useMutationUpdateStatusOrder();
    const form = useForm<{ status: OrderStatus }>({ defaultValues: { status: null } });

    const handleSubmit = async (data: { status: OrderStatus }) => {
        await updateOrderStatus({ orderId, status: data.status });
        form.reset();
        showToast.success("Order status updated successfully");
        onClose();
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };
    return (
        <DynamicForm form={form}>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <Dialog.Header title="Change Order Status" />
                <Dialog.Body>
                    <Box className="mt-2">
                        <FormItem
                            render="select"
                            name="status"
                            label="Order Status"
                            required
                            fullWidth
                            options={toBaseOption(availableOptions, { label: "label", value: "value" })}
                        />
                    </Box>
                </Dialog.Body>
                <Dialog.Action>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={form.handleSubmit(handleSubmit)}
                        loading={isPending}
                        loadingPosition="start"
                    >
                        Save
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </Dialog.Action>
            </Dialog>
        </DynamicForm>
    );
};
