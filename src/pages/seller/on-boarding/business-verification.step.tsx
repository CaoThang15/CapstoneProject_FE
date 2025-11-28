import { Box, Stack } from "@mui/material";
import FormItem from "~/components/form/form-item";
import { useMutationDeleteFile, useMutationUploadFile } from "~/services/public-api/upload-file/hooks/mutation";
import { LegalType, SellerOnboardingFormValues } from "./types";
import { CloudinaryFolder } from "~/constants/enums";
import { useAuth } from "~/contexts/auth.context";
import { VIETNAMESE_ID_CARD_PATTERN } from "~/components/form/validation/pattern";
import { useFormContext } from "react-hook-form";
import { Bank, BANKS } from "~/constants/bank/bank.data";
import { toBaseOption } from "~/components/form/utils";

const BusinessVerificationStep = () => {
    const form = useFormContext<SellerOnboardingFormValues>();
    const { user } = useAuth();
    const { mutateAsync: uploadFile } = useMutationUploadFile();
    const { mutateAsync: deleteFile } = useMutationDeleteFile();

    return (
        <Stack spacing={2}>
            <FormItem
                name="legalType"
                render="radio-group"
                required
                label={"Loại hình kinh doanh"}
                options={[
                    { label: "Cá nhân", value: LegalType.INDIVIDUAL },
                    { label: "Hộ kinh doanh", value: LegalType.BUSINESS_HOUSEHOLD },
                    { label: "Công ty", value: LegalType.CORPORATION },
                ]}
            />
            {form.watch("legalType") != LegalType.INDIVIDUAL && (
                <>
                    <FormItem render="text-input" name="taxId" required label={"Mã số thuế"} />
                    <FormItem
                        render="image-uploader"
                        name="businessLicenseImages"
                        label={"Giấy chứng nhận đăng ký kinh doanh (nếu có, tối đa 5 ảnh)"}
                        maxFiles={5}
                        onDelete={async (file) => {
                            await deleteFile(file.imageUrl);
                        }}
                        onUpload={async (file) => {
                            const response = await uploadFile({
                                file,
                                folder: `${CloudinaryFolder.BUSINESS_LICENSE_IMAGES}/${user?.id}`,
                            });
                            return {
                                id: "",
                                fileName: file.name,
                                imageUrl: response.imageUrl,
                            };
                        }}
                    />
                </>
            )}
            <FormItem
                render="text-input"
                name="identityCardId"
                required
                label={"Số CMND/CCCD"}
                pattern={VIETNAMESE_ID_CARD_PATTERN}
            />
            <FormItem render="text-input" name="identityCardName" required label={"Họ và tên trên CMND/CCCD"} />
            <Box className="flex gap-3">
                <FormItem
                    render="image-uploader"
                    name="identityCardFrontImage"
                    onUpload={async (file) => {
                        const response = await uploadFile({
                            file,
                            folder: `${CloudinaryFolder.IDENTITY_FRONT_IMAGES}/${user?.id}`,
                        });
                        return {
                            id: "",
                            fileName: file.name,
                            imageUrl: response.imageUrl,
                        };
                    }}
                    onDelete={async (file) => {
                        await deleteFile(file.imageUrl);
                    }}
                    required
                    label={"Mặt trước CMND/CCCD"}
                />
                <FormItem
                    render="image-uploader"
                    name="identityCardBackImage"
                    onUpload={async (file) => {
                        const response = await uploadFile({
                            file,
                            folder: `${CloudinaryFolder.IDENTITY_BACK_IMAGES}/${user?.id}`,
                        });
                        return {
                            id: "",
                            fileName: file.name,
                            imageUrl: response.imageUrl,
                        };
                    }}
                    onDelete={async (file) => {
                        await deleteFile(file.imageUrl);
                    }}
                    required
                    label={"Mặt sau CMND/CCCD"}
                />
            </Box>
            <FormItem
                render="select"
                name="bankCode"
                required
                label={"Ngân hàng"}
                options={toBaseOption<Bank>(BANKS, {
                    value: "code",
                    renderLabel: (item) => (
                        <Box className="flex items-center space-x-2">
                            <img src={item.logo} alt={item.name} className="h-5 w-5 object-contain" />
                            <span>
                                {item.name} ({item.code})
                            </span>
                        </Box>
                    ),
                })}
            />
            <FormItem render="text-input" name="bankAccountNumber" required label={"Số tài khoản ngân hàng"} />
            <FormItem render="text-input" name="bankAccountName" required label={"Chủ tài khoản"} />
        </Stack>
    );
};

export default BusinessVerificationStep;
