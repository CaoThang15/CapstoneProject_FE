import { CheckOutlined, EmailOutlined, HomeOutlined, LoginOutlined, PasswordOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import ChangePasswordSuccessImage from "~/assets/images/change-password-success-image.png";
import { HighlightCard } from "~/components/common";
import { ForgotPasswordStepper } from "./forgot-password-stepper";

const ForgotPasswordSuccessStep: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Stack className="my-8" spacing={3} direction={"row"} alignItems="center">
            <Box className="hidden basis-0 rounded-2xl border border-gray-200 bg-white px-6 py-10 md:block md:basis-1/2">
                <Typography variant="h5" className="font-bold">
                    Password updated
                </Typography>
                <Typography className="mt-3 text-sm">
                    Your password has been changed successfully. For your security, we signed out other sessions.
                </Typography>
                <img src={ChangePasswordSuccessImage} className="my-4 max-h-[300px] w-full object-cover" />
                <Stack direction="column" spacing={2} className="mt-6">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <PasswordOutlined fontSize="small" className="text-gray-500" />
                        <Typography className="text-gray-500">You can now sign in with your new password</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <EmailOutlined fontSize="small" className="text-gray-500" />
                        <Typography className="text-gray-500">
                            A confirmation email has been sent to your email address
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            <Box className="my-auto hidden basis-0 rounded-2xl border border-gray-200 bg-white p-6 md:block md:basis-1/2">
                <Box className="mb-3">
                    <ForgotPasswordStepper />
                </Box>

                <Typography className="mb-6 text-xl font-bold">You're all set</Typography>
                <Stack spacing={2} className="mb-6">
                    <HighlightCard
                        startIcon={<CheckOutlined />}
                        typography={<Typography variant="body2">Your new password is active</Typography>}
                    ></HighlightCard>
                    <Box>
                        <Typography className="text-sm text-gray-400">
                            Next step: Continue to sign in and access your account
                        </Typography>
                        <Typography className="text-sm text-gray-400">
                            If you didn't request this change, contact support immediately.
                        </Typography>
                    </Box>
                </Stack>
                <Stack spacing={1} direction="row">
                    <Button
                        startIcon={<LoginOutlined />}
                        variant="contained"
                        fullWidth
                        className="!py-3"
                        onClick={() => navigate("/login")}
                    >
                        <Typography className="text-[16px] text-base font-semibold">Go to sign in</Typography>
                    </Button>
                    <Button
                        startIcon={<HomeOutlined />}
                        variant="outlined"
                        color="inherit"
                        fullWidth
                        className="border border-gray-200 !py-3"
                        onClick={() => navigate("/")}
                    >
                        <Typography className="text-[16px] text-base font-semibold">Return to home</Typography>
                    </Button>
                </Stack>
            </Box>
        </Stack>
    );
};

export default ForgotPasswordSuccessStep;
