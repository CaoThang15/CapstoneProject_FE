import { CancelOutlined, CheckOutlined, FlipOutlined, ShoppingCartOutlined, UndoOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection, LoadingContainer } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { Voucher } from "~/entities";
import { useMutationApplyVoucher } from "~/services/voucher/hooks/mutation";
import { useQueryGetMyVoucher } from "~/services/voucher/hooks/queries";
import { formatCurrencyVND } from "~/utils/currency";
import { ProductCartItem } from "./types";

interface ApplyVoucherPopupProps extends IBaseDialogProps {
    cartItems?: ProductCartItem[];
    appliedVoucher?: Voucher | null;
    onApply?: (voucher: Voucher) => void;
}

const ApplyVoucherPopup: React.FC<ApplyVoucherPopupProps> = ({
    cartItems = [],
    appliedVoucher = null,
    onApply,
    open,
    onClose,
}) => {
    const form = useForm<{ voucherCode: string }>({
        defaultValues: {
            voucherCode: appliedVoucher?.code || "",
        },
    });

    const [draftVoucher, setDraftVoucher] = React.useState<Voucher | null>(null);
    const { mutateAsync: applyVoucher, isPending: isApplying } = useMutationApplyVoucher();
    const { data: myVouchers, isLoading } = useQueryGetMyVoucher();

    const handleSubmit = async (data: { voucherCode: string }) => {
        const response = await applyVoucher(data.voucherCode);
        if (response) {
            setDraftVoucher(response);
        }
    };

    const handleApplyVoucher = (voucher: Voucher) => {
        setDraftVoucher(voucher);
        form.setValue("voucherCode", voucher.code);
    };

    const subTotal = React.useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const itemTotal = item.quantity ? item.price * item.quantity : 0;
            return sum + itemTotal;
        }, 0);
    }, [cartItems]);

    return (
        <Dialog open={open}>
            <Dialog.Header title="Apply Voucher"></Dialog.Header>
            <Dialog.Body>
                <Stack spacing={2} className="my-2 w-full">
                    <BoxSection className="bg-[#e6fdf7] !p-3">
                        <Typography>
                            <span className="me-3">
                                <ShoppingCartOutlined />
                            </span>
                            {cartItems.length} - Subtotal {formatCurrencyVND(subTotal)}
                        </Typography>
                    </BoxSection>
                    <DynamicForm form={form} onSubmit={handleSubmit}>
                        <BoxSection className="flex !w-full items-end space-x-3">
                            <Box className="flex-1">
                                <FormItem
                                    render="text-input"
                                    name="voucherCode"
                                    label="Voucher Code"
                                    placeholder="Enter code (e.g., SAVE20)"
                                    required
                                    fullWidth
                                    className="flex-1"
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                type="submit"
                                className="mb-4 h-10"
                                startIcon={<FlipOutlined sx={{ transform: "rotate(90deg)" }} />}
                                loading={isApplying}
                                loadingPosition="start"
                            >
                                Scan
                            </Button>
                        </BoxSection>
                    </DynamicForm>
                    <BoxSection>
                        <Typography fontWeight={600} fontSize={16}>
                            Available Vouchers
                        </Typography>
                        <Stack spacing={1}>
                            <LoadingContainer isLoading={isLoading}>
                                {myVouchers && myVouchers.length > 0 ? (
                                    myVouchers.map((voucher) => (
                                        <BoxSection className="flex items-center justify-between space-x-3">
                                            <Box>
                                                <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                                    {voucher.code}
                                                </Typography>
                                                <Typography
                                                    fontWeight={300}
                                                    fontSize={15}
                                                    color="text.secondary"
                                                    sx={{ wordBreak: "break-word", whiteSpace: "normal" }}
                                                >
                                                    {voucher.description}
                                                </Typography>
                                            </Box>
                                            <Box className="flex items-center space-x-2">
                                                <Typography>
                                                    {formatCurrencyVND(voucher.getDiscount(subTotal))}
                                                </Typography>
                                                <Button
                                                    variant={draftVoucher?.id === voucher.id ? "contained" : "outlined"}
                                                    color="primary"
                                                    disabled={draftVoucher?.id === voucher.id}
                                                    onClick={() => handleApplyVoucher(voucher)}
                                                >
                                                    Apply
                                                </Button>
                                            </Box>
                                        </BoxSection>
                                    ))
                                ) : (
                                    <Typography>No available vouchers</Typography>
                                )}
                            </LoadingContainer>
                        </Stack>
                    </BoxSection>
                    <BoxSection>
                        <Stack spacing={1}>
                            <Box className="flex items-center justify-between">
                                <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                    Subtotal
                                </Typography>
                                <Typography>{formatCurrencyVND(subTotal)}</Typography>
                            </Box>
                            <Box className="flex items-center justify-between">
                                <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                    Voucher discount
                                </Typography>

                                <Typography>
                                    - {formatCurrencyVND(draftVoucher ? draftVoucher.getDiscount(subTotal) : 0)}
                                </Typography>
                            </Box>
                            <Box className="flex items-center justify-between">
                                <Typography fontWeight={300} fontSize={15} color="text.secondary">
                                    Estimated total
                                </Typography>
                                <Typography>
                                    {formatCurrencyVND(
                                        subTotal - (draftVoucher ? draftVoucher.getDiscount(subTotal) : 0),
                                    )}
                                </Typography>
                            </Box>
                        </Stack>
                    </BoxSection>
                </Stack>
            </Dialog.Body>
            <Dialog.Action>
                <Button startIcon={<CancelOutlined />} variant="outlined" color="inherit" onClick={() => onClose()}>
                    Cancel
                </Button>
                <Button
                    startIcon={<UndoOutlined />}
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                        setDraftVoucher(null);
                    }}
                >
                    Remove voucher
                </Button>
                <Button
                    startIcon={<CheckOutlined />}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (draftVoucher && onApply) {
                            onApply(draftVoucher);
                        }
                        onClose();
                    }}
                >
                    Apply to cart
                </Button>
            </Dialog.Action>
        </Dialog>
    );
};

export default ApplyVoucherPopup;
