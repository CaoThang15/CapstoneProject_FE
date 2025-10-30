import { toast, ToastContent } from "react-toastify";

// export function success(message: string) {
//     toast.success(message);
// }

export function success(content: ToastContent) {
    toast.success(content);
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
