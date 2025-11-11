import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { getAIChatbotResponse } from "../../infras";

export function useMutationGenerateChatboxMessage() {
    return useMutation({
        mutationKey: [QueryKey.MESSAGE.GENERATE_CHATBOX_MESSAGE],
        mutationFn: async (input: string) => {
            const response = await getAIChatbotResponse(input);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
