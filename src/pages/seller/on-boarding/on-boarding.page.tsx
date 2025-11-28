import { RecyclingOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import { BoxSection, LoadingContainer } from "~/components/common";
import DynamicForm from "~/components/form/dynamic-form";
import { useForm } from "~/components/form/hooks/use-form";
import { BreadcrumbProvider } from "~/components/layout/breadcrumbs";
import { useAuth } from "~/contexts/auth.context";
import { useMutationCreateSellerRequest } from "~/services/seller-request/hooks/mutations";
import { useQueryGetCurrentSellerRequest } from "~/services/seller-request/hooks/queries";
import { CreateSellerOnboardingRequestDto } from "~/services/seller-request/infras";
import AccountInfoStep from "./account-info.step";
import BusinessVerificationStep from "./business-verification.step";
import RequestSubmittedStep from "./request-submitted.step";
import ReviewFormStep from "./review-form.step";
import StoreDetailsStep from "./store-details.step";
import { LegalType, SellerOnboardingFormValues } from "./types";

const steps = [
    { label: "Thông tin tài khoản", component: <AccountInfoStep /> },
    { label: "Chi tiết cửa hàng", component: <StoreDetailsStep /> },
    { label: "Xác minh doanh nghiệp", component: <BusinessVerificationStep /> },
    { label: "Xem lại & Gửi", component: <ReviewFormStep /> },
];

const SellerOnboardingPage: React.FC = () => {
    const { user } = useAuth();
    const form = useForm<SellerOnboardingFormValues>({
        defaultValues: {
            fullName: user?.name || "",
            email: user?.email || "",
            phoneNumber: user?.phone || "",
            secondaryCategoryIds: [],
            legalType: LegalType.INDIVIDUAL,
        },
    });

    const { data: currentSellerRequestData, isLoading: isLoadingCurrentSellerRequest } =
        useQueryGetCurrentSellerRequest();

    const [activeStep, setActiveStep] = React.useState<number>(0);

    const { mutateAsync: createSellerRequest, isPending: isCreating } = useMutationCreateSellerRequest();
    const handleNext = async () => {
        const isStepValid = await form.trigger();
        if (!isStepValid) return;

        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        const values = form.getValues();

        const businessAddress = `${values.businessAddress}, ${values.ward}, ${values.province}`;

        const payload: CreateSellerOnboardingRequestDto = {
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            storeName: values.storeName,
            primaryCategoryId: values.primaryCategoryId,
            storeDescription: values.storeDescription,
            legalType: Number(values.legalType),
            taxId: values.taxId,
            bankCode: values.bankCode,
            bankAccountNumber: values.bankAccountNumber,
            bankAccountName: values.bankAccountName,
            businessLicenseImages:
                values.businessLicenseImages?.map((image) => ({
                    name: image.fileName,
                    path: image.imageUrl,
                })) || [],
            identityCardId: values.identityCardId,
            identityCardFrontImage: values.identityCardFrontImage
                ? {
                      name: values.identityCardFrontImage.fileName,
                      path: values.identityCardFrontImage.imageUrl,
                  }
                : undefined,
            identityCardBackImage: values.identityCardBackImage
                ? {
                      name: values.identityCardBackImage.fileName,
                      path: values.identityCardBackImage.imageUrl,
                  }
                : undefined,
            businessAddress,
        };

        await createSellerRequest(payload);
    };

    React.useEffect(() => {
        if (user) {
            form.reset({
                ...form.getValues(),
                fullName: user?.name || "",
                email: user?.email || "",
                phoneNumber: user?.phone || "",
            });
        }
    }, [user]);

    return (
        <BreadcrumbProvider>
            <Box className={`flex h-screen w-full flex-col`}>
                <AppBar position="sticky" sx={{ top: 0 }} className="shadow-m w-full justify-center bg-white px-3 py-2">
                    <Box className="flex items-center justify-between">
                        <Stack direction={"row"} spacing={2} alignItems="center" className="pe-4">
                            <RecyclingOutlined />
                            <Typography className="text-gray-500">Đăng ký để trở thành người bán hàng</Typography>
                        </Stack>
                    </Box>
                </AppBar>

                <Box className="flex h-[calc(100%-64px)] w-full">
                    <BoxSection className="no-scrollbar mx-auto mt-5 flex w-3/5 flex-col overflow-y-auto bg-white pt-8">
                        <LoadingContainer isLoading={isLoadingCurrentSellerRequest}>
                            <DynamicForm form={form}>
                                {!currentSellerRequestData ? (
                                    <>
                                        <Stepper activeStep={activeStep} alternativeLabel>
                                            {steps.map((step, index) => (
                                                <Step key={index}>
                                                    <StepLabel>{step.label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                        <Box className="mx-auto mt-8 w-3/5">{steps[activeStep].component}</Box>

                                        <Box className="mt-8 flex justify-end gap-4">
                                            <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                                                Quay lại
                                            </Button>
                                            <Button
                                                type={activeStep === steps.length - 1 ? "submit" : "button"}
                                                variant="contained"
                                                color="primary"
                                                loading={isCreating}
                                                loadingPosition="start"
                                                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                            >
                                                {activeStep === steps.length - 1 ? "Hoàn tất" : "Tiếp theo"}
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <RequestSubmittedStep sellerRequest={currentSellerRequestData} />
                                )}
                            </DynamicForm>
                        </LoadingContainer>
                    </BoxSection>
                </Box>
            </Box>
        </BreadcrumbProvider>
    );
};

export default SellerOnboardingPage;
