import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { ImageRenderer } from "~/components/common";
import { DATE_TIME_FORMAT } from "~/constants/date-time.format";
import { Feedback } from "~/entities/feedback.entity";
import { formatDate } from "~/utils/date-time";

interface FeedbackItemProps {
    feedback: Feedback;
}
const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => (
    <Box className="flex gap-3">
        <Avatar sx={{ width: 36, height: 36 }}>{feedback.user.name}</Avatar>
        <Box className="flex-1">
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography className="text-sm font-semibold">{feedback.user.name}</Typography>
            </Stack>
            <Typography className="text-xs text-gray-500" mt={0.5}>
                {formatDate(feedback.createdAt, DATE_TIME_FORMAT["dd/MM/yyyy HH:mm"])}
            </Typography>
            <Rating value={feedback.rate} readOnly size="small" sx={{ mt: 0.5 }} />
            <Typography className="mt-1 text-sm">{feedback.content}</Typography>
            {feedback.sharedFile && (
                <ImageRenderer
                    src={feedback.sharedFile.path}
                    alt="Feedback Image"
                    className="mt-2 h-32 w-32 rounded object-cover"
                />
            )}
        </Box>
    </Box>
);

export default FeedbackItem;
