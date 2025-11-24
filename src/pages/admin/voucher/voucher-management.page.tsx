import { Box, Stack } from "@mui/material";
import React from "react";
import { BoxSection, LoadingContainer } from "~/components/common";
import { VoucherCard } from "~/components/common/voucher";
import { useAuth } from "~/contexts/auth.context";
import { useMutationSaveVoucher } from "~/services/voucher/hooks/mutation";
import { useQueryGetAllVouchers } from "~/services/voucher/hooks/queries";
import { showToast } from "~/utils";

const AdminVoucherManagementPage: React.FC = () => {
    const { user } = useAuth();
    const { data: allVouchers, isLoading: isLoadingAllVouchers } = useQueryGetAllVouchers();
    const { mutateAsync: saveVoucher, isPending: isLoadingSaveVoucher } = useMutationSaveVoucher();

    const handleSaveVoucher = async (voucherId: number) => {
        if (!user) return;
        await saveVoucher({ userId: user.id, voucherId });
        showToast.success("Lưu voucher thành công");
    };

    return (
        <LoadingContainer isLoading={isLoadingAllVouchers}>
            <BoxSection>
                <Stack spacing={2}>
                    <h1 className="text-2xl font-bold">Quản lý Voucher</h1>
                    <Box className="-mx-2 flex flex-wrap">
                        {allVouchers?.map((voucher) => {
                            return (
                                <Box className="mb-4 w-1/2 px-2">
                                    <VoucherCard
                                        voucher={voucher}
                                        isOwned={true}
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

export default AdminVoucherManagementPage;
