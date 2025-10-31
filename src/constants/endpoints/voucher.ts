const voucherEndpointPrefix = "/vouchers";

export const voucherEndpoints = {
    applyVoucher: `${voucherEndpointPrefix}/apply`,
    getVoucherByCode: (code: string) => `${voucherEndpointPrefix}/code/${code}`,
    getVouchers: `${voucherEndpointPrefix}`,
    createVoucher: `${voucherEndpointPrefix}`,
    updateVoucher: (voucherId: number) => `${voucherEndpointPrefix}/${voucherId}`,
    deleteVoucher: (voucherId: number) => `${voucherEndpointPrefix}/${voucherId}`,
    getVoucherById: (voucherId: number) => `${voucherEndpointPrefix}/${voucherId}`,
    getActiveVouchers: `${voucherEndpointPrefix}/active`,
    getMyVouchers: `${voucherEndpointPrefix}/my-vouchers`,
    assignVoucher: `${voucherEndpointPrefix}/assign`,
    removeAssignVoucher: (voucherId: number) => `${voucherEndpointPrefix}/assign/${voucherId}`,
    validateVoucher: `${voucherEndpointPrefix}/validate`,
};
