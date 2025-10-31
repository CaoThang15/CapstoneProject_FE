import { AddOutlined, BackHandOutlined, DeleteOutline, LocalShippingOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection, HighlightCard } from "~/components/common";
import { FormLabel } from "~/components/form/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { toBaseOption } from "~/components/form/utils";
import { CloudinaryFolder } from "~/constants/enums";
import { useAuth } from "~/contexts/auth.context";
import { Category } from "~/entities";
import { useQueryCategories } from "~/services/categories/hooks/queries";
import { useMutationCreateProduct } from "~/services/products/hooks/mutation";
import { CreateProductRequest } from "~/services/products/infras";
import { useMutationDeleteFile, useMutationUploadFile } from "~/services/public-api/upload-file/hooks/mutation";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { formatCurrencyVND } from "~/utils/currency";

const CreateProductPage: React.FC = () => {
    const { user } = useAuth();
    const form = useForm<CreateProductRequest>({
        defaultValues: {
            properties: [{ value: "", propertyName: "" }],
            sellerId: user.id,
        },
    });
    const { data: listCategories } = useQueryCategories();
    const { mutateAsync: createProduct } = useMutationCreateProduct();
    const handleAddProperty = () => {
        const current = form.getValues("properties") || [];
        form.setValue("properties", [...current, { propertyName: "", value: "" }]);
    };

    const handleRemoveProperty = (index: number) => {
        const current = form.getValues("properties") || [];
        form.setValue(
            "properties",
            current.filter((_: any, i: number) => i !== index),
        );
    };

    const { mutateAsync: uploadFile } = useMutationUploadFile();
    const { mutateAsync: deleteFile } = useMutationDeleteFile();

    const handleSubmit = async (values: CreateProductRequest) => {
        await createProduct(values);
    };

    return (
        <Box className="px-3 py-2">
            <DynamicForm form={form} onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <BoxSection className="">
                                    <Typography variant="h6" fontWeight={600} mb={2}>
                                        Core Product
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid size={{ xs: 12 }}>
                                            <FormItem
                                                render="text-input"
                                                name="name"
                                                label="Product Name"
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <FormItem
                                                render="input-number"
                                                name="stockQuantity"
                                                label="Stock Quantity"
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <FormItem
                                                render="select"
                                                name="categoryId"
                                                label="Category"
                                                options={toBaseOption<Category>(listCategories, {
                                                    label: "name",
                                                    value: "id",
                                                })}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <FormItem
                                                render="text-area"
                                                name="description"
                                                required
                                                label="Description"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <FormItem render="text-area" name="note" label="Note" rows={2} fullWidth />
                                        </Grid>
                                    </Grid>
                                </BoxSection>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <BoxSection className="h-full">
                                    <Typography variant="h6" fontWeight={600} mb={2}>
                                        Pricing & Safety
                                    </Typography>
                                    <BoxSection className="px-4 py-2">
                                        <Typography variant="h6" fontWeight={500}>
                                            {formatCurrencyVND(280000)}
                                        </Typography>
                                        <Typography variant="body1" className="text-sm text-gray-500">
                                            AI suggest price
                                        </Typography>
                                    </BoxSection>
                                    <Stack spacing={1} className="my-2">
                                        {/* <FormItem render="input-number" name="price" label="Your Price" fullWidth /> */}
                                        <Box className="flex items-center justify-between">
                                            <Typography variant="body1" className="text-sm text-gray-500">
                                                Your price
                                            </Typography>
                                            <Typography variant="body1" fontWeight={600}>
                                                {formatCurrencyVND(280000)}
                                            </Typography>
                                        </Box>
                                        <Box className="flex items-center justify-between">
                                            <Typography variant="body1" className="text-sm text-gray-500">
                                                Market price
                                            </Typography>
                                            <Typography variant="body1" fontWeight={600}>
                                                {formatCurrencyVND(280000)} - {formatCurrencyVND(350000)}
                                            </Typography>
                                        </Box>
                                        <Box className="flex items-center justify-between">
                                            <Typography variant="body1" className="text-sm text-gray-500">
                                                Fraud risk
                                            </Typography>
                                            <HighlightCard typography="Low" color="success" />
                                        </Box>
                                    </Stack>

                                    <Stack spacing={1}>
                                        <Divider sx={{ width: "100%", my: 1 }} />
                                        <FormItem render="text-input" name="location" label="Location" fullWidth />
                                        <Box>
                                            <FormLabel label={"Delivery Options"} />
                                            <Stack direction="row" spacing={1} mt={1}>
                                                <HighlightCard
                                                    typography="Shipping"
                                                    color="primary"
                                                    startIcon={<LocalShippingOutlined />}
                                                    className="py-2"
                                                />
                                                <HighlightCard
                                                    typography="Local Pickup"
                                                    color="primary"
                                                    startIcon={<BackHandOutlined />}
                                                    className="py-2"
                                                />
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    <Divider sx={{ my: 2 }} />
                                    <Stack spacing={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Estimated Fees: $12.60
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Payout: $267.40
                                        </Typography>
                                    </Stack>
                                </BoxSection>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                {/* Media */}
                                <BoxSection className="h-full">
                                    <Typography variant="h6" fontWeight={600} mb={2}>
                                        Media
                                    </Typography>
                                    <FormItem
                                        render="image-uploader"
                                        name="media"
                                        maxFiles={3}
                                        fullWidth
                                        onDelete={async (file) => {
                                            await deleteFile(file.imageUrl);
                                        }}
                                        onUpload={async (file) => {
                                            const response = await uploadFile({
                                                file,
                                                folder: CloudinaryFolder.PRODUCT,
                                            });
                                            return {
                                                fileName: file.name,
                                                imageUrl: response.imageUrl,
                                                id: response.imageUrl,
                                            } as UploadedFile;
                                        }}
                                    />
                                    <Typography variant="subtitle1" className="text-sm text-gray-600">
                                        Attached maximum file size: 5MB, maximum number of files: 3
                                    </Typography>
                                </BoxSection>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <BoxSection className="h-full">
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" fontWeight={600}>
                                            Attributes
                                        </Typography>
                                        <Button
                                            size="small"
                                            startIcon={<AddOutlined />}
                                            variant="outlined"
                                            onClick={handleAddProperty}
                                        >
                                            Add Attribute
                                        </Button>
                                    </Stack>

                                    <Grid container spacing={1}>
                                        {form.watch("properties")?.map((_: any, index: number) => (
                                            <React.Fragment key={index}>
                                                <Grid size={{ xs: 12, md: 5 }}>
                                                    <FormItem
                                                        render="text-input"
                                                        name={`properties.${index}.name`}
                                                        label="Name"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 5 }}>
                                                    <FormItem
                                                        render="text-input"
                                                        name={`properties.${index}.value`}
                                                        label="Value"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid
                                                    size={{ xs: 12, md: 2 }}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleRemoveProperty(index)}
                                                        aria-label="remove property"
                                                    >
                                                        <DeleteOutline />
                                                    </IconButton>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </BoxSection>
                            </Grid>
                        </Grid>
                    </Box>
                    <BoxSection>
                        <Typography variant="h6" fontWeight={600} mb={2}>
                            Seller
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <BoxSection className="flex flex-1 items-center gap-3 border-0 bg-transparent p-0">
                                <Avatar src={user.avatar} />
                                <Stack>
                                    <Typography variant="subtitle1" fontWeight={500}>
                                        {user.name}
                                    </Typography>
                                    <Typography className="text-sm text-gray-600">
                                        4.9 (182 sales) • Verified
                                    </Typography>
                                </Stack>
                            </BoxSection>
                            <Chip
                                color="primary"
                                size="small"
                                label={`Joined ${new Date(user.createdAt).getFullYear()}`}
                            />
                        </Stack>
                    </BoxSection>
                </Stack>

                {/* Footer Buttons */}
                <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
                    <Button variant="outlined">Save Draft</Button>
                    <Button variant="outlined">Preview</Button>
                    <Button variant="contained" color="primary" type="submit">
                        Publish
                    </Button>
                </Stack>
            </DynamicForm>
        </Box>
    );
};

export default CreateProductPage;
