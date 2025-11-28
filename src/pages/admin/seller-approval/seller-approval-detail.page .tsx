import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { BoxSection, HighlightCard, ImageRenderer, LoadingContainer } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import { DATE_TIME_FORMAT } from "~/constants/date-time.format";
import { LegalType } from "~/pages/seller/on-boarding/types";
import { useQueryGetSellerRequestById } from "~/services/seller-request/hooks/queries";
import { formatDate } from "~/utils/date-time";

interface Props extends IBaseDialogProps {
    requestId: number;
}

const SellerApprovalDetailDialog: React.FC<Props> = ({ onClose, open, requestId }) => {
    const { isLoading, data: sellerRequest } = useQueryGetSellerRequestById(requestId);

    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header title="Seller Approval Management" onClose={onClose} />
            <Dialog.Body className="p-0">
                <LoadingContainer isLoading={isLoading}>
                    <Box className="flex space-x-2 p-2">
                        <BoxSection className="basis-1/2">
                            <Typography fontWeight={600} fontSize={14} className="mb-2">
                                Applicant
                            </Typography>
                            <Divider className="mb-2" />
                            <Stack spacing={2}>
                                <BoxSection className="flex space-x-3">
                                    <Avatar />
                                    <Box>
                                        <Typography fontWeight={600} fontSize={14}>
                                            {sellerRequest?.fullName}
                                        </Typography>
                                        <Typography fontSize={12} fontWeight={300}>
                                            {sellerRequest?.user.email} - {sellerRequest?.storeName}
                                        </Typography>
                                    </Box>
                                </BoxSection>
                                <BoxSection className="flex items-center justify-between space-x-3">
                                    <Typography fontWeight={500} fontSize={13}>
                                        Store
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={600}>
                                        {sellerRequest?.storeName}
                                    </Typography>
                                </BoxSection>
                                <BoxSection className="flex items-center justify-between space-x-3">
                                    <Typography fontWeight={500} fontSize={13}>
                                        Legal Type:
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={600}>
                                        {sellerRequest?.legalTypeName}
                                    </Typography>
                                </BoxSection>
                                <BoxSection className="flex items-center justify-between space-x-3">
                                    <Typography fontWeight={500} fontSize={13}>
                                        Phone Number:
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={600}>
                                        {sellerRequest?.phoneNumber}
                                    </Typography>
                                </BoxSection>
                                <BoxSection className="flex items-center justify-between space-x-3">
                                    <Typography fontWeight={500} fontSize={13}>
                                        Business Address:
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={600}>
                                        {sellerRequest?.businessAddress}
                                    </Typography>
                                </BoxSection>
                                <BoxSection className="flex items-center justify-between space-x-3">
                                    <Typography fontWeight={500} fontSize={13}>
                                        Category:
                                    </Typography>
                                    <HighlightCard typography={sellerRequest?.primaryCategory.name} />
                                </BoxSection>
                                <BoxSection className="flex items-center justify-between space-x-3">
                                    <Typography fontWeight={500} fontSize={13}>
                                        Created At:
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={600}>
                                        {formatDate(sellerRequest?.createdAt, DATE_TIME_FORMAT["dd/MM/yyyy HH:mm"])}
                                    </Typography>
                                </BoxSection>
                            </Stack>
                        </BoxSection>
                        <BoxSection className="basis-1/2">
                            <Typography fontWeight={600} fontSize={14} className="mb-2">
                                Identity document
                            </Typography>
                            <Divider className="mb-2" />
                            <Box className="flex p-2">
                                <BoxSection>
                                    <Typography fontWeight={600} fontSize={12}>
                                        Front Identity Card Image
                                    </Typography>
                                    <ImageRenderer
                                        src={sellerRequest?.identityCardFrontImage.path}
                                        className="h-40 w-40 object-cover"
                                        alt="Front Identity Card"
                                    />
                                </BoxSection>
                                <BoxSection>
                                    <Typography fontWeight={600} fontSize={12}>
                                        Back Identity Card Image
                                    </Typography>
                                    <ImageRenderer
                                        src={sellerRequest?.identityCardBackImage.path}
                                        alt="Back Identity Card"
                                        className="h-40 w-40 object-cover"
                                    />
                                </BoxSection>
                                {sellerRequest?.businessLicenseImages.length > 0 &&
                                    sellerRequest.legalType != LegalType.INDIVIDUAL && (
                                        <BoxSection>
                                            <Typography fontWeight={600} fontSize={12}>
                                                Business License Images
                                            </Typography>
                                            {sellerRequest?.businessLicenseImages.map((image, index) => (
                                                <ImageRenderer
                                                    key={index}
                                                    src={image.path}
                                                    alt={`Business License ${index + 1}`}
                                                    className="h-40 w-40 object-cover"
                                                />
                                            ))}
                                        </BoxSection>
                                    )}
                            </Box>
                        </BoxSection>
                    </Box>
                </LoadingContainer>
            </Dialog.Body>
            <Dialog.Action>
                <Box className="flex justify-end space-x-2">
                    <Button variant="outlined" color="inherit" onClick={onClose}>
                        Close
                    </Button>
                </Box>
            </Dialog.Action>
        </Dialog>
    );
};

export default SellerApprovalDetailDialog;
