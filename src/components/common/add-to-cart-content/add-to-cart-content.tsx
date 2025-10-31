import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

interface Props {
    product?: any;
}

const AddToCartToastContent: React.FC<Props> = () => {
    const navigate = useNavigate();

    return (
        <Box className="flex items-center gap-2">
            <Typography variant="body2">Added to cart</Typography>
            <Button variant="text" size="small" color="primary" onClick={() => navigate("/cart")}>
                View Cart
            </Button>
        </Box>
    );
};

export default AddToCartToastContent;
