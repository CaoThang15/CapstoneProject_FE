import axios, { AxiosError } from "axios";
import { IBaseApiResponse, IProblemDetailErrorResponse } from "../types";
import i18n from "~/configs/i18n";

export const getAxiosErrorMessageKey = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<IBaseApiResponse<unknown> | IProblemDetailErrorResponse>;
        if (!axiosError.response) {
            return i18n.translationKey.somethingWentWrong;
        }

        const data = axiosError.response.data;

        // Case 1: IBaseApiResponse
        if ("message" in data && typeof data.message === "string") {
            return data.message;
        }

        // Case 2: ProblemDetailType
        if ("detail" in data && typeof data.detail === "string") {
            return data.detail;
        }

        if ("title" in data && typeof data.title === "string") {
            return data.title;
        }

        return i18n.translationKey.somethingWentWrong;
    }
    if (error instanceof Error && error.message) {
        return error.message;
    }

    return i18n.translationKey.somethingWentWrong;
};
