import { AccountBalanceOutlined, CreditCardOutlined, LocalAtmOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { BoxSection } from "~/components/common";
import FormItem from "~/components/form/form-item";
import { useCheckout } from "./checkout.context";
import React from "react";
import { OrderPaymentMethod } from "~/constants/enums";

export const PaymentStep: React.FC = () => {
    const { nextStep, prevStep } = useCheckout();
    const checkoutForm = useFormContext();

    const paymentMethod = checkoutForm.watch("paymentMethod");
    const handleSelectPaymentMethod = (method: OrderPaymentMethod) => {
        checkoutForm.setValue("paymentMethod", method);
    };

    React.useEffect(() => {
        if (paymentMethod != OrderPaymentMethod.CREDIT) {
            checkoutForm.setValue("cardholderName", "");
            checkoutForm.setValue("cardNumber", "");
            checkoutForm.setValue("expiryDate", "");
            checkoutForm.setValue("cvc", "");
            checkoutForm.clearErrors(["cardholderName", "cardNumber", "expiryDate", "cvc"]);
        }
    }, [checkoutForm]);

    return (
        <Box>
            <BoxSection>
                <Typography variant="h6" fontWeight={700}>
                    Payment method
                </Typography>
                <Grid container spacing={2} mt={1}>
                    <Grid size={{ xs: 6 }}>
                        <Button
                            variant={paymentMethod === OrderPaymentMethod.CASH ? "contained" : "outlined"}
                            onClick={() => handleSelectPaymentMethod(OrderPaymentMethod.CASH)}
                            fullWidth
                            color="primary"
                            startIcon={<LocalAtmOutlined />}
                        >
                            Cash on Delivery
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Button
                            variant={paymentMethod === OrderPaymentMethod.CREDIT ? "contained" : "outlined"}
                            onClick={() => handleSelectPaymentMethod(OrderPaymentMethod.CREDIT)}
                            fullWidth
                            color="primary"
                            startIcon={<CreditCardOutlined />}
                        >
                            Credit/Debit Card
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Button
                            variant={paymentMethod === OrderPaymentMethod.DEBIT ? "contained" : "outlined"}
                            onClick={() => handleSelectPaymentMethod(OrderPaymentMethod.DEBIT)}
                            fullWidth
                            color="primary"
                            startIcon={<AccountBalanceOutlined />}
                        >
                            Bank Transfer
                        </Button>
                    </Grid>
                </Grid>
            </BoxSection>

            <BoxSection mt={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                    Card details
                </Typography>
                <Grid container spacing={2} mt={1}>
                    <Grid size={{ xs: 12 }}>
                        <FormItem
                            render="text-input"
                            required={paymentMethod == OrderPaymentMethod.CREDIT}
                            name="cardholderName"
                            label="Cardholder name"
                            disabled={paymentMethod !== OrderPaymentMethod.CREDIT}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormItem
                            render="text-input"
                            required={paymentMethod == OrderPaymentMethod.CREDIT}
                            name="cardNumber"
                            label="Card number"
                            fullWidth
                            disabled={paymentMethod !== OrderPaymentMethod.CREDIT}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <FormItem
                            render="text-input"
                            required={paymentMethod == OrderPaymentMethod.CREDIT}
                            name="expiryDate"
                            label="Expiry (MM/YY)"
                            fullWidth
                            disabled={paymentMethod !== OrderPaymentMethod.CREDIT}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <FormItem
                            render="text-input"
                            required={paymentMethod == OrderPaymentMethod.CREDIT}
                            name="cvc"
                            label="CVC"
                            fullWidth
                            disabled={paymentMethod !== OrderPaymentMethod.CREDIT}
                        />
                    </Grid>
                </Grid>
                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={prevStep}>
                        Back to delivery
                    </Button>
                    <Button variant="contained" onClick={nextStep}>
                        Review order
                    </Button>
                </Box>
            </BoxSection>
        </Box>
    );
};
