import {
    AddOutlined,
    BackHandOutlined,
    DeleteOutline,
    GeneratingTokensOutlined,
    LocalAtmOutlined,
    LocalShippingOutlined,
    MapOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
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
import { useMutationCreateProduct, useMutationGenerateProductDescription } from "~/services/products/hooks/mutation";
import { CreateProductRequest } from "~/services/products/infras";
import { useMutationDeleteFile, useMutationUploadFile } from "~/services/public-api/upload-file/hooks/mutation";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { showToast } from "~/utils";
import { formatCurrencyVND } from "~/utils/currency";
import { GeneratingDescriptionConfirmPopup } from "./popup/generating-description-confirm.popup";

type CreateProductFormValue = CreateProductRequest & {
    media?: UploadedFile[];
    categoryName?: string;
};

const CreateProductPage: React.FC = () => {
    const { user } = useAuth();
    const form = useForm<CreateProductFormValue>({
        defaultValues: {
            properties: [
                { name: "Brand", value: "Apple" },
                { name: "Model", value: "iPhone 16 Pro Max" },
                { name: "Release Year", value: "2024" },
                { name: "Finish / Material", value: "Titanium frame (grade 5), glass front & back" },
                { name: "Colours", value: "Black Titanium, White Titanium, Natural Titanium, Desert Titanium" },
                { name: "Dimensions (H × W × D)", value: "163 mm × 77.6 mm × 8.25 mm" },
                { name: "Weight", value: "227 g" },
                { name: "Display Size", value: "6.9 inches (diagonal) OLED" },
                { name: "Display Resolution", value: "2868 × 1320 pixels (~460 ppi)" },
                {
                    name: "Display Features",
                    value: "Super Retina XDR, Always-On, ProMotion up to 120Hz, HDR, True Tone",
                },
                { name: "Chipset", value: "Apple A18 Pro (3 nm)" },
                { name: "CPU", value: "6-core (2 performance + 4 efficiency)" },
                { name: "GPU", value: "6-core Apple GPU" },
                { name: "Neural Engine", value: "16-core" },
                { name: "Storage Options", value: "256 GB, 512 GB, 1 TB" },
                { name: "Rear Camera System", value: "48 MP main + 48 MP ultra-wide + 12 MP 5× telephoto" },
                { name: "Optical Zoom", value: "5× optical zoom in (periscope telephoto)" },
                { name: "Front Camera", value: "12 MP TrueDepth" },
                { name: "Water & Dust Resistance", value: "IP68 (up to 6 metres for 30 minutes)" },
                {
                    name: "Battery & Charging",
                    value: "Li-Ion (non-removable), supports USB-C charging, MagSafe wireless",
                },
                { name: "Operating System", value: "iOS 18 (out of the box)" },
                { name: "Other Features", value: "Dynamic Island, Action Button, Titanium build" },
            ],
            sellerId: user.id,
            media: [],
        },
    });
    const navigate = useNavigate();
    const [openConfirmPopup, setOpenConfirmPopup] = React.useState<boolean>(false);
    const [draftSuggestedDescription, setDraftSuggestedDescription] = React.useState<string>("");

    const { data: listCategories } = useQueryCategories();
    const { mutateAsync: createProduct, isPending } = useMutationCreateProduct();
    const { mutateAsync: generateProductDescription, isPending: isGeneratingDescription } =
        useMutationGenerateProductDescription();

    const handleAddProperty = () => {
        const current = form.getValues("properties") || [];
        form.setValue("properties", [...current, { name: "", value: "" }]);
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

    const handleSubmit = async (values: CreateProductFormValue) => {
        const { media, ...rest } = values;

        const payload: CreateProductRequest = {
            ...rest,
            price: Number(values.price),
            stockQuantity: Number(values.stockQuantity),
            sharedFiles: media?.map((file) => ({
                name: file.fileName,
                path: file.imageUrl,
            })),
        };

        await createProduct(payload);
        showToast.success("Create product successfully");
        form.reset();
        navigate("/seller/products");
    };

    const handleGenerateDescription = async () => {
        const suggestedDescription = await generateProductDescription({
            categoryName: form.getValues("categoryName") || "",
            name: form.getValues("name") || "",
            price: Number(form.getValues("price") || 0),
            isNew: true,
            properties:
                form.getValues("properties").map((property) => ({
                    name: property.name,
                    value: property.value,
                })) || [],
            description: form.getValues("description") || "",
            note: form.getValues("note") || "",
        });
        setDraftSuggestedDescription(suggestedDescription);
        setOpenConfirmPopup(true);
    };

    React.useEffect(() => {
        const selectedCategory = listCategories?.find((category) => category.id === form.getValues("categoryId"));
        form.setValue("categoryName", selectedCategory?.name || "");
    }, [form.watch("categoryId"), listCategories]);

    return (
        <Box className="px-3 py-2">
            <DynamicForm form={form} onSubmit={handleSubmit}>
                <BoxSection className="mb-4 flex items-center justify-between border border-gray-200 p-3">
                    <Box>
                        <Typography variant="h6">New Listing</Typography>
                        <Typography className="text-sm text-gray-500">
                            Define a category to organize products and improve discovery.
                        </Typography>
                    </Box>
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
                                            <Box className="mt-1 flex justify-end">
                                                <Button
                                                    className=""
                                                    variant="outlined"
                                                    startIcon={<GeneratingTokensOutlined />}
                                                    onClick={handleGenerateDescription}
                                                    loading={isGeneratingDescription}
                                                    loadingPosition="start"
                                                >
                                                    Generate Description
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <FormItem render="text-area" name="note" label="Note" rows={2} fullWidth />
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
                                        <BoxSection className="flex !w-full items-center space-x-2 !px-4 !pb-1 !pt-3">
                                            <LocalAtmOutlined className="text-gray-600" />
                                            <Box className="flex-1">
                                                <FormItem
                                                    render="input-number"
                                                    name="price"
                                                    // slotProps={{
                                                    //     input: {
                                                    //         endAdornment: (
                                                    //             <InputAdornment position="end">VND</InputAdornment>
                                                    //         ),
                                                    //     },
                                                    // }}
                                                    label="Your Price"
                                                    required
                                                    prefix="VND"
                                                    fullWidth
                                                    minNumber={1}
                                                />
                                            </Box>
                                        </BoxSection>
                                        {/* <Box className="flex items-center justify-between">
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
                                        </Box> */}
                                    </Stack>

                                    <Stack spacing={1}>
                                        <Divider sx={{ width: "100%", my: 1 }} />
                                        <BoxSection className="flex !w-full items-center space-x-2 !px-4 !pb-1 !pt-3">
                                            <MapOutlined className="text-gray-600" />
                                            <Box className="flex-1">
                                                <FormItem
                                                    render="text-input"
                                                    name="location"
                                                    label="Location"
                                                    fullWidth
                                                    required
                                                />
                                            </Box>
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
                                    {/* <Stack spacing={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Estimated Fees: $12.60
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Payout: $267.40
                                        </Typography>
                                    </Stack> */}
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
                    <Button variant="outlined">Save Draft</Button>
                    <Button variant="outlined">Preview</Button>
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
                <GeneratingDescriptionConfirmPopup
                    open={openConfirmPopup}
                    onClose={() => setOpenConfirmPopup(false)}
                    description={draftSuggestedDescription}
                />
            </DynamicForm>
        </Box>
    );
};

export default CreateProductPage;
