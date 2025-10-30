import { toast } from "react-toastify";

export function success(message: string) {
    toast.success(message);
}

export function error(message: string) {
    toast.error(message);
}

export function warning(message: string) {
    toast.warning(message);
}

export function info(message: string) {
    toast.info(message);
}
