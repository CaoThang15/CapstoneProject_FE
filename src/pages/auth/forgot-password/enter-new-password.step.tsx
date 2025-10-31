import {
    AbcOutlined,
    CheckOutlined,
    EmojiSymbolsOutlined,
    LockOutline,
    LooksOneOutlined,
    ShieldOutlined,
    Widgets,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import EnterNewPasswordImage from "~/assets/images/enter-new-password-image.png";
import { HighlightCard } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { PASSWORD_PATTERN } from "~/components/form/validation/pattern";
import { useForgotPassword } from "~/contexts/forgot-password.context";
import { ForgotPasswordStepper } from "./forgot-password-stepper";
import { useMutationResetPassword } from "~/services/auth/mutations";

const EnterNewPasswordStep: React.FC = () => {
    const form = useForm();
    const { nextStep, resetToken } = useForgotPassword();
    const { mutateAsync: resetPassword, isPending: isResettingPassword } = useMutationResetPassword();

    const handleSubmit = async () => {
        const values = form.getValues();
        await resetPassword({
            resetToken,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        });
        nextStep();
    };

    return (
        <Stack className="my-8" spacing={3} direction={"row"} alignItems="center">
            <Box className="hidden basis-0 rounded-2xl border border-gray-200 bg-white px-6 py-10 md:block md:basis-1/2">
                <Typography variant="h5" className="font-bold">
                    Create a new password
                </Typography>
                <Typography className="mt-3 text-sm">
                    Your code was verified. For your security, choose a stronger password you don't use elsewhere.
                </Typography>
                <img src={EnterNewPasswordImage} className="my-4 max-h-[300px] w-full object-cover" />
                <Stack direction="column" spacing={1} className="mt-6">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Widgets fontSize="small" className="text-gray-500" />
                        <Typography className="text-gray-500">At least 8 characters</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AbcOutlined fontSize="small" className="text-gray-500" />
                        <Typography className="text-gray-500">At least 1 lowercase, 1 uppercase letter</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LooksOneOutlined fontSize="small" className="text-gray-500" />
                        <Typography className="text-gray-500">At least 1 number</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <EmojiSymbolsOutlined fontSize="small" className="text-gray-500" />
                        <Typography className="text-gray-500">At least one symbol and no whitespace</Typography>
                    </Stack>
                </Stack>
            </Box>

            <Box className="my-auto hidden basis-0 rounded-2xl border border-gray-200 bg-white p-6 md:block md:basis-1/2">
                <Box className="mb-3">
                    <ForgotPasswordStepper />
                </Box>

                <Typography className="mb-6 text-xl font-bold">Set your new password</Typography>
                <DynamicForm form={form} onSubmit={handleSubmit}>
                    <Stack spacing={2} className="mb-4">
                        <FormItem
                            render="text-input"
                            name="newPassword"
                            label="Password"
                            placeholder="Enter new password"
                            isPassword
                            required
                            pattern={PASSWORD_PATTERN}
                            startAdornment={<LockOutline />}
                        />
                        <FormItem
                            render="text-input"
                            name="confirmPassword"
                            label="Confirm new password"
                            placeholder="Enter confirm password"
                            isPassword
                            required
                            pattern={PASSWORD_PATTERN}
                            startAdornment={<LockOutline />}
                            matchField="newPassword"
                        />
                    </Stack>
                    <HighlightCard
                        startIcon={<ShieldOutlined />}
                        typography={
                            <Typography variant="body2">
                                Password resets sign out active sessions to keep your account safe.
                            </Typography>
                        }
                        className="mb-4"
                        fullWidth
                    />
                    <Button
                        startIcon={<CheckOutlined />}
                        variant="contained"
                        fullWidth
                        type="submit"
                        className="!py-3"
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                        loading={isResettingPassword}
                        loadingPosition="start"
                    >
                        <Typography className="text-[16px] text-base font-semibold">Save new password</Typography>
                    </Button>
                </DynamicForm>
            </Box>
        </Stack>
    );
};

export default EnterNewPasswordStep;
