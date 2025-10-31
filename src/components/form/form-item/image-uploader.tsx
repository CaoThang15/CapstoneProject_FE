import { Delete, UploadFile } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Accept, ErrorCode, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageRenderer } from "~/components/common";
import i18n from "~/configs/i18n";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { showToast } from "~/utils";
import { ControllerWrapper, FormErrorMessage } from "../common";
import { BaseFormItemProps } from "../types/form-item";

export type ImageUploaderFormItemProps = BaseFormItemProps & {
    readOnly?: boolean;
    accept?: Accept;
    maxFileSize?: number;
    renderFile?: (file: UploadedFile) => React.ReactNode;
    onUpload: (file: File) => Promise<UploadedFile>;
    onDelete: (file: UploadedFile) => Promise<void>;
};

const DefaultFileUpload: React.FC<{ file: UploadedFile }> = ({ file }) => (
    <ImageRenderer
        src={file.imageUrl}
        alt={file.fileName}
        className="h-full w-[200px] cursor-pointer rounded-xl object-cover"
    />
);

export const ImageUploaderFormItem: React.FC<ImageUploaderFormItemProps> = ({
    name,
    defaultValue,
    label,
    accept,
    maxFileSize = 5,
    required,
    readOnly = false,
    disabled,
    renderFile,
    onUpload,
    onDelete,
}) => {
    const { t } = useTranslation();
    const { setValue } = useFormContext();

    const onDrop = React.useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;
            const uploaded = await onUpload(acceptedFiles[0]);
            setValue(name, uploaded, { shouldValidate: true, shouldDirty: true });
        },
        [name, setValue, onUpload],
    );

    const handleDelete = async (file: UploadedFile) => {
        await onDelete(file);
        setValue(name, null, { shouldValidate: true, shouldDirty: true });
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        onDropRejected: (rejections) => {
            rejections.forEach((r) => {
                switch (r.errors[0].code) {
                    case ErrorCode.FileTooLarge:
                        showToast.error(
                            t(i18n.translationKey.fileSizeExceedsLimit, {
                                file_name: r.file.name,
                                file_size: maxFileSize,
                            }),
                        );
                        break;
                    case ErrorCode.FileInvalidType:
                        showToast.error(
                            t(i18n.translationKey.invalidFileFormat, {
                                file_name: r.file.name,
                            }),
                        );
                        break;
                }
            });
        },
        multiple: false,
        maxFiles: 1,
        accept,
        disabled,
    });

    return (
        <ControllerWrapper
            name={name}
            required={required}
            defaultValue={defaultValue ?? null}
            render={({ field, error }) => {
                const file = field.value as UploadedFile | null;

                return (
                    <Box className="h-full w-full" {...getRootProps()}>
                        {!readOnly && <input {...getInputProps()} style={{ display: "none" }} />}

                        <Box
                            className={`group relative mt-2 flex h-full w-[200px] items-center justify-center rounded-2xl border ${
                                readOnly
                                    ? "cursor-default border-gray-200"
                                    : "cursor-pointer border-dashed border-gray-300 transition hover:bg-gray-50"
                            }`}
                            onClick={(e) => {
                                if (readOnly) return;
                                e.stopPropagation();
                                if (!file) open();
                            }}
                        >
                            {file ? (
                                <>
                                    {renderFile ? renderFile(file) : <DefaultFileUpload file={file} />}

                                    {/* Show delete button only if editable */}
                                    {!readOnly && (
                                        <Box className="absolute inset-0 flex items-start justify-end opacity-0 transition-opacity group-hover:opacity-100">
                                            <IconButton
                                                size="small"
                                                className="m-1 bg-white/80 hover:bg-white"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(file);
                                                }}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </>
                            ) : (
                                !readOnly && (
                                    <>
                                        <UploadFile />
                                        <Typography variant="body2" color="textSecondary" mt={1}>
                                            Upload image
                                        </Typography>
                                    </>
                                )
                            )}
                        </Box>

                        <FormErrorMessage errorMessage={error} label={label} />
                    </Box>
                );
            }}
        />
    );
};
