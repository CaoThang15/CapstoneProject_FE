import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { BANKS } from "~/constants/bank/bank.data";
import { NotificationType } from "~/entities/notification.entity";
import { useNotificationStream } from "~/services/notifications/hooks/queries/use-notification-stream";
import { QRInfoResponse } from "~/services/orders/infras";
import { formatCurrencyVND } from "~/utils/currency";
import { Dialog } from "../dialog";
import { IBaseDialogProps } from "../dialog/types";
import ImageRenderer from "../image-renderer/image-renderer";
import LoadingContainer from "../loading-container/loading-container";

interface PaymentQRCodeProps extends IBaseDialogProps {
    qrInfo?: QRInfoResponse;
    isLoading?: boolean;
}

const PaymentQRCode: React.FC<PaymentQRCodeProps> = ({ qrInfo, open, onClose, isLoading }) => {
    useNotificationStream((notification) => {
        if (notification.type === NotificationType.Payment) {
            toast.success(`Payment completed!`);
            onClose();
        }
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={false}
            maxWidth="md"
            sx={{
                "& .MuiPaper-root": {
                    minWidth: "18%",
                    minHeight: "18%",
                },
            }}
        >
            <Dialog.Body>
                <LoadingContainer isLoading={isLoading}>
                    <Box className="mt-3">
                        <Typography variant="h6" align="center">
                            Thanh toán QR Code
                        </Typography>
                        <Box className="mt-3 flex items-center gap-4">
                            <ImageRenderer
                                src={qrInfo?.qrCodeUrl}
                                alt="QR Code"
                                style={{
                                    width: "300px",
                                    height: "300px",
                                }}
                            />
                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1" fontWeight={600} className="text-center">
                                    Thông tin chuyển khoản
                                </Typography>

                                <Paper
                                    elevation={0}
                                    sx={{
                                        padding: 2,
                                        borderRadius: 2,
                                        border: "1px solid #eee",
                                        backgroundColor: "#fafafa",
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={500}>
                                        Số tài khoản: <strong>{qrInfo?.bankAccount}</strong>
                                    </Typography>
                                    <Typography variant="body1">
                                        Ngân hàng:{" "}
                                        <strong>{BANKS.find((bank) => bank.code === qrInfo?.bankName)?.name}</strong>
                                    </Typography>
                                    <Typography variant="body1">
                                        Số tiền: <strong>{formatCurrencyVND(qrInfo?.value ?? 0)}</strong>
                                    </Typography>
                                    <Typography variant="body1">
                                        Nội dung chuyển khoản: <strong>{qrInfo?.code}</strong>
                                    </Typography>
                                </Paper>
                            </Stack>
                        </Box>
                        <Typography variant="body2" align="center" mt={2}>
                            Quét mã QR bằng ứng dụng ngân hàng của bạn để hoàn tất thanh toán.
                        </Typography>
                    </Box>
                </LoadingContainer>
            </Dialog.Body>
        </Dialog>
    );
};

export default PaymentQRCode;
