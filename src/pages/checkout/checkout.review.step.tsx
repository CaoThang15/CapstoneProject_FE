import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { BoxSection } from "~/components/common";
import ProductCheckoutSummary from "~/components/common/product/product-checkout.summary";
import { ProductCartResult } from "~/services/carts/hooks/use-query-get-product-cart";
import { useMutationCreateOrder } from "~/services/orders/hooks/mutations";
import { useCheckout } from "./checkout.context";
import { CreateOrderRequestFormValue } from "./types";
import { OrderPaymentMethod, TransactionType } from "~/constants/enums";
import { showToast } from "~/utils";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LocalStorageCartItems } from "../cart/types";
import { useQueryGetOrderQrCode } from "~/services/orders/hooks/queries";
import { PaymentQRCode } from "~/components/common/payment-qr-code";

interface Props {
    productCart: ProductCartResult[];
}
export const ReviewStep: React.FC<Props> = ({ productCart }) => {
    const [_, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

    const [qrOpen, setQrOpen] = React.useState<boolean>(false);
    const [createdOrderId, setCreatedOrderId] = React.useState<number | null>(null);

    const { mutateAsync: createOrder, isPending } = useMutationCreateOrder();

    const { setStep } = useCheckout();
    const navigate = useNavigate();
    const checkoutForm = useFormContext<CreateOrderRequestFormValue>();

    const { name, province, ward, phoneNumber, shippingAddress, paymentMethod } = checkoutForm.getValues();

    const paymentLabel = React.useMemo(() => {
        switch (paymentMethod) {
            case OrderPaymentMethod.CREDIT:
                return "Credit / Debit Card";
            case OrderPaymentMethod.CASH:
                return "Cash on Delivery";
            case OrderPaymentMethod.DEBIT:
                return "Bank Transfer";
            default:
                return "N/A";
        }
    }, [paymentMethod]);

    const fullAddress = [ward, province, shippingAddress].filter(Boolean).join(", ");

    const handleSubmit = async () => {
        const { shippingAddress, ward, province, ...orderData } = checkoutForm.getValues();
        await createOrder({ ...orderData, shippingAddress: `${shippingAddress}, ${ward}, ${province}` });

        const response = await createOrder({
            ...orderData,
            shippingAddress: `${shippingAddress}, ${ward}, ${province}`,
            totalAmount: 1000,
        });

        if (paymentMethod === OrderPaymentMethod.DEBIT) {
            const orderId = response[0].id;
            setCreatedOrderId(orderId);
            saveLocalCartProducts({});
            setQrOpen(true);
            return;
        }

        saveLocalCartProducts({});
        showToast.success("Order placed successfully!");
        navigate("/");
    };

    const { data: qrUrl, isLoading } = useQueryGetOrderQrCode(
        qrOpen ? (createdOrderId ?? undefined) : undefined,
        TransactionType.Deposit,
    );

    const handleCloseQrDialog = () => {
        setQrOpen(false);
        navigate("/");
    };

    return (
        <Stack spacing={2} sx={{ flex: 1 }}>
            <BoxSection>
                <Typography variant="h6" mb={1}>
                    Review your order
                </Typography>
                <Typography variant="body2" mb={2} color="text.secondary">
                    Confirm items, delivery, and payment details before placing your order.
                </Typography>
            </BoxSection>
            {/* Example item list */}
            <BoxSection>
                <Stack spacing={2}>
                    <Typography variant="h6" mb={1}>
                        Items
                    </Typography>
                    {productCart.map((item) => (
                        <ProductCheckoutSummary key={item.data.id} product={item.data} quantity={item.data.quantity} />
                    ))}
                </Stack>
            </BoxSection>
            <BoxSection>
                <Typography variant="h6" mb={1}>
                    Delivery & payment
                </Typography>
                <Stack spacing={1} sx={{ color: "text.secondary" }}>
                    <Box>
                        <Typography variant="subtitle2" color="text.primary">
                            Ship to:
                        </Typography>
                        <Typography>
                            {name} — {phoneNumber}
                        </Typography>
                        <Typography>{fullAddress}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.primary">
                            Payment method:
                        </Typography>
                        <Typography>{paymentLabel}</Typography>
                        {/* {paymentMethod === "credit" && (
                            <Typography>
                                {cardholderName} ({maskCardNumber(cardNumber)})
                            </Typography>
                        )} */}
                    </Box>
                </Stack>
            </BoxSection>
            <Stack direction="row" justifyContent="space-between" mt={3}>
                <Button variant="outlined" onClick={() => setStep("payment")}>
                    Back to payment
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    loading={isPending}
                    loadingPosition="start"
                    onClick={handleSubmit}
                >
                    Confirm payment
                </Button>
            </Stack>
            <PaymentQRCode open={qrOpen} onClose={handleCloseQrDialog} qrCode={qrUrl ?? ""} isLoading={isLoading} />
        </Stack>
    );
};
