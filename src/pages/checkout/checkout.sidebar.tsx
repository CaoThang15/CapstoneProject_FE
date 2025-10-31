import { FmdGoodOutlined, PaymentOutlined, ReviewsOutlined } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import classNames from "classnames";
import { BoxSection } from "~/components/common";
import { useCheckout } from "./checkout.context";

const steps = [
    { key: "delivery", label: "Delivery", icon: <FmdGoodOutlined /> },
    { key: "payment", label: "Payment", icon: <PaymentOutlined /> },
    { key: "review", label: "Review", icon: <ReviewsOutlined /> },
];

export const CheckoutSidebar: React.FC = () => {
    const { step } = useCheckout();

    return (
        <BoxSection sx={{ minHeight: "100%" }}>
            <Stack>
                {steps.map((s) => (
                    <Button
                        variant={step === s.key ? "contained" : "text"}
                        onClick={(e) => e.preventDefault()}
                        className={classNames({ "bg-transparent hover:bg-transparent": step !== s.key })}
                        disableRipple
                        startIcon={s.icon}
                        key={s.key}
                        sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}
                    >
                        {s.label}
                    </Button>
                ))}
            </Stack>
            {/* <List>
                {steps.map((s) => (
                    <ListItemButton
                        key={s.key}
                        selected={step === s.key}
                        onClick={() => setStep(s.key as CheckoutStep)}
                    >
                        <ListItemText
                            primary={s.icon}
                            secondary={s.label}
                            slotProps={{
                                primary: {
                                    fontWeight: step === s.key ? 700 : 500,
                                },
                            }}
                        />
                    </ListItemButton>
                ))}
            </List> */}
        </BoxSection>
    );
};
