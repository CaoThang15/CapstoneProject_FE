import { Search } from "@mui/icons-material";
import {
    Box,
    Button,
    InputAdornment,
    ListItemIcon,
    MenuItem,
    Radio,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useQueryCategories } from "~/services/categories/hooks/queries";

export const HeroSection: React.FC = () => {
    const [category, setCategory] = React.useState<string>("");
    const [query, setQuery] = React.useState("");
    const { data: categories } = useQueryCategories();

    const handleSearch = () => {
        window.location.href = `/category${category ? `/${category}` : ""}?query=${query}`;
    };
    return (
        <Box>
            <Typography variant="h4" className="font-bold" textAlign="center">
                Smarket - Nơi mua sắm đáng tin cậy
            </Typography>
            <Box className="mt-12 flex justify-center">
                <Box className="flex w-3/4 items-center justify-center space-x-2 rounded-xl bg-white px-2 py-3">
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        renderValue={(selected) => {
                            const found = categories.find((x) => x.slug.toString() == selected);
                            return (
                                <Typography
                                    noWrap
                                    sx={{
                                        maxWidth: 100,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    className="font-medium"
                                >
                                    {found?.name ?? "Danh mục"}
                                </Typography>
                            );
                        }}
                        sx={{
                            border: "0",
                            borderRadius: "4px 0 0 4px",
                            paddingLeft: 2,
                            height: "100%",
                            "& .MuiSelect-select": {
                                padding: "8px 12px",
                                fontWeight: 500,
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "0",
                                borderRight: "1px solid lightgray",
                            },
                        }}
                    >
                        <MenuItem
                            value={""}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span className="font-medium">Tất cả danh mục</span>

                            <ListItemIcon sx={{ minWidth: 0 }}>
                                <Radio checked={category == ""} disableRipple color="primary" />
                            </ListItemIcon>
                        </MenuItem>
                        {categories.map((item) => (
                            <MenuItem
                                key={item.name}
                                value={item.id}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span className="font-medium">{item.name}</span>
                                <ListItemIcon sx={{ minWidth: 0 }}>
                                    <Radio checked={category == item.slug.toString()} disableRipple color="primary" />
                                </ListItemIcon>
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        size="small"
                        className="flex-1"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        slotProps={{
                            input: {
                                sx: {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "0",
                                    },
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: "gray" }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn..."
                    />
                    <Button variant="contained" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
