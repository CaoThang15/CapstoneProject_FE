import { Stack } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { LoadingContainer } from "~/components/common";
import FormItem from "~/components/form/form-item";
import { toBaseOption } from "~/components/form/utils";
import { Category } from "~/entities";
import { useQueryCategories } from "~/services/categories/hooks/queries";
import { SellerOnboardingFormValues } from "./types";

const StoreDetailsStep: React.FC = () => {
    const { data: listCategories, isLoading } = useQueryCategories();
    const form = useFormContext<SellerOnboardingFormValues>();

    const primaryCategoryId = form.watch("primaryCategoryId");

    React.useEffect(() => {
        if (!listCategories || !primaryCategoryId) return;

        const selectedCategory = listCategories.find((c) => c.id === primaryCategoryId);
        if (selectedCategory) {
            form.setValue("primaryCategoryName", selectedCategory.name);
        }
    }, [primaryCategoryId, listCategories]);

    return (
        <LoadingContainer isLoading={isLoading}>
            <Stack spacing={2}>
                <FormItem render="text-input" name="storeName" required label={"Tên cửa hàng"} />
                <FormItem
                    render="select"
                    name="primaryCategoryId"
                    required
                    label={"Danh mục chính"}
                    options={toBaseOption<Category>(listCategories, { label: "name", value: "id" })}
                />
                {/* <FormItem
                    render="autocomplete"
                    name="secondaryCategoryIds"
                    label={"Danh mục phụ"}
                    options={toBaseOption<Category>(
                        listCategories.filter(
                            (c) => ![primaryCategoryId, ...secondaryCategoryIds].includes(c.id),
                        ),
                        { label: "name", value: "id" },
                    )}
                /> */}
                <FormItem render="text-area" name="storeDescription" required label={"Mô tả cửa hàng"} />
            </Stack>
        </LoadingContainer>
    );
};

export default StoreDetailsStep;
