import axios from "axios";
import { appConfig } from "~/configs/config";
import { TokenRefresher } from "./handler/token.refresher";

export const axiosInstance = axios.create({
    baseURL: appConfig.baseUrl,
    withCredentials: true,
    paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((val) => searchParams.append(key, val));
            } else if (value !== undefined && value !== null) {
                searchParams.append(key, value);
            }
        });
        return searchParams.toString();
    },
});

export const tokenRefresher = new TokenRefresher(axiosInstance);
tokenRefresher.setupInterceptor();
