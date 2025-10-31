import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";

export const CartItemSkeleton: React.FC = () => {
    return (
        <BoxSection>
            <Grid container alignItems="center" spacing={2}>
                {/* Product image */}
                <Box className="mr-4 h-full w-48 sm:block md:w-32 lg:w-48">
                    <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 2 }} />
                </Box>

                {/* Product info */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack spacing={1}>
                        <Skeleton variant="text" width="70%" height={24} />
                        <Skeleton variant="text" width="50%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                    </Stack>
                </Grid>

                {/* Quantity and price */}
                <Grid size={{ xs: 12, sm: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Skeleton variant="circular" width={28} height={28} />
                            <Skeleton variant="rectangular" width={36} height={28} sx={{ borderRadius: 1 }} />
                            <Skeleton variant="circular" width={28} height={28} />
                        </Stack>

                        <Box textAlign="right">
                            <Skeleton variant="text" width={60} height={24} />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </BoxSection>
    );
};
