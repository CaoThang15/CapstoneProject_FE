const userEndpointPrefix = "/users";

export const usersEndpoints = {
    updateProfile: `${userEndpointPrefix}/update`,
    getAllUsers: `${userEndpointPrefix}/`,
    deleteUser: (id: number) => `${userEndpointPrefix}/${id}`,
};
