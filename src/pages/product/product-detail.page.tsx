import { AddPhotoAlternate, CheckCircle, Favorite, FavoriteBorder, Share, Star } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Rating,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";
import { LandingBreadcrumbs } from "~/components/layout/breadcrumbs";

interface Review {
    id: number;
    userName: string;
    userAvatar: string;
    rating: number;
    date: string;
    comment: string;
    isVerifiedPurchase: boolean;
    hasPhotos: boolean;
    photos?: string[];
}

interface ProductSpec {
    label: string;
    value: string;
    condition?: string;
}

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [newComment, setNewComment] = useState("");

    // Mock data - replace with actual API calls
    const product = {
        id: id || "1",
        name: "AirPods Pro (2nd gen) with MagSafe Case",
        price: 135,
        originalPrice: 170,
        savings: 35,
        condition: "Fair condition",
        rating: 4.7,
        reviewCount: 5,
        isAIDeal: true,
        caseHealth: "88%",
        caseBattery: 88,
        isSerialVerified: true,
        isMagSafe: true,
        shipsIn: "24h",
        images: [
            "/api/placeholder/400/400",
            "/api/placeholder/400/400",
            "/api/placeholder/400/400",
            "/api/placeholder/400/400",
        ],
        seller: {
            name: "Alex Chen",
            avatar: "/api/placeholder/40/40",
            rating: 4.9,
            salesCount: 182,
            isVerified: true,
            joinedDate: "2023",
        },
        included: [
            { item: "AirPods Pro (2nd gen) earbuds", condition: "Both L/R" },
            { item: "MagSafe Charging Case", condition: "Battery 88%" },
            { item: "USB-C cable", condition: "Aftermarket" },
            { item: "Silicone ear tips", condition: "S/M/L" },
        ],
        shipping: {
            standard: "Standard 3-5 days",
            returns: "7-day return window",
            carrier: "Carrier selected at checkout",
            protection: "AI fraud protection included",
        },
        priceInsight: {
            percentBelowMarket: 21,
            typicalSellTime: "2 days",
        },
        fraudCheck: {
            lowRisk: true,
            noMismatch: true,
            escrowEligible: true,
        },
    };

    const reviews: Review[] = [
        {
            id: 1,
            userName: "Sarah M.",
            userAvatar: "/api/placeholder/40/40",
            rating: 5,
            date: "Sep 14, 2025",
            comment: "Great deal. Battery at 88% is accurate, noise cancellation works perfectly. Arrived in 2 days.",
            isVerifiedPurchase: true,
            hasPhotos: true,
            photos: ["/api/placeholder/100/100", "/api/placeholder/100/100"],
        },
        {
            id: 2,
            userName: "Mike K.",
            userAvatar: "/api/placeholder/40/40",
            rating: 4,
            date: "Sep 10, 2025",
            comment: "Everything matched the description. Case had a few scratches but nothing major. Would buy again.",
            isVerifiedPurchase: false,
            hasPhotos: false,
        },
        {
            id: 3,
            userName: "Jessica L.",
            userAvatar: "/api/placeholder/40/40",
            rating: 5,
            date: "Aug 29, 2025",
            comment: "Paired instantly with my iPhone. ANC and transparency mode feel like new.",
            isVerifiedPurchase: true,
            hasPhotos: true,
            photos: ["/api/placeholder/100/100"],
        },
    ];

    const ratingDistribution = [
        { stars: 5, percentage: 72 },
        { stars: 4, percentage: 18 },
        { stars: 3, percentage: 6 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 1 },
    ];

    const handleQuantityChange = (change: number) => {
        setQuantity(Math.max(1, quantity + change));
    };

    const handleAddToCart = () => {
        console.log("Added to cart:", { product: product.name, quantity });
    };

    const handleBuyNow = () => {
        console.log("Buy now:", { product: product.name, quantity });
    };

    const handleShare = () => {
        navigator.share?.({
            title: product.name,
            url: window.location.href,
        });
    };

    const handlePostComment = () => {
        if (newComment.trim()) {
            console.log("Posting comment:", newComment);
            setNewComment("");
        }
    };

    return (
        <Box className="container mx-auto py-4">
            <LandingBreadcrumbs />

            <Grid container spacing={4}>
                {/* Product Images */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                        {/* Main Image */}
                        <Paper elevation={0} className="mb-4 rounded-xl p-4">
                            <Box
                                component="img"
                                src={product.images[selectedImage]}
                                alt={product.name}
                                sx={{
                                    width: "100%",
                                    height: 400,
                                    objectFit: "cover",
                                    bgcolor: "#f5f5f5",
                                }}
                                className="rounded-xl"
                            />
                        </Paper>

                        {/* Thumbnail Images */}
                        <Stack direction="row" spacing={1}>
                            {product.images.map((image, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        border: selectedImage === index ? 2 : 1,
                                        borderColor: selectedImage === index ? "primary.main" : "grey.300",
                                        borderRadius: 1,
                                        cursor: "pointer",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            bgcolor: "#f5f5f5",
                                        }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Grid>

                <Box>
                    {/* Product Title and Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" className="mb-3">
                        <Typography variant="h4" fontWeight={600}>
                            {product.name}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                            </IconButton>
                            <IconButton onClick={handleShare}>
                                <Share />
                            </IconButton>
                        </Stack>
                    </Stack>

                    {/* AI Deal Badge */}
                    {product.isAIDeal && (
                        <Box className="mb-3">
                            <Chip
                                label="AI deal"
                                color="primary"
                                size="small"
                                sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}
                            />
                            <Typography variant="body2" color="text.secondary" className="mt-1">
                                Case health 88% • Flagged as below market pricing
                            </Typography>
                        </Box>
                    )}

                    {/* Price */}
                    <Stack direction="row" spacing={2} alignItems="baseline" className="mb-4">
                        <Typography variant="h3" fontWeight={700} color="primary">
                            ${product.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                            Est. value ${product.originalPrice}
                        </Typography>
                        <Chip label={`You save $${product.savings}`} color="success" size="small" variant="outlined" />
                        <Chip label={product.condition} variant="outlined" size="small" />
                    </Stack>
                </Box>
                {/* Product Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                        {/* Product Title and Actions */}
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" className="mb-3">
                            <Typography variant="h4" fontWeight={600}>
                                {product.name}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                                    {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                                </IconButton>
                                <IconButton onClick={handleShare}>
                                    <Share />
                                </IconButton>
                            </Stack>
                        </Stack>

                        {/* AI Deal Badge */}
                        {product.isAIDeal && (
                            <Box className="mb-3">
                                <Chip
                                    label="AI deal"
                                    color="primary"
                                    size="small"
                                    sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}
                                />
                                <Typography variant="body2" color="text.secondary" className="mt-1">
                                    Case health 88% • Flagged as below market pricing
                                </Typography>
                            </Box>
                        )}

                        {/* Price */}
                        <Stack direction="row" spacing={2} alignItems="baseline" className="mb-4">
                            <Typography variant="h3" fontWeight={700} color="primary">
                                ${product.price}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                                Est. value ${product.originalPrice}
                            </Typography>
                            <Chip
                                label={`You save $${product.savings}`}
                                color="success"
                                size="small"
                                variant="outlined"
                            />
                            <Chip label={product.condition} variant="outlined" size="small" />
                        </Stack>

                        {/* Product Features */}

                        {/* Quantity and Add to Cart */}
                        {/* <Stack spacing={3} className="mb-6">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body1">Quantity:</Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                    >
                                        <Remove />
                                    </IconButton>
                                    <Typography variant="body1" sx={{ minWidth: 20, textAlign: "center" }}>
                                        {quantity}
                                    </Typography>
                                    <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                                        <Add />
                                    </IconButton>
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" fullWidth onClick={handleAddToCart}>
                                    Add to cart
                                </Button>
                                <Button variant="outlined" fullWidth onClick={handleBuyNow}>
                                    Buy now
                                </Button>
                            </Stack>
                        </Stack> */}

                        {/* Seller Info */}
                    </Box>
                </Grid>
            </Grid>

            <Card variant="outlined" className="mt-4">
                <CardContent>
                    <Typography variant="h6" className="mb-3">
                        Seller
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={product.seller.avatar} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {product.seller.name}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Rating value={product.seller.rating} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary">
                                    {product.seller.salesCount} sales • Verified
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                Joined {product.seller.joinedDate}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
            {/* Product Details Tabs */}
            <Box className="mt-8">
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                    <Tab label="What's included" />
                    <Tab label="Shipping & returns" />
                    <Tab label="AI price insight" />
                    <Tab label="Ratings & feedback" />
                </Tabs>

                {/* What's Included Tab */}
                {activeTab === 0 && (
                    <Paper className="mt-4 p-4">
                        <Typography variant="h6" className="mb-3">
                            What's included
                        </Typography>
                        <List>
                            {product.included.map((item, index) => (
                                <ListItem key={index} divider={index < product.included.length - 1}>
                                    <ListItemText primary={item.item} secondary={item.condition} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}

                {/* Shipping & Returns Tab */}
                {activeTab === 1 && (
                    <Paper className="mt-4 p-4">
                        <Typography variant="h6" className="mb-3">
                            Shipping & returns
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={6}>
                                <Typography variant="subtitle2" className="mb-1">
                                    Shipping
                                </Typography>
                                <Typography variant="body2" className="mb-2">
                                    {product.shipping.standard}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.shipping.carrier}
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="subtitle2" className="mb-1">
                                    Returns
                                </Typography>
                                <Typography variant="body2" className="mb-2">
                                    {product.shipping.returns}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.shipping.protection}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}

                {/* AI Price Insight Tab */}
                {activeTab === 2 && (
                    <Paper className="mt-4 p-4">
                        <Grid container spacing={4}>
                            <Grid size={6}>
                                <Typography variant="h6" className="mb-3">
                                    AI price insight
                                </Typography>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <CheckCircle color="success" fontSize="small" />
                                        <Typography variant="body2">
                                            Current listing is {product.priceInsight.percentBelowMarket}% below market
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <CheckCircle color="success" fontSize="small" />
                                        <Typography variant="body2">
                                            Typical sell time: {product.priceInsight.typicalSellTime}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="h6" className="mb-3">
                                    AI fraud check
                                </Typography>
                                <Stack spacing={2}>
                                    <Chip label="Low risk" color="success" size="small" icon={<CheckCircle />} />
                                    <Typography variant="body2">No mismatch in photos/metadata</Typography>
                                    <Typography variant="body2">Escrow eligible</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                )}

                {/* Ratings & Feedback Tab */}
                {activeTab === 3 && (
                    <Paper className="mt-4 p-4">
                        <Grid container spacing={4}>
                            <Grid size={4}>
                                <Typography variant="h6" className="mb-3">
                                    Ratings & feedback
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="baseline" className="mb-3">
                                    <Typography variant="h2" fontWeight={700}>
                                        {product.rating}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        out of {product.reviewCount}
                                    </Typography>
                                </Stack>

                                {/* Rating Distribution */}
                                <Stack spacing={1}>
                                    {ratingDistribution.map((rating) => (
                                        <Stack key={rating.stars} direction="row" spacing={1} alignItems="center">
                                            <Typography variant="body2" sx={{ minWidth: 8 }}>
                                                {rating.stars}
                                            </Typography>
                                            <Star fontSize="small" />
                                            <LinearProgress
                                                variant="determinate"
                                                value={rating.percentage}
                                                sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
                                            />
                                            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
                                                {rating.percentage}%
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>

                                <Stack direction="row" spacing={2} className="mt-4">
                                    <Button variant="outlined" size="small">
                                        Verified purchase
                                    </Button>
                                    <Button variant="outlined" size="small">
                                        With photos
                                    </Button>
                                    <Button variant="outlined" size="small">
                                        Recent
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid size={8}>
                                <Typography variant="h6" className="mb-3">
                                    Leave a comment
                                </Typography>
                                <Stack spacing={2} className="mb-4">
                                    <TextField
                                        multiline
                                        rows={3}
                                        placeholder="Share your experience with this item..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        fullWidth
                                    />
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="outlined" startIcon={<AddPhotoAlternate />} size="small">
                                            Add photos
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handlePostComment}
                                            disabled={!newComment.trim()}
                                        >
                                            Post comment
                                        </Button>
                                    </Stack>
                                </Stack>

                                {/* Reviews List */}
                                <Stack spacing={3}>
                                    {reviews.map((review) => (
                                        <Box key={review.id}>
                                            <Stack direction="row" spacing={2}>
                                                <Avatar src={review.userAvatar} />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                        className="mb-1"
                                                    >
                                                        <Rating value={review.rating} readOnly size="small" />
                                                        {review.isVerifiedPurchase && (
                                                            <Chip
                                                                label="Verified purchase"
                                                                size="small"
                                                                color="success"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                        {review.hasPhotos && (
                                                            <Chip label="With photos" size="small" variant="outlined" />
                                                        )}
                                                    </Stack>
                                                    <Typography variant="body2" color="text.secondary" className="mb-1">
                                                        {review.date}
                                                    </Typography>
                                                    <Typography variant="body1" className="mb-2">
                                                        {review.comment}
                                                    </Typography>
                                                    {review.photos && (
                                                        <Stack direction="row" spacing={1}>
                                                            {review.photos.map((photo, index) => (
                                                                <Box
                                                                    key={index}
                                                                    component="img"
                                                                    src={photo}
                                                                    alt={`Review photo ${index + 1}`}
                                                                    sx={{
                                                                        width: 60,
                                                                        height: 60,
                                                                        borderRadius: 1,
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                            ))}
                                                        </Stack>
                                                    )}
                                                </Box>
                                            </Stack>
                                            <Divider className="mt-3" />
                                        </Box>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

// Battery component for the battery icon
const Battery: React.FC = () => (
    <Box
        sx={{
            width: 16,
            height: 10,
            border: 1,
            borderColor: "grey.400",
            borderRadius: 1,
            position: "relative",
            "&::after": {
                content: '""',
                position: "absolute",
                right: -2,
                top: 2,
                width: 2,
                height: 6,
                bgcolor: "grey.400",
                borderRadius: "0 1px 1px 0",
            },
        }}
    >
        <Box
            sx={{
                width: "88%",
                height: "100%",
                bgcolor: "success.main",
                borderRadius: 0.5,
            }}
        />
    </Box>
);

export default ProductDetailPage;
