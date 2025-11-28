import { EmailOutlined, LocalShippingOutlined, LockOutline, Login, Shield, Star } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginImage from "~/assets/images/login-main-image.png";
import { HighlightCard, LoadingContainer } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import i18n from "~/configs/i18n";
import { useAuth } from "~/contexts/auth.context";
import { TLoginRequest } from "~/services/auth/types";
import { useLoginStep } from "./login-context";

const EnterLoginCredentialStep: React.FC = () => {
    const { t } = useTranslation();
    const { login, isLoading } = useAuth();
    const { setEmail, nextStep } = useLoginStep();
    const form = useForm<TLoginRequest>();

    const handleSubmit = async (value: TLoginRequest) => {
        await login(value);
        setEmail(value.email);
        nextStep();
    };

    return (
        <Stack className="my-8" spacing={3} direction={"row"} alignItems="center">
            <Box className="hidden basis-0 rounded-2xl border border-gray-200 bg-white px-6 py-10 md:block md:basis-1/2">
                <Typography variant="h5" className="font-bold">
                    Buy & sell verified tech
                </Typography>
                <Typography className="mt-3 text-sm">
                    AI Price prediction and fraud detection keeps your deals safe.
                </Typography>
                <img src={LoginImage} className="my-4 max-h-[300px] w-full object-cover" />
                <Stack direction="row" spacing={2} className="mt-6">
                    <HighlightCard
                        startIcon={<Shield />}
                        typography={<Typography variant="body2">Buyer protection</Typography>}
                    />
                    <HighlightCard
                        startIcon={<Star />}
                        typography={<Typography variant="body2">AI deals</Typography>}
                    />
                    <HighlightCard
                        startIcon={<LocalShippingOutlined />}
                        typography={<Typography variant="body2">Fast shipping</Typography>}
                    />
                </Stack>
            </Box>

            <Box className="my-auto hidden basis-0 rounded-2xl border border-gray-200 bg-white p-6 md:block md:basis-1/2">
                <LoadingContainer isLoading={isLoading}>
                    <Typography className="mb-6 text-xl font-bold">Welcome back</Typography>
                    <DynamicForm form={form} onSubmit={handleSubmit}>
                        <Stack spacing={2} className="">
                            <FormItem
                                render="text-input"
                                name="email"
                                label={t(i18n.translationKey.username)}
                                placeholder={t(i18n.translationKey.username)}
                                startAdornment={<EmailOutlined />}
                                required
                            />
                            <FormItem
                                render="text-input"
                                name="password"
                                label={t(i18n.translationKey.password)}
                                placeholder={t(i18n.translationKey.password)}
                                isPassword
                                required
                                startAdornment={<LockOutline />}
                            />
                        </Stack>
                        <Stack alignItems="flex-end">
                            <Typography
                                className="my-2 mb-3 inline cursor-pointer text-end text-base"
                                onClick={() => {
                                    window.location.href = "/forgot-password";
                                }}
                            >
                                Forgot password ?
                            </Typography>
                        </Stack>
                        <Button
                            startIcon={<Login />}
                            variant="contained"
                            fullWidth
                            type="submit"
                            className="!py-3"
                            disabled={isLoading || form.formState.isSubmitting}
                        >
                            <Typography className="text-[16px] text-base font-semibold">
                                {t(i18n.translationKey.login)}
                            </Typography>
                        </Button>
                    </DynamicForm>
                    {/* <Divider className="my-5">
                        <Typography className="text-sm text-gray-500">or continue with</Typography>
                    </Divider>
                    <Stack direction="row" spacing={1}>
                        <Button
                            startIcon={<Google />}
                            color="inherit"
                            variant="outlined"
                            fullWidth
                            className="border-gray-300 py-2"
                        >
                            <Typography className="text-base font-bold">
                                {t(i18n.translationKey.login)} with Google
                            </Typography>
                        </Button>
                        <Button
                            startIcon={<Facebook />}
                            color="inherit"
                            variant="outlined"
                            fullWidth
                            className="border-gray-300"
                        >
                            <Typography className="text-base font-bold">
                                {t(i18n.translationKey.login)} with Facebook
                            </Typography>
                        </Button>
                    </Stack> */}
                    <Typography className="my-4 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <span
                            className="text-primary cursor-pointer underline"
                            onClick={() => (window.location.href = "/register")}
                        >
                            Create an account
                        </span>
                    </Typography>
                </LoadingContainer>
            </Box>
        </Stack>
    );
};

export default EnterLoginCredentialStep;
