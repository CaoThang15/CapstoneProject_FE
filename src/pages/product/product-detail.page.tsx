import {
    ArrowDropDown,
    ArrowDropUp,
    Battery0Bar,
    CheckCircle,
    LocalShippingOutlined,
    LockPersonOutlined,
    ScheduleOutlined,
    ShieldOutlined,
    ShoppingCart,
    ShowChartOutlined,
    Star,
    Wifi,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Pagination,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";
import { HistogramBar, ReviewItem } from "~/components/comments";
import { AddToCartToastContent, BoxSection, ImageRenderer, LoadingContainer } from "~/components/common";
import { useAuth } from "~/contexts/auth.context";
import { usePagination } from "~/hooks";
import { SlugPathParams } from "~/routes/types";
import {
    useQueryGetProductFeedbackStatistic,
    useQueryGetProductFeedbacksWithPagination,
} from "~/services/feedbacks/hooks/queries";
import { useQueryGetProductBySlug } from "~/services/products/hooks/queries";
import { showToast } from "~/utils";
import { formatCurrencyVND } from "~/utils/currency";
import { LocalStorageCartItems } from "../cart/types";

const ProductDetailPage: React.FC = () => {
    const { user } = useAuth();
    const [_, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);
    const { pageIndex: currentFeedbackPage, pageSize: feedbackPageSize, handlePageChange } = usePagination();
    const { slug } = useParams<SlugPathParams>();

    const { data: product, isLoading, isError } = useQueryGetProductBySlug(slug);
    const {
        data: { items: feedbacks, total: feedbackCount },
    } = useQueryGetProductFeedbacksWithPagination({
        page: currentFeedbackPage,
        pageSize: feedbackPageSize,
        productId: product?.id,
    });
    const { data: productFeedbackStatistic, isLoading: isLoadingFeedbackStatistic } =
        useQueryGetProductFeedbackStatistic(product?.id);

    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = React.useState(0);

    const images = product?.sharedFiles ?? [];
    const visibleThumbnails = images.slice(thumbnailStartIndex, thumbnailStartIndex + 5);

    // TODO: handle pagination for feedbacks and test at case have feedback content
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

    const handleThumbnailClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleScrollUp = () => {
        if (thumbnailStartIndex > 0) {
            setThumbnailStartIndex((prev) => prev - 1);
        }
    };

    const handleScrollDown = () => {
        if (thumbnailStartIndex + 5 < images.length) {
            setThumbnailStartIndex((prev) => prev + 1);
        }
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
                                        {/* Main Image */}
                                        <Box className="h-[420px] flex-1 rounded-lg object-cover md:h-[520px]">
                                            <ImageRenderer
                                                src={images[selectedImageIndex]?.path}
                                                alt={images[selectedImageIndex]?.name}
                                                className="rounded-xl object-contain transition-all duration-300"
                                            />
                                        </Box>

                                        {/* Thumbnails + Controls */}
                                        {images.length > 1 && (
                                            <Stack alignItems="center" className="relative hidden w-28 md:flex">
                                                <IconButton
                                                    size="small"
                                                    onClick={handleScrollUp}
                                                    disabled={thumbnailStartIndex === 0}
                                                    sx={{
                                                        mb: 0.5,
                                                        opacity: thumbnailStartIndex === 0 ? 0.3 : 1,
                                                    }}
                                                >
                                                    <ArrowDropUp />
                                                </IconButton>

                                                <Stack spacing={1} sx={{ overflow: "hidden" }}>
                                                    {visibleThumbnails.map((image, idx) => {
                                                        const globalIndex = thumbnailStartIndex + idx;
                                                        const isSelected = globalIndex === selectedImageIndex;

                                                        return (
                                                            <Box
                                                                key={image.path}
                                                                onClick={() => handleThumbnailClick(globalIndex)}
                                                                className={`h-24 w-28 cursor-pointer rounded-lg border object-cover transition-all duration-200 ${
                                                                    isSelected
                                                                        ? "border-2 border-blue-500"
                                                                        : "border border-gray-100 hover:border-gray-300"
                                                                }`}
                                                            >
                                                                <ImageRenderer src={image.path} alt={image.name} />
                                                            </Box>
                                                        );
                                                    })}
                                                </Stack>

                                                <IconButton
                                                    size="small"
                                                    onClick={handleScrollDown}
                                                    disabled={thumbnailStartIndex + 5 >= images.length}
                                                    sx={{
                                                        mt: 0.5,
                                                        opacity: thumbnailStartIndex + 5 >= images.length ? 0.3 : 1,
                                                    }}
                                                >
                                                    <ArrowDropDown />
                                                </IconButton>
                                            </Stack>
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
                                <LoadingContainer isLoading={isLoadingFeedbackStatistic}>
                                    <BoxSection className="p-3 md:p-4">
                                        <Typography variant="h6" className="font-semibold">
                                            Ratings & feedback
                                        </Typography>

                                        <Stack spacing={1}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Star color="warning" />
                                                <Typography variant="h5" fontWeight={700}>
                                                    {productFeedbackStatistic.averageRating}
                                                </Typography>
                                                <Typography className="text-sm text-gray-500">out of 5</Typography>
                                            </Stack>
                                            {[5, 4, 3, 2, 1].map((label) => (
                                                <HistogramBar
                                                    key={label}
                                                    label={label}
                                                    value={
                                                        (productFeedbackStatistic?.ratingStatistic?.[label] /
                                                            productFeedbackStatistic?.totalFeedbacks) *
                                                        100
                                                    }
                                                />
                                            ))}
                                        </Stack>

                                        <Divider sx={{ my: 2 }} />

                                        <Stack spacing={2}>
                                            {feedbacks.length > 0 ? (
                                                feedbacks.map((fb) => <ReviewItem key={fb.id} feedback={fb} />)
                                            ) : (
                                                <Typography className="text-center text-sm text-gray-500">
                                                    No feedback available
                                                </Typography>
                                            )}
                                        </Stack>

                                        <Box className="mt-3 flex justify-center">
                                            <Pagination
                                                count={feedbackCount}
                                                page={currentFeedbackPage}
                                                onChange={(_, newPage) => handlePageChange(newPage, feedbackPageSize)}
                                            />
                                        </Box>
                                    </BoxSection>
                                </LoadingContainer>
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
