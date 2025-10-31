import {
    Battery0Bar,
    CameraAlt,
    CheckCircle,
    LocalShippingOutlined,
    LockPersonOutlined,
    ScheduleOutlined,
    Send,
    ShieldOutlined,
    ShoppingCart,
    ShowChartOutlined,
    Star,
    Wifi,
} from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Divider, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { useParams } from "react-router";
import { HistogramBar, ReviewItem } from "~/components/comments";
import { AddToCartToastContent, BoxSection, ImageRenderer, LoadingContainer } from "~/components/common";
import { SlugPathParams } from "~/routes/types";
import { useQueryGetProductBySlug } from "~/services/products/hooks/queries";
import { showToast } from "~/utils";
import { formatCurrencyVND } from "~/utils/currency";
import { LocalStorageCartItems } from "../cart/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "~/contexts/auth.context";

const ProductDetailPage: React.FC = () => {
    const { user } = useAuth();
    const [_, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

    const { slug } = useParams<SlugPathParams>();
    const { data: product, isLoading, isError } = useQueryGetProductBySlug(slug);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            if (user.id === product?.seller.id) {
                showToast.error("You cannot add your own product to the cart.");
                return;
            }
        }

        saveLocalCartProducts((prev) => {
            const currentQty = prev[product.id]?.quantity || 0;

            return {
                ...prev,
                [product.id]: { quantity: currentQty + 1, sellerId: product.seller.id },
            };
        });

        showToast.success(<AddToCartToastContent />);
    };

    return (
        <LoadingContainer isLoading={isLoading}>
            {!product || isError ? (
                <Box className="container mx-auto py-20 text-center">
                    <Typography variant="h6" color="text.secondary">
                        Product not found
                    </Typography>
                </Box>
            ) : (
                <Box className="container mx-auto">
                    <Grid container spacing={2}>
                        {/* Left: Gallery */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Stack direction="column" spacing={1}>
                                <BoxSection className="p-2 md:p-3">
                                    <Box className="relative flex gap-2">
                                        <Box className="h-[420px] flex-1 rounded-lg object-cover md:h-[520px]">
                                            <ImageRenderer
                                                src={product.sharedFiles?.[0]?.path}
                                                className="rounded-xl object-contain"
                                            />
                                        </Box>
                                        {product.sharedFiles?.length > 1 ? (
                                            <Stack spacing={1} className="hidden w-28 md:flex">
                                                {product.sharedFiles.slice(1, 6).map((image) => (
                                                    <Box
                                                        key={image.path}
                                                        className="h-24 w-28 cursor-pointer rounded rounded-lg border border-gray-100 object-cover"
                                                    >
                                                        <ImageRenderer src={image.path} alt={image.name} />
                                                    </Box>
                                                ))}
                                            </Stack>
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                </BoxSection>

                                <BoxSection className="mt-3 rounded-xl border border-gray-100 bg-white p-2 md:p-4">
                                    <Typography variant="h5" className="font-semibold">
                                        {product.name}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                                        <Rating value={4.7} readOnly size="small" />
                                        <Typography className="text-sm">4.7 out of 5</Typography>
                                        <Chip size="small" label="AI deal" color="primary" variant="outlined" />
                                        <Chip size="small" label="Case health 88%" variant="outlined" />
                                        <Chip size="small" label="Flagged as below market pricing" variant="outlined" />
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                                        <Typography variant="h5" fontWeight={700}>
                                            {formatCurrencyVND(product.price)}
                                        </Typography>
                                        {/* <Typography className="text-xs text-gray-500">Est. value $170</Typography> */}
                                    </Stack>
                                    <Grid container spacing={2} mt={3} mb={3}>
                                        <Grid size={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <CheckCircle color="action" fontSize="small" />
                                                <Typography className="text-sm">Serial verified</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid size={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <LocalShippingOutlined color="action" fontSize="small" />
                                                <Typography className="text-sm">Ships in 24h</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid size={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Wifi color="action" fontSize="small" />
                                                <Typography className="text-sm">MagSafe + Find My Phone</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid size={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Battery0Bar color="action" fontSize="small" />
                                                <Typography className="text-sm">Case battery 88%</Typography>
                                            </Stack>
                                        </Grid>

                                        <Grid size={12}>
                                            <Typography className="mb-2">
                                                <strong>Mô tả sản phẩm:</strong>
                                            </Typography>
                                            <Typography className="whitespace-pre-line text-gray-700">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {product.description}
                                                </ReactMarkdown>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </BoxSection>

                                {/* Seller */}
                                <Box className="mb-2 rounded-xl bg-white p-3 md:p-4">
                                    <Typography variant="h5" className="font-semibold">
                                        Seller
                                    </Typography>
                                    <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                                        <Avatar src={product.seller.avatar} />
                                        <Box className="flex-1">
                                            <Typography className="font-medium">{product.seller.name}</Typography>
                                            <Typography className="text-sm text-gray-600">
                                                4.9 (182 sales) • Verified
                                            </Typography>
                                        </Box>
                                        <Chip color="primary" size="small" label="Joined 2023" />
                                    </Stack>
                                </Box>

                                <BoxSection className="p-3 md:p-4">
                                    <Typography variant="h6" className="font-semibold">
                                        What’s included
                                    </Typography>

                                    <Stack spacing={3} className="ps-3" mt={1.5}>
                                        {product.properties.map((p) => (
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography className="text-sm">{p.name}</Typography>
                                                <Typography className="text-sm text-gray-500">{p.value}</Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </BoxSection>

                                <BoxSection className="p-3 md:p-4">
                                    <Typography variant="h6" className="font-semibold">
                                        Shipping & returns
                                    </Typography>
                                    <Grid container spacing={2} mt={0.5}>
                                        <Grid size={6}>
                                            <Typography className="text-xs text-gray-500">Shipping</Typography>
                                            <Typography className="text-sm">Standard 3–5 days</Typography>
                                            <Typography className="text-xs text-gray-500">
                                                Carrier selected at checkout
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography className="text-xs text-gray-500">Returns</Typography>
                                            <Typography className="text-sm">7-day return window</Typography>
                                            <Typography className="text-xs text-gray-500">
                                                AI fraud protection included
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </BoxSection>
                                <Box>
                                    {/* AI insights */}
                                    <Stack direction="row" spacing={2}>
                                        <BoxSection className="basis-1/2 p-3 md:p-4">
                                            <Typography className="text-sm font-semibold">AI price insight</Typography>
                                            <Stack spacing={1} mt={1}>
                                                <Typography className="text-sm text-gray-600">
                                                    <span>
                                                        <ShowChartOutlined />{" "}
                                                    </span>
                                                    Current listing is 21% below market
                                                </Typography>
                                                <Typography className="text-sm text-gray-600">
                                                    <span>
                                                        <ScheduleOutlined />{" "}
                                                    </span>{" "}
                                                    Typical sell time: 2 days
                                                </Typography>
                                            </Stack>
                                        </BoxSection>
                                        <BoxSection className="basis-1/2 p-3 md:p-4">
                                            <Typography className="text-sm font-semibold">AI fraud check</Typography>
                                            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                                                <Chip size="small" color="success" label="Low risk" />
                                                <Typography className="text-sm text-gray-600">
                                                    No mismatch in photos/metadata
                                                </Typography>
                                            </Stack>
                                            <Typography className="mt-1 text-sm">
                                                <span>
                                                    <ShieldOutlined />{" "}
                                                </span>
                                                Escrow eligible
                                            </Typography>
                                        </BoxSection>
                                    </Stack>
                                </Box>
                                <BoxSection className="p-3 md:p-4">
                                    <Typography variant="h6" className="font-semibold">
                                        Ratings & feedback
                                    </Typography>

                                    <Grid container spacing={2} mt={1}>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Stack spacing={1}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Star color="warning" />
                                                    <Typography variant="h5" fontWeight={700}>
                                                        4.7
                                                    </Typography>
                                                    <Typography className="text-sm text-gray-500">out of 5</Typography>
                                                </Stack>
                                                <HistogramBar label={5} value={72} />
                                                <HistogramBar label={4} value={18} />
                                                <HistogramBar label={3} value={6} />
                                                <HistogramBar label={2} value={3} />
                                                <HistogramBar label={1} value={1} />
                                            </Stack>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 8 }}>
                                            <Typography className="text-sm font-medium">Leave a comment</Typography>
                                            <TextField
                                                size="small"
                                                placeholder="Share your experience with this item..."
                                                fullWidth
                                                multiline
                                                minRows={2}
                                                sx={{ mt: 1 }}
                                            />
                                            <Stack direction="row" spacing={1} mt={1}>
                                                <Button startIcon={<CameraAlt />} variant="outlined" color="inherit">
                                                    Add photos
                                                </Button>
                                                <Button startIcon={<Send />} variant="contained">
                                                    Post comment
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 2 }} />

                                    <Stack spacing={2}>
                                        <ReviewItem
                                            name="Alex"
                                            date="Sep 14, 2025"
                                            rating={5}
                                            verified
                                            text="Great deal. Battery at 88% is accurate, noise cancellation works perfectly. Arrived in 2 days."
                                            images={[
                                                "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1887&auto=format&fit=crop",
                                                "https://images.unsplash.com/photo-1585386959880-e5d9f3f4042d?q=80&w=1887&auto=format&fit=crop",
                                            ]}
                                        />
                                        <ReviewItem
                                            name="Jenny"
                                            date="Sep 10, 2025"
                                            rating={4}
                                            text="Everything matched the description. Case had a few scratches but nothing major. Would buy again."
                                        />
                                        <ReviewItem
                                            name="Mina"
                                            date="Aug 29, 2025"
                                            rating={5}
                                            verified
                                            text="Paired instantly with my iPhone. ANC and transparency mode feel like new."
                                            images={[
                                                "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1887&auto=format&fit=crop",
                                            ]}
                                        />
                                    </Stack>
                                </BoxSection>
                            </Stack>
                        </Grid>

                        {/* Right: Price card */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <BoxSection className="h-full p-3 md:p-4">
                                <Stack spacing={1}>
                                    <Typography variant="h5" fontWeight={700}>
                                        {formatCurrencyVND(product.price)}
                                    </Typography>
                                    {/* <Typography className="text-xs text-gray-500">Est. $170</Typography> */}
                                    <Button
                                        startIcon={<ShoppingCart />}
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </Button>

                                    <Divider sx={{ my: 1.5 }} />

                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <LocalShippingOutlined fontSize="small" className="text-gray-500" />
                                            <Typography className="text-sm text-gray-500">
                                                Free shipping over {formatCurrencyVND(500000)}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <LockPersonOutlined fontSize="small" className="text-gray-500" />
                                            <Typography className="text-sm text-gray-500">
                                                Protected by AI fraud detection
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ my: 1.5 }} />

                                    <Stack spacing={1}>
                                        <Typography className="text-sm">
                                            <b>Payment</b>: Card • Apple Pay • PayPal
                                        </Typography>
                                        <Typography className="text-sm">
                                            <b>Warranty</b>: 90-day limited warranty
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </BoxSection>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </LoadingContainer>
    );
};

export default ProductDetailPage;
