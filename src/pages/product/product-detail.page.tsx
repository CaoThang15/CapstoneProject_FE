import {
    AccessTimeOutlined,
    ArrowDropDown,
    ArrowDropUp,
    KeyboardArrowLeft,
    KeyboardArrowLeftOutlined,
    KeyboardArrowRightOutlined,
    LocationOnOutlined,
    ScheduleOutlined,
    ShieldOutlined,
    ShoppingCart,
    ShowChartOutlined,
    Star,
} from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Divider, Grid, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";
import { HistogramBar, ReviewItem } from "~/components/comments";
import { AddToCartToastContent, BoxSection, ImageRenderer, LoadingContainer, PreviewImage } from "~/components/common";
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
import dayjs from "dayjs";

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

    const [isReadMoreDescription, setIsReadMoreDescription] = React.useState(false);
    const [isHidePhoneNumber, setIsHidePhoneNumber] = React.useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = React.useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

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

    const handleScrollLeft = () => {
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
                <Box className="container mx-auto space-y-5">
                    <BoxSection className="flex space-x-8 p-2 md:p-3">
                        <Box className="relative flex basis-2/5 flex-col gap-2">
                            {/* Main Image */}
                            <Box className="h-[200px] w-full rounded-lg md:h-[300px]">
                                <ImageRenderer
                                    onClick={() => setIsPreviewOpen(true)}
                                    src={images[selectedImageIndex]?.path}
                                    alt={images[selectedImageIndex]?.name}
                                    className="h-full w-full cursor-pointer rounded-xl object-contain transition-all duration-300"
                                />
                            </Box>

                            {/* Thumbnails + Controls at bottom */}
                            {images.length > 1 && (
                                <Box className="mt-2 flex items-center justify-center gap-2 overflow-x-auto">
                                    <IconButton
                                        size="small"
                                        onClick={handleScrollLeft}
                                        disabled={thumbnailStartIndex === 0}
                                        sx={{
                                            opacity: thumbnailStartIndex === 0 ? 0.3 : 1,
                                        }}
                                    >
                                        <KeyboardArrowLeftOutlined />
                                    </IconButton>

                                    <Stack direction="row" spacing={1} sx={{ overflowX: "hidden" }}>
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
                                        onClick={handleScrollDown} // Can rename to handleScrollRight
                                        disabled={thumbnailStartIndex + 5 >= images.length}
                                        sx={{
                                            opacity: thumbnailStartIndex + 5 >= images.length ? 0.3 : 1,
                                        }}
                                    >
                                        <KeyboardArrowRightOutlined />
                                        {/* Can replace with ArrowForwardIos for horizontal */}
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        <Box className="h-full flex-1 p-3 md:p-4">
                            <Stack spacing={2}>
                                <Typography variant="h5" className="font-semibold">
                                    {product.name}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                                    <Typography variant="h5" fontWeight={700} color="error">
                                        {formatCurrencyVND(product.price)}
                                    </Typography>
                                </Stack>
                                <Box className="mt-2 flex items-center space-x-2">
                                    <LocationOnOutlined />
                                    <Typography className="text-sm text-gray-600">
                                        Địa chỉ: {product.location}
                                    </Typography>
                                </Box>
                                <Box className="mt-2 flex items-center space-x-2">
                                    <AccessTimeOutlined />
                                    <Typography className="text-sm text-gray-600">
                                        Thời gian: {dayjs(product.createdAt).fromNow()}
                                    </Typography>
                                </Box>
                                <Box className="flex items-center space-x-2">
                                    <Button
                                        startIcon={<ShoppingCart />}
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </Button>
                                    <Button
                                        startIcon={<ShoppingCart />}
                                        variant="outlined"
                                        size="large"
                                        color="inherit"
                                        fullWidth
                                        onClick={() => setIsHidePhoneNumber(false)}
                                    >
                                        Hiện số{" "}
                                        {isHidePhoneNumber
                                            ? `${product.seller.phone.slice(0, 3)}******`
                                            : product.seller.phone}
                                    </Button>
                                </Box>
                            </Stack>
                            <Divider sx={{ mt: 3, mb: 0 }} />
                            <Box className="mb-2 rounded-xl bg-white p-3 md:p-4">
                                <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                                    <Avatar src={product.seller.avatar} />
                                    <Box className="flex-1">
                                        <Typography className="font-medium">
                                            Người bán: {product.seller.name}
                                        </Typography>
                                        <Typography className="text-sm text-gray-600">
                                            <LocationOnOutlined fontSize="small" /> Địa chỉ:{" "}
                                            {product.seller.address +
                                                ", " +
                                                product.seller.ward +
                                                ", " +
                                                product.seller.province}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        color="primary"
                                        size="small"
                                        label={`Tham gia từ ${dayjs(product.seller.createdAt).format("YYYY")}`}
                                    />
                                </Stack>
                            </Box>
                        </Box>
                    </BoxSection>
                    <Grid container spacing={2}>
                        {/* Left: Gallery */}
                        <Grid size={8}>
                            <Stack direction="column" spacing={1}>
                                <BoxSection className="rounded-xl border border-gray-100 bg-white p-2 md:p-4">
                                    <Grid container spacing={2} mt={1} mb={3}>
                                        <Grid size={12}>
                                            <Typography className="mb-2">
                                                <strong>Mô tả sản phẩm:</strong>
                                            </Typography>
                                            <Typography className="whitespace-pre-line text-gray-700">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {isReadMoreDescription
                                                        ? product.description
                                                        : `${product.description.slice(0, 300)}...`}
                                                </ReactMarkdown>
                                                <Button
                                                    size="small"
                                                    color="inherit"
                                                    fullWidth
                                                    className="mt-4"
                                                    onClick={() => setIsReadMoreDescription(!isReadMoreDescription)}
                                                >
                                                    {isReadMoreDescription ? "Thu gọn" : "Xem thêm"}
                                                </Button>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </BoxSection>

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
                            </Stack>
                        </Grid>
                        <Grid size={4}>
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

                                    <BoxSection className="mt-3 flex justify-center">
                                        <Pagination
                                            count={feedbackCount}
                                            page={currentFeedbackPage}
                                            onChange={(_, newPage) => handlePageChange(newPage, feedbackPageSize)}
                                        />
                                    </BoxSection>
                                </BoxSection>
                            </LoadingContainer>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <PreviewImage
                imageUrl={images[selectedImageIndex]?.path}
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
            />
        </LoadingContainer>
    );
};

export default ProductDetailPage;
