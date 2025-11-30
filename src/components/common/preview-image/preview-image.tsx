import React from "react";
import { IBaseDialogProps } from "../dialog/types";
import { Box, Dialog, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import ImageRenderer from "../image-renderer/image-renderer";

interface PreviewImageProps extends IBaseDialogProps {
    imageUrl: string;
}
const PreviewImage: React.FC<PreviewImageProps> = ({ imageUrl, onClose, open }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: "rgba(0,0,0,0.9)",
                        boxShadow: "none",
                        overflow: "hidden",
                        p: 0,
                    },
                },
            }}
        >
            <Box className="relative flex h-screen w-screen items-center justify-center">
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        color: "#fff",
                        zIndex: 10,
                    }}
                >
                    <Close />
                </IconButton>
                <ImageRenderer src={imageUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
            </Box>
        </Dialog>
    );
};

export default PreviewImage;
