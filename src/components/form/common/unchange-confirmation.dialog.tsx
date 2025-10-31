import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface Props {
    open: boolean;
    handleClose: () => void;
    handleProceed: () => void;
}
export const UnchangeConfirmationDiaglog: React.FC<Props> = ({ handleClose, handleProceed, open }) => (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Unsaved changes</DialogTitle>
        <DialogContent>
            <DialogContentText>You have unsaved changes. Are you sure you want to continue?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="inherit">
                Cancel
            </Button>
            <Button onClick={handleProceed} color="primary" autoFocus>
                Continue
            </Button>
        </DialogActions>
    </Dialog>
);
