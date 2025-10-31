import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import i18n from "~/configs/i18n";
import { showToast } from "~/utils";
import { authenticationApi } from "../infras/authentication.api";
import { ResetPasswordRequest } from "../infras";

export const useMutationResetPassword = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (payload: ResetPasswordRequest) => authenticationApi.resetPassword(payload),
        onSuccess: (res) => {
            return res;
        },
        onError: () => {
            showToast.error(t(i18n.translationKey.passwordConfirmFailed));
        },
    });
};
