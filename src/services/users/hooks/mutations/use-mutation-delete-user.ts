import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { userApis } from "../../infras";

export function useMutationDeleteUser() {
    return useMutation({
        mutationKey: [QueryKey.USER.DELETE_USER],
        mutationFn: async (userId: number) => {
            const response = await userApis.deleteUser(userId);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
