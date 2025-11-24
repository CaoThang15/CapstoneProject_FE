import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { DATE_TIME_FORMAT } from "~/constants/date-time.format";
import { Voucher } from "~/entities";
import { formatDate } from "~/utils/date-time";

interface VoucherCardProps {
    voucher: Voucher;
    isOwned?: boolean;
    onSaveVoucher?: (voucherId: number) => void;
    isSaving?: boolean;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, isOwned, onSaveVoucher, isSaving }) => {
    const handleCopyCode = () => {
        navigator.clipboard.writeText(voucher.code);
    };

    return (
        <>
            <Box className="flex h-full space-x-2 rounded-xl border border-gray-300 shadow-sm">
                <Box
                    className="flex h-full w-[140px] flex-col items-center justify-center p-2"
                    sx={{ backgroundColor: "primary.light" }}
                >
                    <Typography fontWeight={600} fontSize={16} color="primary">
                        {voucher.getDiscountLabel()}
                    </Typography>
                </Box>
                <Stack spacing={1} className="flex-1 p-4">
                    <Typography>
                        Code: <span className="rounded-xl bg-gray-100 p-2 font-semibold">{voucher.code}</span>
                    </Typography>
                    <Box className="flex justify-end space-x-2">
                        <Button variant="outlined" color="inherit" onClick={handleCopyCode}>
                            Copy
                        </Button>
                        {!isOwned && (
                            <Button
                                onClick={() => onSaveVoucher?.(voucher.id)}
                                loading={isSaving}
                                loadingPosition="start"
                            >
                                Save
                            </Button>
                        )}
                    </Box>
                    <Typography fontSize={12} color="text.secondary">
                        {voucher.description}
                    </Typography>
                    <LinearProgress variant="determinate" value={voucher.getUsagePercentage()} />
                    <Typography fontSize={12} color="text.secondary">
                        Usage left: {voucher.getUsageLeftPercentage()}% remaining. Valid until{" "}
                        {formatDate(voucher.endDate, DATE_TIME_FORMAT["dd/MM/yyyy"])}
                    </Typography>
                </Stack>
            </Box>
        </>
    );
};

export default VoucherCard;
