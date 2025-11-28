import { Box, Stack } from "@mui/material";
import React from "react";
import { ProvinceFormItem, WardFormItem } from "~/components/form/custom";
import FormItem from "~/components/form/form-item";
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from "~/components/form/validation/pattern";

const AccountInfoStep: React.FC = () => {
    return (
        <Stack>
            <FormItem render="text-input" name="fullName" required label={"Tên người bán"} />
            <FormItem
                render="text-input"
                name="email"
                required
                pattern={EMAIL_PATTERN}
                isEmail
                label={"Email"}
                disabled
            />
            <FormItem
                render="text-input"
                name="phoneNumber"
                required
                pattern={PHONE_NUMBER_PATTERN}
                label={"Số điện thoại"}
                disabled
            />
            <Box>
                <Stack direction={"row"} spacing={2} className="w-full">
                    <Box className="w-1/2">
                        <ProvinceFormItem fullWidth required />
                    </Box>
                    <Box className="w-1/2">
                        <WardFormItem fullWidth required />
                    </Box>
                </Stack>
                <FormItem render="text-input" name="businessAddress" required label={"Địa chỉ cụ thể"} />
            </Box>
        </Stack>
    );
};

export default AccountInfoStep;
