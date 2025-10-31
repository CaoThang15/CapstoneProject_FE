import {
    AddOutlined,
    BackHandOutlined,
    DeleteOutline,
    DescriptionOutlined,
    LocalAtmOutlined,
    LocalOfferOutlined,
    LocalShippingOutlined,
    MapOutlined,
    NoteOutlined,
    TagOutlined,
    UndoOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { BoxSection, HighlightCard, LoadingContainer } from "~/components/common";
import { FormLabel } from "~/components/form/common";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { toBaseOption } from "~/components/form/utils";
import { CloudinaryFolder } from "~/constants/enums";
import { useAuth } from "~/contexts/auth.context";
import { Category } from "~/entities";
import { IdPathParams } from "~/routes/types";
import { useQueryCategories } from "~/services/categories/hooks/queries";
import { useMutationUpdateProduct } from "~/services/products/hooks/mutation";
import { useQueryGetProductById } from "~/services/products/hooks/queries/use-query-get-product-by-id";
import { UpdateProductRequest } from "~/services/products/infras";
import { useMutationDeleteFile, useMutationUploadFile } from "~/services/public-api/upload-file/hooks/mutation";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { showToast } from "~/utils";
import { formatCurrencyVND } from "~/utils/currency";

type UpdateProductFormValue = UpdateProductRequest & {
    media?: UploadedFile[];
};

const UpdateProductPage: React.FC = () => {
    const { id } = useParams<IdPathParams>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: listCategories, isLoading: isLoadingCategories } = useQueryCategories();
    const { data: product, isLoading: isLoadingProduct } = useQueryGetProductById(Number(id));
    const [editingSections, setEditingSections] = React.useState<Set<string>>(new Set());
    const form = useForm<UpdateProductFormValue>({
        defaultValues: {
            ...product,
            sellerId: user.id,
        },
    });

    const { mutateAsync: updateProduct, isPending } = useMutationUpdateProduct();
    const handleAddProperty = () => {
        const current = form.getValues("properties") || [];
        form.setValue("properties", [...current, { id: 0, name: "", value: "" }]);
    };

    const handleRemoveProperty = (index: number) => {
        const current = form.getValues("properties") || [];
        form.setValue(
            "properties",
            current.filter((_, i: number) => i !== index),
        );
    };

    const { mutateAsync: uploadFile } = useMutationUploadFile();
    const { mutateAsync: deleteFile } = useMutationDeleteFile();

    const handleSubmit = async (values: UpdateProductFormValue) => {
        const { media, ...rest } = values;

        const payload: UpdateProductRequest = {
            ...rest,
            price: Number(values.price),
            stockQuantity: Number(values.stockQuantity),
            sharedFiles: media?.map((file) => ({
                name: file.fileName,
                path: file.imageUrl,
            })),
        };

        await updateProduct({ data: payload });
        showToast.success("Update product successfully");
        form.reset();
        navigate("/seller/products");
    };

    const handleToggleEditSection = (section: string) => {
        const newEditingSections = new Set(editingSections);
        if (newEditingSections.has(section)) {
            newEditingSections.delete(section);
        } else {
            newEditingSections.add(section);
        }
        setEditingSections(newEditingSections);
    };
    const isEditing = (section: string) => editingSections.has(section);

    React.useEffect(() => {
        if (product) {
            form.reset({
                id: product.id,
                categoryId: product.categoryId,
                name: product.name,
                price: product.price,
                description: product.description,
                stockQuantity: product.stockQuantity,
                note: product.note,
                location: product.location,
                sellerId: product.sellerId,
                properties: product.properties.map((property) => ({
                    id: property.id,
                    name: property.name,
                    value: property.value,
                })),
                media:
                    product.sharedFiles?.map((file) => ({
                        fileName: file.name,
                        imageUrl: file.path,
                    })) || [],
            });
        }
    }, [product, form, user.id]);

    if (!product) {
        return null;
    }

    return (
        <LoadingContainer isLoading={isLoadingProduct || isLoadingCategories}>
            <Box className="px-3 py-2">
                <DynamicForm form={form} onSubmit={handleSubmit}>
                    <BoxSection className="mb-4 flex items-center justify-between border border-gray-200 p-3">
                        <Box>
                            <Typography variant="h6">Edit Listing</Typography>
                            <Typography className="text-sm text-gray-500">
                                Review and update product details before publishing
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => navigate("/seller/products")}
                            startIcon={<UndoOutlined />}
                        >
                            Back
                        </Button>
                    </BoxSection>
                    <Stack spacing={2}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <BoxSection className="h-full">
                                        <Typography variant="h6" fontWeight={600} mb={2}>
                                            Core Product
                                        </Typography>
                                        <Grid container spacing={1}>
                                            <Grid size={{ xs: 12 }}>
                                                <BoxSection className="flex items-center space-x-2">
                                                    <LocalOfferOutlined />
                                                    <Box className="flex-1">
                                                        {isEditing("name") ? (
                                                            <FormItem
                                                                render="text-input"
                                                                name="name"
                                                                label="Product Name"
                                                                required
                                                                fullWidth
                                                            />
                                                        ) : (
                                                            <>
                                                                <Typography className="text-gray-600">
                                                                    Product Name
                                                                </Typography>
                                                                <Typography fontWeight={500}>
                                                                    {form.watch("name")}
                                                                </Typography>
                                                            </>
                                                        )}
                                                    </Box>
                                                    <Button onClick={() => handleToggleEditSection("name")}>
                                                        {isEditing("name") ? "Save" : "Edit"}
                                                    </Button>
                                                </BoxSection>
                                            </Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <BoxSection className="flex items-center space-x-2">
                                                    <TagOutlined />
                                                    <Box className="flex-1">
                                                        {isEditing("stockQuantity") ? (
                                                            <FormItem
                                                                render="input-number"
                                                                name="stockQuantity"
                                                                label="Stock Quantity"
                                                                required
                                                                fullWidth
                                                            />
                                                        ) : (
                                                            <>
                                                                <Typography className="text-gray-600">
                                                                    Stock Quantity
                                                                </Typography>
                                                                <Typography fontWeight={500}>
                                                                    {form.watch("stockQuantity")}
                                                                </Typography>
                                                            </>
                                                        )}
                                                    </Box>
                                                    <Button onClick={() => handleToggleEditSection("stockQuantity")}>
                                                        {isEditing("stockQuantity") ? "Save" : "Edit"}
                                                    </Button>
                                                </BoxSection>
                                            </Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <BoxSection className="flex items-center space-x-2">
                                                    <LocalOfferOutlined />
                                                    <Box className="flex-1">
                                                        {isEditing("categoryId") ? (
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
                                                        ) : (
                                                            <>
                                                                <Typography className="text-gray-600">
                                                                    Category
                                                                </Typography>
                                                                <Typography fontWeight={500}>
                                                                    {
                                                                        listCategories?.find(
                                                                            (cat) =>
                                                                                cat.id === form.watch("categoryId"),
                                                                        )?.name
                                                                    }
                                                                </Typography>
                                                            </>
                                                        )}
                                                    </Box>
                                                    <Button onClick={() => handleToggleEditSection("categoryId")}>
                                                        {isEditing("categoryId") ? "Save" : "Edit"}
                                                    </Button>
                                                </BoxSection>
                                            </Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <Grid size={{ xs: 12 }}>
                                                    <BoxSection className="flex items-center space-x-2">
                                                        <DescriptionOutlined />
                                                        <Box className="flex-1">
                                                            {isEditing("description") ? (
                                                                <FormItem
                                                                    render="text-area"
                                                                    name="description"
                                                                    label="Description"
                                                                    required
                                                                    fullWidth
                                                                />
                                                            ) : (
                                                                <>
                                                                    <Typography className="text-gray-600">
                                                                        Description
                                                                    </Typography>
                                                                    <Typography fontWeight={500}>
                                                                        {form.watch("description")}
                                                                    </Typography>
                                                                </>
                                                            )}
                                                        </Box>
                                                        <Button onClick={() => handleToggleEditSection("description")}>
                                                            {isEditing("description") ? "Save" : "Edit"}
                                                        </Button>
                                                    </BoxSection>
                                                </Grid>
                                            </Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <BoxSection className="flex items-center space-x-2">
                                                    <NoteOutlined />
                                                    <Box className="flex-1">
                                                        {isEditing("note") ? (
                                                            <FormItem
                                                                render="text-area"
                                                                name="note"
                                                                label="Note"
                                                                rows={2}
                                                                fullWidth
                                                            />
                                                        ) : (
                                                            <>
                                                                <Typography className="text-gray-600">Note</Typography>
                                                                <Typography fontWeight={500}>
                                                                    {form.watch("note") || "—"}
                                                                </Typography>
                                                            </>
                                                        )}
                                                    </Box>
                                                    <Button onClick={() => handleToggleEditSection("note")}>
                                                        {isEditing("note") ? "Save" : "Edit"}
                                                    </Button>
                                                </BoxSection>
                                            </Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <BoxSection className="flex items-center space-x-2">
                                                    <VisibilityOutlined />
                                                    <Box className="flex-1">
                                                        <FormItem
                                                            render="switch"
                                                            name="isHide"
                                                            label="Hide Product"
                                                            fullWidth
                                                        />
                                                    </Box>
                                                </BoxSection>
                                            </Grid>
                                        </Grid>
                                    </BoxSection>
                                </Grid>
                                <Grid size={{ xs: 12, md: 5 }}>
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
                                            {/* Price */}
                                            <BoxSection className="flex items-center space-x-2">
                                                <LocalAtmOutlined className="text-gray-600" />
                                                <Box className="flex-1">
                                                    {isEditing("price") ? (
                                                        <FormItem
                                                            render="input-number"
                                                            name="price"
                                                            label="Your Price"
                                                            required
                                                            prefix="VND"
                                                            fullWidth
                                                            minNumber={1}
                                                        />
                                                    ) : (
                                                        <>
                                                            <Typography className="text-gray-600">Price</Typography>
                                                            <Typography fontWeight={500}>
                                                                {formatCurrencyVND(Number(form.watch("price") || 0))}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Box>
                                                <Button onClick={() => handleToggleEditSection("price")}>
                                                    {isEditing("price") ? "Save" : "Edit"}
                                                </Button>
                                            </BoxSection>
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
                                            <BoxSection className="flex items-center space-x-2">
                                                <MapOutlined className="text-gray-600" />
                                                <Box className="flex-1">
                                                    {isEditing("location") ? (
                                                        <FormItem
                                                            render="text-input"
                                                            name="location"
                                                            label="Location"
                                                            fullWidth
                                                            required
                                                        />
                                                    ) : (
                                                        <>
                                                            <Typography className="text-gray-600">Location</Typography>
                                                            <Typography fontWeight={500}>
                                                                {form.watch("location")}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Box>
                                                <Button onClick={() => handleToggleEditSection("location")}>
                                                    {isEditing("location") ? "Save" : "Edit"}
                                                </Button>
                                            </BoxSection>
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
                                <Grid size={{ xs: 12, md: 7 }}>
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
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <BoxSection className="h-full">
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={2}
                                        >
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
                                            {form.watch("properties")?.map((_, index: number) => (
                                                <React.Fragment key={index}>
                                                    <Grid size={{ xs: 12, md: 5.5 }}>
                                                        <FormItem
                                                            render="text-input"
                                                            name={`properties.${index}.name`}
                                                            label="Name"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid size={{ xs: 12, md: 5.5 }}>
                                                        <FormItem
                                                            render="text-input"
                                                            name={`properties.${index}.value`}
                                                            label="Value"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        size={{ xs: 12, md: 1 }}
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
                        {/* <Button variant="outlined">Save Draft</Button>
                        <Button variant="outlined">Preview</Button> */}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={isPending}
                            loadingPosition="start"
                        >
                            Publish
                        </Button>
                    </Stack>
                </DynamicForm>
            </Box>
        </LoadingContainer>
    );
};

export default UpdateProductPage;
