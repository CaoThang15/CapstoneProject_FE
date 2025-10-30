import {
    ChatBubbleOutline,
    EmailOutlined,
    Facebook,
    Google,
    LocationOnOutlined,
    LockOutline,
    PersonAddOutlined,
    PersonOutline,
    PhoneOutlined,
    SmartToyOutlined,
    VerifiedOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import RegisterImage from "~/assets/images/register-page-image.png";
import { HighlightCard } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from "~/components/form/validation/pattern";
import { useAuth } from "~/contexts/auth.context";
import { TRegisterRequest } from "~/services/auth/types";

const RegisterPage: React.FC = () => {
    const { login, isLoading } = useAuth();

    const form = useForm<TRegisterRequest>({});

    const handleSubmit = async (value: any) => {
        await login(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !form.formState.isSubmitting) {
            form.handleSubmit(handleSubmit)();
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
                <Typography className="mb-6 text-xl font-bold">Create your account</Typography>
                <DynamicForm form={form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <FormItem
                                render="text-input"
                                name="firstName"
                                label={"First name"}
                                className="basis-1/2"
                                placeholder={"First name"}
                                startAdornment={<PersonOutline />}
                                required
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid size={6}>
                            <FormItem
                                render="text-input"
                                name="lastName"
                                label={"Last name"}
                                placeholder={"Last name"}
                                startAdornment={<PersonOutline />}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid size={12}>
                            <FormItem
                                render="text-input"
                                name="email"
                                label={"Email"}
                                placeholder={"Email"}
                                pattern={EMAIL_PATTERN}
                                startAdornment={<EmailOutlined />}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid size={6}>
                            <FormItem
                                render="text-input"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                startAdornment={<LockOutline />}
                                isPassword
                                required
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid size={6}>
                            <FormItem
                                render="text-input"
                                name="confirmPassword"
                                label="Confirm password"
                                placeholder="Confirm password"
                                startAdornment={<LockOutline />}
                                matchField="password"
                                required
                                isPassword
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid size={12}>
                            <FormItem
                                render="text-input"
                                name="userName"
                                label="Username (public)"
                                placeholder="Username (public)"
                                startAdornment={<PersonOutline />}
                                required
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid size={6}>
                            <FormItem
                                render="text-input"
                                name="phone"
                                label="Phone (for verification)"
                                placeholder="Phone (for verification)"
                                startAdornment={<PhoneOutlined />}
                                required
                                pattern={PHONE_NUMBER_PATTERN}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid size={6}>
                            <FormItem
                                render="text-input"
                                name="location"
                                label="Location"
                                placeholder="Location"
                                startAdornment={<LocationOnOutlined />}
                                required
                                onKeyDown={handleKeyDown}
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
                <Divider className="my-5">
                    <Typography className="text-sm text-gray-500">or sign up with</Typography>
                </Divider>
                <Stack direction="row" spacing={1}>
                    <Button
                        startIcon={<Google />}
                        fullWidth
                        color="inherit"
                        variant="outlined"
                        className="border-gray-300 py-2"
                    >
                        <Typography className="text-base font-bold">Register with Google</Typography>
                    </Button>
                    <Button
                        startIcon={<Facebook />}
                        fullWidth
                        color="inherit"
                        variant="outlined"
                        className="border-gray-300"
                    >
                        <Typography className="text-base font-bold">Register with Facebook</Typography>
                    </Button>
                </Stack>
                <Typography className="my-4 text-center text-sm text-gray-500">
                    Already have an account ?{" "}
                    <span
                        className="text-primary cursor-pointer underline"
                        onClick={() => (window.location.href = "/login")}
                    >
                        Sign in
                    </span>
                </Typography>
            </Box>
        </Stack>
    );
};

export default RegisterPage;
