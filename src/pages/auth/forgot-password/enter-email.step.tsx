import {
    ChevronLeftOutlined,
    EmailOutlined,
    PhoneOutlined,
    SendOutlined,
    ShieldOutlined,
    Timer3Outlined,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import ForgotPasswordImage from "~/assets/images/forgot-password-image.png";
import { HighlightCard } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { EMAIL_PATTERN } from "~/components/form/validation/pattern";
import { useForgotPassword } from "~/contexts/forgot-password.context";
import { ForgotPasswordStepper } from "./forgot-password-stepper";
import { useNavigate } from "react-router";

type EnterEmailFormValues = {
    email: string;
};

const EnterEmailStep: React.FC = () => {
    const navigate = useNavigate();
    const { nextStep } = useForgotPassword();
    const form = useForm<EnterEmailFormValues>();

    const handleSubmit = async () => {
        nextStep();
    };

    const handleNavigateLoginPage = () => {
        navigate("/login");
    };

    return (
        <Stack className="my-8" spacing={3} direction={"row"} alignItems="center">
            <Box className="hidden basis-0 rounded-2xl border border-gray-200 bg-white px-6 py-10 md:block md:basis-1/2">
                <Typography variant="h5" className="font-bold">
                    Reset your password
                </Typography>
                <Typography className="mt-3 text-sm">
                    Enter your email or phone number and we'll send you a one-time code to reset your password.
                </Typography>
                <img src={ForgotPasswordImage} className="my-4 max-h-[300px] w-full object-cover" />
                <Stack direction="row" spacing={2} className="mt-6">
                    <HighlightCard
                        startIcon={<EmailOutlined />}
                        typography={<Typography variant="body2">Email code</Typography>}
                    />
                    <HighlightCard
                        startIcon={<PhoneOutlined />}
                        typography={<Typography variant="body2">SMS code</Typography>}
                    />
                    <HighlightCard
                        startIcon={<Timer3Outlined />}
                        typography={<Typography variant="body2">~1 min</Typography>}
                    />
                </Stack>
            </Box>

            <Box className="my-auto hidden basis-0 rounded-2xl border border-gray-200 bg-white p-6 md:block md:basis-1/2">
                <Button
                    startIcon={<ChevronLeftOutlined />}
                    className="mb-3 text-gray-400"
                    onClick={handleNavigateLoginPage}
                    variant="text"
                >
                    Back to sign in
                </Button>
                <Box className="mb-3">
                    <ForgotPasswordStepper />
                </Box>

                <Typography className="mb-6 text-xl font-bold">Forgot password</Typography>
                <DynamicForm form={form} onSubmit={handleSubmit}>
                    <FormItem
                        render="text-input"
                        name="email"
                        label={"Email"}
                        placeholder={"Enter your email"}
                        pattern={EMAIL_PATTERN}
                        required
                        startAdornment={<Typography className="text-gray-500">@</Typography>}
                    />
                    <Typography className="mb-3 text-sm text-gray-400">
                        We'll check your account and send a 6-digit code.
                    </Typography>
                    <HighlightCard
                        startIcon={<ShieldOutlined />}
                        typography={
                            <Typography variant="body2">
                                For your security, codes expire in 10 minutes and can't be reused
                            </Typography>
                        }
                        className="mb-3"
                        fullWidth
                    />
                    <Button
                        startIcon={<SendOutlined />}
                        variant="contained"
                        fullWidth
                        type="submit"
                        className="!py-3"
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                    >
                        <Typography className="text-[16px] text-base font-semibold">Send reset code</Typography>
                    </Button>
                </DynamicForm>
            </Box>
        </Stack>
    );
};

export default EnterEmailStep;
