import { CancelOutlined, Delete, Edit, Save, Settings, Shield, Upload } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Switch, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { ProvinceFormItem, WardFormItem } from "~/components/form/custom";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from "~/components/form/validation/pattern";
import { CloudinaryFolder } from "~/constants/enums";
import { useAuth } from "~/contexts/auth.context";
import { useMutationDeleteFile, useMutationUploadImage } from "~/services/public-api/upload-file/hooks/mutation";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { UpdateProfileRequest } from "~/services/users/infras";
import { useMutationUpdateProfile } from "~/services/users/infras/hooks/mutation";

type UpdateProfileFormValue = UpdateProfileRequest & {
    uploadedFile: UploadedFile;
};

const ProfilePage: React.FC = () => {
    const { user, loadUserInfor } = useAuth();
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const { mutateAsync: uploadImage } = useMutationUploadImage();
    const { mutateAsync: deleteImage } = useMutationDeleteFile();
    const { mutateAsync: updateProfile } = useMutationUpdateProfile();

    const form = useForm<UpdateProfileFormValue>({
        defaultValues: {
            ...user,
            uploadedFile: {
                imageUrl: user.avatar,
            },
        },
    });

    return (
        <Box className="min-h-screen space-y-6 bg-gray-50">
            {/* Profile Info */}
            <DynamicForm form={form}>
                <BoxSection className="mb-6">
                    <Box className="flex justify-between">
                        <Stack spacing={3} direction="row">
                            <FormItem
                                render="image-uploader"
                                name="uploadedFile"
                                readOnly={!isEditing}
                                onDelete={async (file) => {
                                    await deleteImage(file.imageUrl);
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
                            <Stack direction="column" className="flex-1" spacing={0.5}>
                                {isEditing ? (
                                    <FormItem name="name" render="text-input" label="Full name" />
                                ) : (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Full name
                                        </Typography>
                                        <Typography variant="h6">{user.name}</Typography>
                                    </Box>
                                )}
                                {isEditing ? (
                                    <FormItem name="email" render="text-input" label="Email" pattern={EMAIL_PATTERN} />
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
                                        pattern={PHONE_NUMBER_PATTERN}
                                    />
                                ) : (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" className="mt-2">
                                            Phone
                                        </Typography>
                                        <Typography variant="body1">{user.phone ?? "N/A"} </Typography>
                                    </Box>
                                )}

                                <Box className="mt-4 flex gap-2">
                                    <Button variant="contained" startIcon={<Upload />}>
                                        Upload new photo
                                    </Button>
                                    <Button
                                        disabled={isEditing}
                                        variant="outlined"
                                        color="inherit"
                                        startIcon={<Delete />}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Stack>
                        </Stack>

                        <Box className="flex flex-col items-end gap-2">
                            <Button
                                variant={!isEditing ? "outlined" : "contained"}
                                startIcon={isEditing ? <Edit /> : <Save />}
                                size="small"
                                onClick={async () => {
                                    if (isEditing) {
                                        if (form.formState.isDirty) {
                                            const { address, uploadedFile, name, phone, province, ward } = form.watch();
                                            await updateProfile({
                                                address,
                                                avatar: uploadedFile.imageUrl,
                                                name,
                                                phone,
                                                province,
                                                ward,
                                            });
                                            await loadUserInfor();
                                        }
                                    } else {
                                        if (!form.formState.isDirty) {
                                            // TODO: do something confirm
                                        }
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
                            Addresses
                        </Typography>

                        <Box className="space-y-3">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <ProvinceFormItem />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <WardFormItem />
                                </Grid>
                            </Grid>
                            <FormItem
                                render="text-input"
                                name="address"
                                label="Địa chỉ"
                                slotProps={{
                                    input: {},
                                }}
                            />
                        </Box>
                    </BoxSection>
                    {/* AI & Security Section */}
                    <BoxSection className="w-full">
                        <Typography variant="h6" className="mb-4">
                            AI & Security
                        </Typography>

                        <Box className="mb-2 flex items-center justify-between rounded-lg border px-4 py-2">
                            <Typography>Fraud shield</Typography>
                            <Switch checked color="success" />
                        </Box>

                        <Box className="mb-2 flex items-center justify-between rounded-lg border px-4 py-2">
                            <Typography>2-factor authentication</Typography>
                            <Typography className="text-gray-600">SMS</Typography>
                        </Box>

                        <Box className="mb-3 flex items-center justify-between rounded-lg border px-4 py-2">
                            <Typography>AI price tips</Typography>
                            <Typography className="text-gray-600">Enabled</Typography>
                        </Box>

                        <Box className="flex gap-2">
                            <Button variant="outlined" color="inherit" startIcon={<Settings />}>
                                Configure
                            </Button>
                            <Button variant="contained" startIcon={<Shield />}>
                                Review risk report
                            </Button>
                        </Box>
                    </BoxSection>
                </Box>
            </DynamicForm>
            <BoxSection>
                <Typography variant="h6">Recent order</Typography>
            </BoxSection>
        </Box>
    );
};

export default ProfilePage;
