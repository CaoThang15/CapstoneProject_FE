export interface IBaseDialogProps {
    open: boolean;
    onClose: () => void;
}

export interface IFormDialogProps extends IBaseDialogProps {
    onSubmit?: (params?: Record<string, any>) => void;
}
