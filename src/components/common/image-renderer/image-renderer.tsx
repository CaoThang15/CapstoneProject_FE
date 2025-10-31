import { Box } from "@mui/material";
import React from "react";
import DefaultImage from "~/assets/images/default_image.webp";

interface ImageRendererProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

const ImageRenderer: React.FC<ImageRendererProps> = ({ src, ...props }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s ease",
            }}
            {...props}
            component="img"
            src={src || DefaultImage}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.target as HTMLImageElement).src = DefaultImage;
            }}
            loading="lazy"
            decoding="async"
        />
    );
};

export default ImageRenderer;
