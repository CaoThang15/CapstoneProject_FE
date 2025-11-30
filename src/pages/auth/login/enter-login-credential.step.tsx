import { EmailOutlined, LocalShippingOutlined, LockOutline, Login, Shield, Star } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import LoginImage from "~/assets/images/login-main-image.png";
import { HighlightCard, LoadingContainer } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { useAuth } from "~/contexts/auth.context";
import { TLoginRequest } from "~/services/auth/types";
import { useLoginStep } from "./login-context";

const EnterLoginCredentialStep: React.FC = () => {
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
                    Mua & bán thiết bị công nghệ đã xác thực
                </Typography>
                <Typography className="mt-3 text-sm">
                    Dự đoán giá bằng AI và phát hiện gian lận giúp giao dịch của bạn an toàn.
                </Typography>
                <img src={LoginImage} className="my-4 max-h-[300px] w-full object-cover" />
                <Stack direction="row" spacing={2} className="mt-6">
                    <HighlightCard
                        startIcon={<Shield />}
                        typography={<Typography variant="body2">Bảo vệ người mua</Typography>}
                    />
                    <HighlightCard
                        startIcon={<Star />}
                        typography={<Typography variant="body2">Giao dịch AI</Typography>}
                    />
                    <HighlightCard
                        startIcon={<LocalShippingOutlined />}
                        typography={<Typography variant="body2">Giao hàng nhanh</Typography>}
                    />
                </Stack>
            </Box>

            <Box className="my-auto hidden basis-0 rounded-2xl border border-gray-200 bg-white p-6 md:block md:basis-1/2">
                <LoadingContainer isLoading={isLoading}>
                    <Typography className="mb-6 text-xl font-bold">Chào mừng trở lại</Typography>
                    <DynamicForm form={form} onSubmit={handleSubmit}>
                        <Stack spacing={2} className="">
                            <FormItem
                                render="text-input"
                                name="email"
                                label="Email"
                                placeholder="Nhập email"
                                startAdornment={<EmailOutlined />}
                                required
                            />
                            <FormItem
                                render="text-input"
                                name="password"
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu"
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
                                Quên mật khẩu?
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
                            <Typography className="text-[16px] text-base font-semibold">Đăng nhập</Typography>
                        </Button>
                    </DynamicForm>

                    <Typography className="my-4 text-center text-sm text-gray-500">
                        Chưa có tài khoản?{" "}
                        <span
                            className="text-primary cursor-pointer underline"
                            onClick={() => (window.location.href = "/register")}
                        >
                            Tạo tài khoản
                        </span>
                    </Typography>
                </LoadingContainer>
            </Box>
        </Stack>
    );
};

export default EnterLoginCredentialStep;
