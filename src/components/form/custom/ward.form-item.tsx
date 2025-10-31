import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18n from "~/configs/i18n";
import { getWardsByProvince } from "~/services/vn-public-api";
import { TWard } from "~/services/vn-public-api/types";
import FormItem from "../form-item";
import { AutocompleteFieldFormItemProps } from "../form-item/auto-complete";
import { toBaseOption } from "../utils";

type WardFormItemProps = Omit<AutocompleteFieldFormItemProps, "render" | "name" | "options"> & {
    name?: string;
};

const WardFormItem: React.FC<WardFormItemProps> = ({ ...props }) => {
    const { t } = useTranslation();

    const form = useFormContext();
    const [wards, setWards] = React.useState<TWard[]>([]);

    const getWards = async () => {
        const selectedProvince = form.watch("provinceCode");

        if (!selectedProvince) {
            setWards([]);
            return;
        }

        try {
            const response = await getWardsByProvince(selectedProvince);
            setWards(response ?? []);
        } catch (error) {
            console.error("Failed to fetch districts:", error);
        }
    };

    React.useEffect(() => {
        getWards();
    }, [form.watch("provinceCode")]);

    return (
        <FormItem
            name={props.name ?? "ward"}
            label={t(i18n.translationKey.ward)}
            render="autocomplete"
            options={toBaseOption<TWard>(wards, {
                label: "name",
                value: "name",
            })}
            {...props}
        />
    );
};

export default WardFormItem;
