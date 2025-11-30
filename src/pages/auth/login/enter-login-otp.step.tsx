import { AccessTimeOutlined, EmailOutlined, SendOutlined, ShieldOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import EnterOTPCodeImage from "~/assets/images/enter-otp-code-image.png";
import { HighlightCard } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { OtpCodeFormValue } from "~/components/form/types/form-value";
import { useAuth } from "~/contexts/auth.context";
import { useLoginStep } from "~/pages/auth/login/login-context";
import { showToast } from "~/utils";

const MAX_SUBMIT_OTP_FAILED = 5;
const LOCK_DURATION = 5 * 60;

const EnterLoginOtpStep: React.FC = () => {
    const { email } = useLoginStep();
    const { verifyLoginOtp } = useAuth();
    const navigate = useNavigate();
    const form = useForm<OtpCodeFormValue>();

    const [_, setSecondsLeft] = React.useState<number>(60);
    const [isActive, setIsActive] = React.useState<boolean>(true);
    const [failedCounter, setFailedCounter] = React.useState<number>(0);
    const [isLocked, setIsLocked] = React.useState<boolean>(false);
    const [lockTimeLeft, setLockTimeLeft] = React.useState<number>(LOCK_DURATION);

    const handleSubmit = async () => {
        if (isLocked) return;

        try {
            await verifyLoginOtp({ email, otp: form.getValues().otpCode });
            showToast.success("Đăng nhập thành công");
            navigate("/");
        } catch (error) {
            const message = (error as Error).message;
            setFailedCounter((prev) => prev + 1);
            form.setError("otpCode", {
                type: "value",
                message,
            });
            showToast.error(message);
        }
    };

    // Countdown for resend
    React.useEffect(() => {
        if (!isActive) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive]);

    // Lock handling when reaching max failed attempts
    React.useEffect(() => {
        if (failedCounter >= MAX_SUBMIT_OTP_FAILED) {
            setIsLocked(true);
            setLockTimeLeft(LOCK_DURATION);
        }
    }, [failedCounter]);

    // Lock countdown
    React.useEffect(() => {
        if (!isLocked) return;

        const timer = setInterval(() => {
            setLockTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsLocked(false);
                    setFailedCounter(0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isLocked]);

    const formattedLockTime = React.useMemo(() => {
        const minutes = Math.floor(lockTimeLeft / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (lockTimeLeft % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }, [lockTimeLeft]);

    return (
        <Stack className="my-8" spacing={3} direction={"row"} alignItems="center">
            <Box className="hidden basis-0 rounded-2xl border border-gray-200 bg-white px-6 py-10 md:block md:basis-1/2">
                <Typography variant="h5" className="font-bold">
                    Kiểm tra tin nhắn
                </Typography>
                <Typography className="mt-3 text-sm">
                    Chúng tôi đã gửi mã xác thực 6 chữ số đến {email}. Nhập mã bên dưới để tiếp tục.
                </Typography>
                <img src={EnterOTPCodeImage} className="my-4 max-h-[300px] w-full object-cover" />
                <Stack direction="row" spacing={2} className="mt-6">
                    <HighlightCard
                        startIcon={<EmailOutlined />}
                        typography={<Typography variant="body2">Email</Typography>}
                    />
                    <HighlightCard
                        startIcon={<AccessTimeOutlined />}
                        typography={<Typography variant="body2">Hết hạn sau 10 phút</Typography>}
                    />
                </Stack>
            </Box>

            <Box className="my-auto hidden basis-0 rounded-2xl border border-gray-200 bg-white p-6 md:block md:basis-1/2">
                <Typography className="mb-6 text-xl font-bold">Nhập mã xác thực</Typography>
                <Typography className="mb-3 text-sm text-gray-400">Mã gồm 6 chữ số</Typography>
                <DynamicForm form={form} onSubmit={handleSubmit}>
                    <FormItem render="otp-code" name="otpCode" codeLength={6} required fullWidth />
                    <Typography className="mb-3 text-sm text-gray-400">
                        Không nhận được mã? Kiểm tra thư mục Spam hoặc thử phương thức khác.
                    </Typography>

                    {isLocked ? (
                        <HighlightCard
                            startIcon={<ShieldOutlined />}
                            typography={
                                <Typography variant="body2" color="error">
                                    Quá nhiều lần nhập sai. Vui lòng đợi {formattedLockTime} trước khi thử lại.
                                </Typography>
                            }
                            className="mb-3"
                            fullWidth
                        />
                    ) : (
                        <HighlightCard
                            startIcon={<ShieldOutlined />}
                            typography={
                                <Typography variant="body2">
                                    Vì lý do bảo mật, nhiều lần nhập sai sẽ tạm thời khóa chức năng xác thực.
                                </Typography>
                            }
                            className="mb-3"
                            fullWidth
                        />
                    )}

                    <Button
                        startIcon={<SendOutlined />}
                        variant="contained"
                        fullWidth
                        type="submit"
                        className="!py-3"
                        disabled={form.formState.isSubmitting || isLocked}
                    >
                        <Typography className="text-[16px] text-base font-semibold">Gửi mã</Typography>
                    </Button>
                </DynamicForm>
            </Box>
        </Stack>
    );
};

export default EnterLoginOtpStep;
