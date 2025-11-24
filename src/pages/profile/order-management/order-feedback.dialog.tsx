import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection } from "~/components/common";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { CloudinaryFolder } from "~/constants/enums";
import { useAuth } from "~/contexts/auth.context";
import { OrderDetail } from "~/entities";
import { PublishFeedbackRequest } from "~/services/feedbacks/infras";
import { useMutationPublishFeedback } from "~/services/feedbacks/hooks/mutations/use-mutation-publish-feedback";
import { useMutationDeleteFile, useMutationUploadFile } from "~/services/public-api/upload-file/hooks/mutation";
import { UploadedFile } from "~/services/public-api/upload-file/infras/types";
import { FeedbackFormData } from "./types";
import { showToast } from "~/utils";

interface OrderFeedbackDialogProps extends IBaseDialogProps {
    orderDetails: OrderDetail[];
}
export const OrderFeedbackDialog: React.FC<OrderFeedbackDialogProps> = ({ orderDetails, onClose, open }) => {
    const { user } = useAuth();
    const form = useForm<FeedbackFormData>({
        defaultValues: {
            feedbacks: orderDetails.map((od) => ({
                productId: od.productId,
                content: "",
                rate: 5,
            })),
        },
    });

    const { mutateAsync: uploadFile } = useMutationUploadFile();
    const { mutateAsync: deleteFile } = useMutationDeleteFile();
    const { mutateAsync: publishFeedback, isPending: isPublishing } = useMutationPublishFeedback();

    const handleSubmit = async (payload: FeedbackFormData) => {
        await Promise.all(
            payload.feedbacks.map(async (feedback) => {
                const request: PublishFeedbackRequest = {
                    content: feedback.content,
                    rate: feedback.rate,
                    productId: feedback.productId,
                    userId: user!.id,
                    sharedFile: feedback.sharedFile
                        ? {
                              name: feedback.sharedFile.fileName,
                              path: feedback.sharedFile.imageUrl,
                          }
                        : undefined,
                };

                await publishFeedback(request);
            }),
        );

        showToast.success("Feedback submitted successfully.");
        onClose();
    };

    return (
        <DynamicForm form={form} onSubmit={handleSubmit}>
            <Dialog open={open} onClose={onClose} fullWidth>
                <Dialog.Header title="Leave Feedback " />
                <Dialog.Body className="mt-3">
                    <Stack spacing={3}>
                        {orderDetails.map((orderDetail, index) => (
                            <BoxSection key={orderDetail.id}>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            src={orderDetail.productImagePath}
                                            variant="square"
                                            sx={{ width: 60, height: 60 }}
                                        />
                                        <Typography fontWeight={500}>{orderDetail.productName}</Typography>
                                    </Stack>
                                    <Box className="flex gap-5">
                                        <Typography variant="subtitle1" fontWeight={400}>
                                            Your Rating
                                        </Typography>
                                        <FormItem name={`feedbacks.${index}.rate`} render="rating" size="large" />
                                    </Box>
                                    <FormItem
                                        name={`feedbacks.${index}.content`}
                                        render="text-area"
                                        label={"How about your experiences ?"}
                                        placeholder="Write something about your experience..."
                                    />
                                    <FormItem
                                        render="image-uploader"
                                        label="Your image"
                                        name={`feedbacks.${index}.sharedFile`}
                                        onUpload={async (file) => {
                                            const response = await uploadFile({
                                                file,
                                                folder: CloudinaryFolder.FEEDBACK_IMAGES,
                                            });
                                            return {
                                                fileName: file.name,
                                                imageUrl: response.imageUrl,
                                                id: response.imageUrl,
                                            } as UploadedFile;
                                        }}
                                        onDelete={async (file) => {
                                            await deleteFile(file.imageUrl);
                                        }}
                                    />
                                </Stack>
                            </BoxSection>
                        ))}
                    </Stack>
                </Dialog.Body>
                <Divider />
                <Dialog.Action className="flex justify-end p-3">
                    <Button onClick={onClose} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={form.handleSubmit(handleSubmit)}
                        loading={isPublishing}
                        loadingPosition="start"
                        className="ml-3"
                    >
                        Submit
                    </Button>
                </Dialog.Action>
            </Dialog>
        </DynamicForm>
    );
};
