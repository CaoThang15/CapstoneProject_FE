import { callApi } from "~/libs/axios/request";
import { HttpMethod } from "~/libs/axios/types";

export const getAIChatbotResponse = async (input: string) => {
    return await callApi<string>({
        url: "/ai/chatbot?input=" + encodeURIComponent(input),
        method: HttpMethod.POST,
        data: null,
    });
};
