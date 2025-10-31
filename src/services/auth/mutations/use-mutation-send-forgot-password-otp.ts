import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import i18n from "~/configs/i18n";
import { showToast } from "~/utils";
import { authenticationApi } from "../infras/authentication.api";

export const useMutationSendForgotPasswordOtp = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (email: string) => authenticationApi.sendForgotPasswordOtp(email),
        onSuccess: (res) => {
            return res;
        },
        onError: () => {
            showToast.error(t(i18n.translationKey.passwordConfirmFailed));
        },
    });
};
