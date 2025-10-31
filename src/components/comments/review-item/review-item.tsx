import { CheckCircle } from "@mui/icons-material";
import { Box, Avatar, Stack, Typography, Chip, Rating } from "@mui/material";
import React from "react";

interface ReviewItemProps {
    name: string;
    date: string;
    rating: number;
    text: string;
    images?: string[];
    verified?: boolean;
}
const ReviewItem: React.FC<ReviewItemProps> = ({ name, date, rating, text, images = [], verified }) => (
    <Box className="flex gap-3">
        <Avatar sx={{ width: 36, height: 36 }}>{name[0]}</Avatar>
        <Box className="flex-1">
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography className="text-sm font-semibold">{name}</Typography>
                {verified && (
                    <Chip
                        size="small"
                        color="success"
                        variant="outlined"
                        label="Verified purchase"
                        icon={<CheckCircle fontSize="small" />}
                        sx={{ height: 20 }}
                    />
                )}
            </Stack>
            <Typography className="text-xs text-gray-500" mt={0.5}>
                {date}
            </Typography>
            <Rating value={rating} readOnly size="small" sx={{ mt: 0.5 }} />
            <Typography className="mt-1 text-sm">{text}</Typography>
            {images.length > 0 && (
                <Stack direction="row" spacing={1} mt={1.5}>
                    {images.map((src, i) => (
                        <img key={i} src={src} className="h-16 w-20 rounded border object-cover" alt={`review-${i}`} />
                    ))}
                </Stack>
            )}
        </Box>
    </Box>
);

export default ReviewItem;
