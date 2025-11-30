import { AccountBalanceOutlined, LocalAtmOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { BoxSection } from "~/components/common";
import { OrderPaymentMethod } from "~/constants/enums";
import { useCheckout } from "./checkout.context";

export const PaymentStep: React.FC = () => {
    const { nextStep, prevStep } = useCheckout();
    const checkoutForm = useFormContext();

    const paymentMethod = checkoutForm.watch("paymentMethod");
    const handleSelectPaymentMethod = (method: OrderPaymentMethod) => {
        checkoutForm.setValue("paymentMethod", method);
    };

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
