import {
    ChatBubbleOutline,
    EmailOutlined,
    LockOutline,
    PersonAddOutlined,
    SmartToyOutlined,
    VerifiedOutlined,
} from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import RegisterImage from "~/assets/images/register-page-image.png";
import { HighlightCard, LoadingContainer } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "~/components/form/validation/pattern";
import { useAuth } from "~/contexts/auth.context";
import { TRegisterRequest } from "~/services/auth/types";
import { useRegisterStep } from "./register-step.context";
import { Role } from "~/constants/roles";
import { getAxiosErrorMessageKey } from "~/libs/axios/helper";

const EnterRegisterCredentialStep: React.FC = () => {
    const { register, isLoading } = useAuth();
    const { setEmail, nextStep } = useRegisterStep();
    const form = useForm<TRegisterRequest>();

    const handleSubmit = async (value: TRegisterRequest) => {
        try {
            await register({ ...value, role: Role.Buyer });
            setEmail(value.email);
            nextStep();
        } catch (error) {
            form.setError("email", {
                type: "value",
                message: getAxiosErrorMessageKey(error),
            });
        }
    };

    return (
        <Stack className="my-8" spacing={3} direction={"row"} alignItems="center">
            <Box className="hidden basis-0 rounded-2xl border border-gray-200 bg-white px-6 py-10 md:block md:basis-1/2">
                <Typography variant="h5" className="font-bold">
                    Join S-Market
                </Typography>
                <Typography className="mt-3 text-sm">
                    Sell confidently, buy smarter. AI suggests fair prices and flags suspicious listings.
                </Typography>
                <img src={RegisterImage} className="my-4 max-h-[300px] w-full object-cover" />
                <Stack direction="row" spacing={2} className="mt-6">
                    <HighlightCard
                        startIcon={<VerifiedOutlined />}
                        typography={<Typography variant="body2">Verified sellers</Typography>}
                    />
                    <HighlightCard
                        startIcon={<SmartToyOutlined />}
                        typography={<Typography variant="body2">AI price tips</Typography>}
                    />
                    <HighlightCard
                        startIcon={<ChatBubbleOutline />}
                        typography={<Typography variant="body2">Real-time chat</Typography>}
                    />
                </Stack>
            </Box>

            <Box className="my-auto hidden basis-0 rounded-2xl border border-gray-200 bg-white p-6 md:block md:basis-1/2">
                <LoadingContainer isLoading={isLoading}>
                    <Typography className="mb-6 text-xl font-bold">Create your account</Typography>
                    <DynamicForm form={form} onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid size={12}>
                                <FormItem
                                    render="text-input"
                                    name="email"
                                    label={"Email"}
                                    required
                                    placeholder={"Email"}
                                    pattern={EMAIL_PATTERN}
                                    startAdornment={<EmailOutlined />}
                                />
                            </Grid>
                            <Grid size={12}>
                                <FormItem
                                    render="text-input"
                                    name="password"
                                    label="Password"
                                    placeholder="Password"
                                    startAdornment={<LockOutline />}
                                    pattern={PASSWORD_PATTERN}
                                    isPassword
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <FormItem
                                    render="text-input"
                                    name="confirmPassword"
                                    label="Confirm password"
                                    placeholder="Confirm password"
                                    startAdornment={<LockOutline />}
                                    matchField="password"
                                    // pattern={PASSWORD_PATTERN}
                                    required
                                    isPassword
                                />
                            </Grid>
                        </Grid>
                        <Stack spacing={2} direction={"row"}></Stack>
                        <Button
                            startIcon={<PersonAddOutlined />}
                            variant="contained"
                            type="submit"
                            className="!py-3"
                            fullWidth
                            disabled={isLoading || form.formState.isSubmitting}
                        >
                            <Typography className="text-[16px] text-base font-semibold">Create account</Typography>
                        </Button>
                    </DynamicForm>
                    <Typography className="my-4 text-center text-sm text-gray-500">
                        Already have an account ?{" "}
                        <span
                            className="text-primary cursor-pointer underline"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Sign in
                        </span>
                    </Typography>
                </LoadingContainer>
            </Box>
        </Stack>
    );
};

export default EnterRegisterCredentialStep;
