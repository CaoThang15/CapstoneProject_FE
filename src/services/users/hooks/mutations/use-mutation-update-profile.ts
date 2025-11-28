import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { UpdateProfileRequest, userApis } from "../../infras";

export function useMutationUpdateProfile() {
    return useMutation({
        mutationKey: [QueryKey.USER.UPDATE_PROFILE],
        mutationFn: async (request: UpdateProfileRequest) => {
            const response = await userApis.updateProfile(request);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
