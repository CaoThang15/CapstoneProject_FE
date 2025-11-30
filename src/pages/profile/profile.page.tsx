import { CancelOutlined, Edit, Save, Settings, Shield } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Switch, Typography } from "@mui/material";
import React from "react";
import { BoxSection, ImageRenderer } from "~/components/common";
import { ProvinceFormItem, WardFormItem } from "~/components/form/custom";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from "~/components/form/validation/pattern";
import { CloudinaryFolder } from "~/constants/enums";
import { useAuth } from "~/contexts/auth.context";
import { useQueryGetInfinityOrders } from "~/services/orders/hooks/queries";
import { useMutationUploadImage } from "~/services/public-api/upload-file/hooks/mutation";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { useMutationUpdateProfile } from "~/services/users/hooks/mutations";
import { UpdateProfileRequest } from "~/services/users/infras";
import { showToast } from "~/utils";
import { formatCurrencyVND } from "~/utils/currency";

type UpdateProfileFormValue = UpdateProfileRequest & {
    uploadedFile: UploadedFile;
};

const ProfilePage: React.FC = () => {
    const { user, loadUserInfor } = useAuth();
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const { mutateAsync: uploadImage } = useMutationUploadImage();
    const { mutateAsync: updateProfile, isPending } = useMutationUpdateProfile();
    const {
        data: { items: orders },
    } = useQueryGetInfinityOrders({ page: 1, pageSize: 3 });

    const form = useForm<UpdateProfileFormValue>({
        defaultValues: {
            ...user,
            uploadedFile: user.avatar
                ? {
                      id: user.avatar,
                      fileName: "avatar",
                      imageUrl: user.avatar,
                  }
                : null,
        },
    });

    return (
        <Box className="min-h-screen space-y-6 bg-gray-50">
            {/* Profile Info */}
            <DynamicForm form={form}>
                <BoxSection className="mb-6">
                    <Box className="flex justify-between">
                        <Stack spacing={3} direction="row">
                            {isEditing ? (
                                <FormItem
                                    render="image-uploader"
                                    name="uploadedFile"
                                    readOnly={!isEditing}
                                    onDelete={async () => {
                                        // await deleteImage(file.imageUrl);
                                    }}
                                    onUpload={async (file) => {
                                        const response = await uploadImage({ file, folder: CloudinaryFolder.PROFILE });
                                        return {
                                            fileName: file.name,
                                            imageUrl: response.imageUrl,
                                            id: response.imageUrl,
                                        } as UploadedFile;
                                    }}
                                />
                            ) : (
                                <ImageRenderer src={user.avatar} alt="User Avatar" className="h-[150px] w-[200px]" />
                            )}
                            <Stack direction="column" className="flex-1" spacing={0.5}>
                                {isEditing ? (
                                    <FormItem name="name" render="text-input" label="Full name" required />
                                ) : (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Họ và tên
                                        </Typography>
                                        <Typography variant="h6">{user.name}</Typography>
                                    </Box>
                                )}
                                {isEditing ? (
                                    <FormItem
                                        name="email"
                                        render="text-input"
                                        required
                                        label="Email"
                                        pattern={EMAIL_PATTERN}
                                        disabled
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                ) : (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" className="mt-2">
                                            Email
                                        </Typography>
                                        <Typography variant="body1">{user.email}</Typography>
                                    </Box>
                                )}

                                {isEditing ? (
                                    <FormItem
                                        name="phone"
                                        render="text-input"
                                        label="Phone number"
                                        required
                                        pattern={PHONE_NUMBER_PATTERN}
                                    />
                                ) : (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" className="mt-2">
                                            Số điện thoại
                                        </Typography>
                                        <Typography variant="body1">{user.phone ?? "N/A"} </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Stack>

                        <Box className="flex flex-col items-end gap-2">
                            <Button
                                variant={!isEditing ? "outlined" : "contained"}
                                startIcon={isEditing ? <Edit /> : <Save />}
                                size="small"
                                loading={isPending}
                                loadingPosition="start"
                                onClick={async () => {
                                    if (isEditing) {
                                        const { address, uploadedFile, name, phone, province, ward } = form.watch();
                                        await updateProfile({
                                            address,
                                            avatar: uploadedFile?.imageUrl,
                                            name,
                                            phone,
                                            province,
                                            ward,
                                        });
                                        await loadUserInfor();
                                        showToast.success("Profile updated successfully");
                                    }
                                    setIsEditing(!isEditing);
                                }}
                            >
                                {!isEditing ? "Edit" : "Save new changes"}
                            </Button>
                            <Button
                                variant={"outlined"}
                                color="inherit"
                                disabled={!isEditing}
                                startIcon={<CancelOutlined />}
                                size="small"
                                onClick={() => {
                                    setIsEditing(false);
                                }}
                            >
                                {"Cancel"}
                            </Button>
                        </Box>
                    </Box>
                </BoxSection>
                <Box className="flex space-x-3">
                    {/* Addresses Section */}
                    <BoxSection className="w-full">
                        <Typography variant="h6" className="mb-4">
                            Địa chỉ
                        </Typography>

                        <Box className="space-y-3">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    {isEditing ? (
                                        <ProvinceFormItem required />
                                    ) : (
                                        <BoxSection className="!p-3">
                                            <Typography variant="subtitle2" color="text.secondary" className="">
                                                Tỉnh/Thành phố
                                            </Typography>
                                            <Typography>{form.watch("province")}</Typography>
                                        </BoxSection>
                                    )}
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    {isEditing ? (
                                        <WardFormItem required />
                                    ) : (
                                        <BoxSection className="!p-3">
                                            <Typography variant="subtitle2" color="text.secondary" className="">
                                                Phường
                                            </Typography>
                                            <Typography>{form.watch("ward")}</Typography>
                                        </BoxSection>
                                    )}
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    {isEditing ? (
                                        <FormItem render="text-input" name="address" required label="Địa chỉ" />
                                    ) : (
                                        <BoxSection className="!p-3">
                                            <Typography variant="subtitle2" color="text.secondary" className="">
                                                Địa chỉ
                                            </Typography>
                                            <Typography>{form.watch("address")}</Typography>
                                        </BoxSection>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </BoxSection>
                </Box>
            </DynamicForm>
            <BoxSection>
                <Typography variant="h6">Đơn hàng gần đây</Typography>
                <Stack spacing={1} className="mt-2">
                    {orders.map((order) => (
                        <BoxSection key={order.id} className="flex items-center justify-between border-gray-200">
                            <ImageRenderer
                                src={order.orderDetails[0].productImagePath}
                                className="h-10 w-10 object-cover"
                            />
                            <Stack spacing={1} className="flex-1 px-3">
                                <Typography fontWeight={600}>{order.orderDetails[0].productName}</Typography>
                                <Typography>
                                    Đơn hàng #{order.id} - {order.statusName}
                                </Typography>
                            </Stack>
                            <Typography className="font-bold">{formatCurrencyVND(order.totalAmount)}</Typography>
                        </BoxSection>
                    ))}
                </Stack>
            </BoxSection>
        </Box>
    );
};

export default ProfilePage;
