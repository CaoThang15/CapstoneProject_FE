import { ErrorOutline } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";

export const CartItemError: React.FC = () => {
    return (
        <BoxSection>
            <Grid container alignItems="center" spacing={2}>
                <Box className="mr-4 h-full w-48 sm:block md:w-32 lg:w-48">
                    <Box
                        sx={{
                            height: 120,
                            borderRadius: 2,
                            bgcolor: "grey.200",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ErrorOutline color="error" sx={{ fontSize: 40 }} />
                    </Box>
                </Box>

                {/* Error message */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack spacing={1}>
                        <Typography fontWeight={700} color="error.main">
                            Không thể tải sản phẩm
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Đã xảy ra lỗi khi tải thông tin sản phẩm. Vui lòng thử lại.
                        </Typography>
                    </Stack>
                </Grid>

                {/* Empty placeholder for price section to keep layout consistent */}
                <Grid size={{ xs: 12, sm: 3 }}>
                    <Box textAlign="right">
                        <Typography variant="body2" color="text.secondary">
                            Không khả dụng
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </BoxSection>
    );
};
