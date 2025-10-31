import { AddAPhotoOutlined, Delete, UploadFile, WallpaperOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { Accept, ErrorCode, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageRenderer, LoadingContainer } from "~/components/common";
import i18n from "~/configs/i18n";
import { UploadedFile } from "~/services/public-api/upload-file/infras";
import { showToast } from "~/utils";
import { ControllerWrapper, FormErrorMessage } from "../common";
import { BaseFormItemProps } from "../types/form-item";
import classNames from "classnames";

export type ImageUploaderFormItemProps = BaseFormItemProps & {
    readOnly?: boolean;
    accept?: Accept;
    maxFileSize?: number;
    maxFiles?: number;
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
    maxFiles = 1,
    required,
    readOnly = false,
    disabled,
    renderFile,
    onUpload,
    onDelete,
}) => {
    const [uploading, setUploading] = React.useState(false);
    const [deletingIds, setDeletingIds] = React.useState<Set<string>>(new Set());

    const { t } = useTranslation();
    const { setValue, getValues } = useFormContext();

    const onDrop = React.useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;
            setUploading(true);

            try {
                // Get the current value
                const currentValue = (getValues(name) as UploadedFile[] | UploadedFile | null) ?? [];
                const currentFiles = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];

                // Upload new files
                const newUploadedFiles: UploadedFile[] = [];
                for (const file of acceptedFiles.slice(0, maxFiles - currentFiles.length)) {
                    const uploaded = await onUpload(file);
                    newUploadedFiles.push(uploaded);
                }

                const updatedFiles = [...currentFiles, ...newUploadedFiles];
                setValue(name, maxFiles > 1 ? updatedFiles : (updatedFiles[0] ?? null), {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            } finally {
                setUploading(false);
            }
        },
        [name, setValue, onUpload, getValues, maxFiles],
    );

    const handleDelete = async (file: UploadedFile, currentValue: UploadedFile[] | UploadedFile | null) => {
        if (deletingIds.has(file.id)) return;
        setDeletingIds((prev) => new Set(prev).add(file.id));

        try {
            await onDelete(file);
            if (Array.isArray(currentValue)) {
                const updated = currentValue.filter((f) => f.id !== file.id);
                setValue(name, updated, { shouldValidate: true, shouldDirty: true });
            } else {
                setValue(name, null, { shouldValidate: true, shouldDirty: true });
            }
        } finally {
            setDeletingIds((prev) => {
                const updated = new Set(prev);
                updated.delete(file.id);
                return updated;
            });
        }
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
        multiple: maxFiles > 1,
        maxFiles: maxFiles,
        accept,
        disabled: disabled || uploading,
    });

    return (
        <ControllerWrapper
            name={name}
            required={required}
            defaultValue={defaultValue ?? null}
            render={({ field, error }) => {
                const value = field.value as UploadedFile[] | UploadedFile | null;
                const files = maxFiles > 1 ? ((value as UploadedFile[]) ?? []) : value ? [value as UploadedFile] : [];
                const canUploadMore = !readOnly && files.length < maxFiles;

                return (
                    <Box className="h-full w-full">
                        <Box className="mt-2 flex flex-wrap gap-2">
                            {files.map((file) => {
                                const isDeleting = deletingIds.has(file.id);
                                return (
                                    <Box
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        key={file.id}
                                        className={classNames(
                                            `group relative flex h-[150px] w-[200px] items-center justify-center rounded-2xl border ${
                                                readOnly
                                                    ? "cursor-default border-gray-200"
                                                    : "cursor-pointer border-dashed border-gray-300 transition hover:bg-gray-50"
                                            }`,
                                        )}
                                    >
                                        <LoadingContainer isLoading={isDeleting}>
                                            {renderFile ? renderFile(file) : <DefaultFileUpload file={file} />}
                                        </LoadingContainer>
                                        {!readOnly && !isDeleting && (
                                            <Box className="absolute inset-0 flex items-start justify-end opacity-0 transition-opacity group-hover:opacity-100">
                                                <IconButton
                                                    size="small"
                                                    className="m-1 bg-white/80 hover:bg-white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(file, value);
                                                    }}
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}

                            {canUploadMore ? (
                                <Box {...getRootProps()}>
                                    {!readOnly && <input {...getInputProps()} style={{ display: "none" }} />}

                                    <Box
                                        className={classNames(
                                            "flex h-[150px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed transition hover:bg-gray-50",
                                            {
                                                "border-red-300": !error,
                                                "border-gray-300": !!error,
                                            },
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            open();
                                        }}
                                    >
                                        <LoadingContainer isLoading={uploading}>
                                            <Button
                                                variant="text"
                                                startIcon={<WallpaperOutlined />}
                                                color="inherit"
                                                className="bg-transparent"
                                                disableRipple
                                            >
                                                <Typography variant="body2" color="textSecondary">
                                                    Add
                                                </Typography>
                                            </Button>
                                        </LoadingContainer>
                                    </Box>
                                </Box>
                            ) : null}
                        </Box>

                        <FormErrorMessage errorMessage={error} label={label} />
                    </Box>
                );
            }}
        />
    );
};
