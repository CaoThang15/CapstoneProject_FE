import axios from "axios";

// reference: https://vapi-vnappmob.readthedocs.io/en/latest/province.html

const VN_PUBLIC_API_BASE_URL = "https://provinces.open-api.vn/api/v2";

export const vnPublicApiAxios = axios.create({
    baseURL: VN_PUBLIC_API_BASE_URL,
});
