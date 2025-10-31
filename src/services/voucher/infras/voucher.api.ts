import { endpoints } from "~/constants/endpoints";
import { Voucher } from "~/entities";
import { callApi } from "~/libs/axios/request";
import { HttpMethod } from "~/libs/axios/types";
import { ValidateVoucherResponse } from "./types";

const applyVoucher = async (voucherId: number) => {
    return await callApi({
        method: HttpMethod.POST,
        url: endpoints.vouchers.applyVoucher,
        data: { voucherId },
    });
};

const getVoucherByCode = async (code: string) => {
    return await callApi<Voucher>({
        method: HttpMethod.GET,
        url: endpoints.vouchers.getVoucherByCode(code),
    });
};

const getVouchers = async () => {
    return await callApi<Voucher[]>({
        method: HttpMethod.GET,
        url: endpoints.vouchers.getVouchers,
    });
};

const createVoucher = async () => {
    return await callApi<Voucher>({
        method: HttpMethod.POST,
        url: endpoints.vouchers.createVoucher,
        data: null,
    });
};

const updateVoucher = async (voucherId: number, data: Partial<Voucher>) => {
    return await callApi<Voucher>({
        method: HttpMethod.PUT,
        url: endpoints.vouchers.updateVoucher(voucherId),
        data,
    });
};

const deleteVoucher = async (voucherId: number) => {
    return await callApi({
        method: HttpMethod.DELETE,
        url: endpoints.vouchers.deleteVoucher(voucherId),
    });
};

const getVoucherById = async (voucherId: number) => {
    return await callApi<Voucher>({
        method: HttpMethod.GET,
        url: endpoints.vouchers.getVoucherById(voucherId),
    });
};

const getActiveVouchers = async () => {
    return await callApi<Voucher[]>({
        method: HttpMethod.GET,
        url: endpoints.vouchers.getActiveVouchers,
    });
};

const getMyVouchers = async () => {
    return await callApi<Voucher[]>({
        method: HttpMethod.GET,
        url: endpoints.vouchers.getMyVouchers,
    });
};

const assignVoucher = async (userId: number, voucherId: number) => {
    return await callApi({
        method: HttpMethod.POST,
        url: endpoints.vouchers.assignVoucher,
        data: { userId, voucherId },
    });
};

const removeAssignVoucher = async (_: number, voucherId: number) => {
    return await callApi({
        method: HttpMethod.DELETE,
        url: endpoints.vouchers.removeAssignVoucher(voucherId),
    });
};

const validateVoucher = async (voucherId: number) => {
    return await callApi<ValidateVoucherResponse>({
        method: HttpMethod.POST,
        url: endpoints.vouchers.validateVoucher,
        data: { voucherId },
    });
};

export const voucherApi = {
    applyVoucher,
    getVoucherByCode,
    getVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getVoucherById,
    getActiveVouchers,
    getMyVouchers,
    assignVoucher,
    removeAssignVoucher,
    validateVoucher,
};
