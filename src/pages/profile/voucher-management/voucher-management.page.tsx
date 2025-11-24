import { Box, Stack } from "@mui/material";
import React from "react";
import { BoxSection, LoadingContainer } from "~/components/common";
import { VoucherCard } from "~/components/common/voucher";
import { useAuth } from "~/contexts/auth.context";
import { useMutationSaveVoucher } from "~/services/voucher/hooks/mutation";
import { useQueryGetActiveVoucher, useQueryGetMyVoucher } from "~/services/voucher/hooks/queries";
import { showToast } from "~/utils";

const VoucherManagementPage: React.FC = () => {
    const { user } = useAuth();
    const { data: myVoucher, isLoading: isLoadingMyVoucher } = useQueryGetMyVoucher();
    const { data: activeVouchers, isLoading: isLoadingActiveVouchers } = useQueryGetActiveVoucher();
    const { mutateAsync: saveVoucher, isPending: isLoadingSaveVoucher } = useMutationSaveVoucher();

    const mySetVouchersId = React.useMemo(() => {
        if (isLoadingMyVoucher || !myVoucher) return [];
        return myVoucher.map((voucher) => voucher.id);
    }, [myVoucher, isLoadingMyVoucher]);

    const handleSaveVoucher = async (voucherId: number) => {
        if (!user) return;
        await saveVoucher({ userId: user.id, voucherId });
        showToast.success("Lưu voucher thành công");
    };

    return (
        <LoadingContainer isLoading={isLoadingMyVoucher || isLoadingActiveVouchers}>
            <BoxSection>
                <Stack spacing={2}>
                    <h1 className="text-2xl font-bold">Quản lý Voucher</h1>
                    <Box className="-mx-2 flex flex-wrap">
                        {activeVouchers?.map((voucher) => {
                            const isOwned = mySetVouchersId.includes(voucher.id);
                            return (
                                <Box className="mb-4 w-1/2 px-2">
                                    <VoucherCard
                                        voucher={voucher}
                                        isOwned={isOwned}
                                        isSaving={isLoadingSaveVoucher}
                                        onSaveVoucher={handleSaveVoucher}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                </Stack>
            </BoxSection>
        </LoadingContainer>
    );
};

export default VoucherManagementPage;
