import React from "react";
import { QRCode } from "react-qrcode-logo";
import AppLogo from "~/assets/images/logo.png";
import { Dialog } from "../dialog";
import { Box, Typography } from "@mui/material";
import { IBaseDialogProps } from "../dialog/types";
import LoadingContainer from "../loading-container/loading-container";
import ImageRenderer from "../image-renderer/image-renderer";

interface PaymentQRCodeProps extends IBaseDialogProps {
    qrCode: string;
    isLoading?: boolean;
}

const PaymentQRCode: React.FC<PaymentQRCodeProps> = ({ qrCode, open, onClose, isLoading }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={false}
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
                        <ImageRenderer
                            src={qrCode}
                            alt="QR Code"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                        {/* <QRCode
                            value={qrCode}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            qrStyle="squares"
                            eyeRadius={5}
                        /> */}
                    </Box>
                </LoadingContainer>
            </Dialog.Body>
        </Dialog>
    );
};

export default PaymentQRCode;
