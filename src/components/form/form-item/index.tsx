import { Stack } from "@mui/material";
import { FormLabel } from "../common";
import { FormItemProps } from "../types/form-item";
import { AutocompleteFieldFormItem } from "./auto-complete";
import { CheckboxFormItem } from "./checkbox";
import { CheckboxGroupFormItem } from "./checkbox-group";
import { DatePickerFormItem } from "./date-picker";
import { DateRangePickerFormItem } from "./date-range-picker";
import { DateTimePickerFormItem } from "./date-time-picker";
import { FileUploadFormItem } from "./file-upload";
import { InputNumberFormItem } from "./input-number";
import OtpFormItem from "./otp-code";
import { RadioGroupFormItem } from "./radio-group";
import { SelectFieldFormItem } from "./select";
import { AgGridDropdownFormItem } from "./select-data-grid";
import { SwitchFormItem } from "./switch";
import { TextAreaFormItem } from "./text-area";
import { TextFieldFormItem } from "./text-field";
import { TextFieldNoClearFormItem } from "./text-field-no-clear";

const FormItem: React.FC<FormItemProps> = (props) => {
    // TODO: move the controller wrapper logic to a common place

    const getFormComponent = () => {
        switch (props.render) {
            case "text-input":
                return <TextFieldFormItem {...props} label={""} />;
            case "select":
                return <SelectFieldFormItem {...props} label={""} />;
            case "data-grid":
                return <AgGridDropdownFormItem {...props} label={""} />;
            case "checkbox":
                return <CheckboxFormItem {...props} label={""} />;
            case "checkbox-group":
                return <CheckboxGroupFormItem {...props} label={""} />;
            case "date-picker":
                return <DatePickerFormItem {...props} label={""} />;
            case "switch":
                return <SwitchFormItem {...props} label={""} />;
            case "radio-group":
                return <RadioGroupFormItem {...props} label={""} />;
            case "text-area":
                return <TextAreaFormItem {...props} label={""} />;
            case "input-number":
                return <InputNumberFormItem {...props} label={""} />;
            case "date-range-picker":
                return <DateRangePickerFormItem {...props} label={""} />;
            case "date-time-picker":
                return <DateTimePickerFormItem {...props} label={""} />;
            case "autocomplete":
                return <AutocompleteFieldFormItem {...props} label={""} />;
            case "text-input-no-clear":
                return <TextFieldNoClearFormItem {...props} label={""} />;
            case "file-upload":
                return <FileUploadFormItem {...props} label={""} />;
            case "otp-code":
                return <OtpFormItem {...props} label={""} />;
            default:
                return null;
        }
    };

    return (
        <Stack direction={"column"} spacing={1} alignItems={"start"} className="mb-2">
            <FormLabel label={props.label} required={props.required} />
            {getFormComponent()}
        </Stack>
    );
};

export default FormItem;
