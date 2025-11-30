import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { Dialog } from "~/components/common/dialog";
import { IBaseDialogProps } from "~/components/common/dialog/types";
import DynamicForm from "~/components/form/dynamic-form";
import FormItem from "~/components/form/form-item";
import { useForm } from "~/components/form/hooks/use-form";
import { CloudinaryFolder } from "~/constants/enums";
import { useMutationUpdateCategory } from "~/services/categories/hooks/mutations";
import { useQueryCategoryById } from "~/services/categories/hooks/queries";
import { useMutationDeleteFile, useMutationUploadFile } from "~/services/public-api/upload-file/hooks/mutation";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { showToast } from "~/utils";
import { IEditCategoryFormValues } from "./types";

interface Props extends IBaseDialogProps {
    categoryId: number;
}

const EditCategoryDialog: React.FC<Props> = ({ onClose, open, categoryId }) => {
    const form = useForm<IEditCategoryFormValues>();
    const { data: category } = useQueryCategoryById({ categoryId: categoryId.toString() });

    const { mutateAsync: uploadFile } = useMutationUploadFile();
    const { mutateAsync: deleteFile } = useMutationDeleteFile();
    const { mutateAsync: updateCategory, isPending: isUpdatingCategory } = useMutationUpdateCategory();

    const onSubmit = async (values: IEditCategoryFormValues) => {
        await updateCategory({
            id: categoryId,
            name: values.name,
            thumbnail: values.thumbnail
                ? { name: values.thumbnail.fileName, path: values.thumbnail.imageUrl }
                : undefined,
        });
        showToast.success("Cập nhật danh mục thành công");
        onClose();
    };

    React.useEffect(() => {
        if (category) {
            form.setValue("name", category.name);
            form.setValue(
                "thumbnail",
                category.thumbnail
                    ? {
                          fileName: category.thumbnail.name,
                          id: category.thumbnail.path,
                          imageUrl: category.thumbnail.path,
                      }
                    : undefined,
            );
        }
    }, [category]);

    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header title="Create New Category" onClose={onClose} />
            <DynamicForm form={form} onSubmit={onSubmit}>
                <Dialog.Body>
                    <Stack className="p-4" spacing={2}>
                        <FormItem render="text-input" name="name" required label="Tên danh mục" />
                        <FormItem
                            render="image-uploader"
                            name="thumbnail"
                            label="Thumbnail"
                            onDelete={async () => {}}
                            onUpload={async (file) => {
                                const response = await uploadFile({
                                    file,
                                    folder: CloudinaryFolder.CATEGORY,
                                });

                                return {
                                    fileName: file.name,
                                    id: response.imageUrl,
                                    imageUrl: response.imageUrl,
                                } as UploadedFile;
                            }}
                        />
                    </Stack>
                </Dialog.Body>
                <Dialog.Action>
                    <Box className="flex justify-end space-x-2">
                        <Button className="" variant="outlined" color="inherit" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={isUpdatingCategory}
                            loadingPosition="start"
                        >
                            Update
                        </Button>
                    </Box>
                </Dialog.Action>
            </DynamicForm>
        </Dialog>
    );
};

export default EditCategoryDialog;
