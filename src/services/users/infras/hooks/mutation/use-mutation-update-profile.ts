import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { userApis } from "../..";
import { UpdateProfileRequest } from "../../types";

export function useMutationUpdateProfile() {
    return useMutation({
        mutationKey: [QueryKey.UPLOAD_FILE.UPLOAD_FILE],
        mutationFn: async (request: UpdateProfileRequest) => {
            const response = await userApis.updateProfile(request);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
