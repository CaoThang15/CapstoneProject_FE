import { Box, Button, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { BoxSection } from "~/components/common";
import { ProvinceFormItem, WardFormItem } from "~/components/form/custom";
import FormItem from "~/components/form/form-item";
import { PHONE_NUMBER_PATTERN } from "~/components/form/validation/pattern";
import { useCheckout } from "./checkout.context";
import { CreateOrderRequest } from "~/services/orders/infras";

export const DeliveryStep: React.FC = () => {
    const { nextStep } = useCheckout();
    const checkoutForm = useFormContext<CreateOrderRequest>();

    const handleNext = async () => {
        const isValid = await checkoutForm.trigger();
        if (isValid) {
            nextStep();
        }
    };
    return (
        <BoxSection>
            <Typography variant="h6" fontWeight={700}>
                Shipping address
            </Typography>
            <Grid container spacing={1} mt={1}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormItem render="text-input" name="name" label="Full Name" required></FormItem>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormItem
                        render="text-input"
                        name="phoneNumber"
                        pattern={PHONE_NUMBER_PATTERN}
                        label="Phone Number"
                        required
                    ></FormItem>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormItem render="text-input" name="addressLine1" label="Address" required></FormItem>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ProvinceFormItem required />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <WardFormItem required />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FormItem render="text-input" name="zip" label="Zip Code"></FormItem>
                </Grid>
            </Grid>

            <Box className="flex justify-end">
                <Button variant="contained" sx={{ mt: 3 }} onClick={handleNext}>
                    Continue to payment
                </Button>
            </Box>
        </BoxSection>
    );
};
