import { Grid } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import DynamicForm from "~/components/form/dynamic-form";
import { useForm } from "~/components/form/hooks/use-form";
import { useAuth } from "~/contexts/auth.context";
import { useQueryGetProductCart } from "~/services/carts/hooks";
import { addDaysToDate } from "~/utils/date-time";
import { LocalStorageCartItems } from "../cart/types";
import { CheckoutProvider, useCheckout } from "./checkout.context";
import { DeliveryStep } from "./checkout.delivery.step";
import { PaymentStep } from "./checkout.payment.step";
import { ReviewStep } from "./checkout.review.step";
import { CheckoutSidebar } from "./checkout.sidebar";
import { CheckoutSummary } from "./checkout.summary";
import { CreateOrderRequestFormValue } from "./types";
import { OrderPaymentMethod, OrderStatus } from "~/constants/enums";

const CheckoutContent: React.FC = () => {
    const { step } = useCheckout();
    const { user } = useAuth();

    const [localCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

    const productCart = useQueryGetProductCart(localCartProducts);

    const allLoading = productCart.some((item) => item.isLoading);
    const allError = productCart.every((item) => item.isError || !item.data);
    const allLoaded = !allLoading && !allError && productCart.length > 0;

    const { subtotal } = React.useMemo(() => {
        if (!allLoaded) return { subtotal: 0 };

        let subtotal = 0;

        productCart.forEach((item) => {
            if (!item.data || item.isError) return;
            subtotal += item.data.price * item.data.quantity;
        });

        return { subtotal };
    }, [productCart, allLoaded]);

    const checkoutForm = useForm<CreateOrderRequestFormValue>({
        defaultValues: {
            userId: user?.id,
            orderDate: new Date(),
            deliveryDate: addDaysToDate(new Date(), 7),
            totalAmount: subtotal,
            paymentMethod: OrderPaymentMethod.CASH,
            voucherId: null,
            shippingAddress: "",
            phoneNumber: "",
            statusId: OrderStatus.PendingConfirmation,
            orderDetails: [],
        },
    });

    React.useEffect(() => {
        if (!allLoaded) return;

        checkoutForm.setValue(
            "orderDetails",
            productCart.map((item) => ({
                productId: item.data?.id || 0,
                unitPrice: item.data?.price || 0,
                quantity: item.data?.quantity || 0,
                productImageName: item.data?.sharedFiles?.[0].name || "",
                productName: item.data?.name || "",
                productImagePath: item.data?.sharedFiles?.[0].path || "",
                discount: 0,
            })),
        );
    }, [productCart, allLoaded]);

    return (
        <DynamicForm form={checkoutForm}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 2 }}>
                    <CheckoutSidebar />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    {step === "delivery" && <DeliveryStep />}
                    {step === "payment" && <PaymentStep />}
                    {step === "review" && <ReviewStep productCart={productCart} />}
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <CheckoutSummary subtotal={subtotal} shipping={0} discount={0} />
                </Grid>
            </Grid>
        </DynamicForm>
    );
};

const CheckoutPage: React.FC = () => (
    <CheckoutProvider>
        <CheckoutContent />
    </CheckoutProvider>
);

export default CheckoutPage;
