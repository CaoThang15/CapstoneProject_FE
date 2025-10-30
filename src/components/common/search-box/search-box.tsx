import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useDebounce } from "~/hooks";

interface SearchBoxProps extends Omit<TextFieldProps, "onChange"> {
    onChange: (value: string) => void;
    delay?: number;
    iconPosition?: "start" | "end";
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange, delay = 500, iconPosition = "end", ...props }) => {
    const [searchValue, setSearchValue] = React.useState<string>("");
    const debouncedSearchValue = useDebounce(searchValue, delay);

    React.useEffect(() => {
        onChange(debouncedSearchValue.trim());
    }, [debouncedSearchValue, onChange]);

    return (
        <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            slotProps={{
                input: {
                    startAdornment:
                        iconPosition === "start" ? (
                            <IconButton size="small" className="rounded-full">
                                <SearchOutlined />
                            </IconButton>
                        ) : undefined,
                    endAdornment:
                        iconPosition === "end" ? (
                            <IconButton size="small" className="rounded-full">
                                <SearchOutlined />
                            </IconButton>
                        ) : undefined,
                    size: "small",
                    className: "rounded-2xl bg-white ps-2",
                },
            }}
            {...props}
        />
    );
};

export default SearchBox;
