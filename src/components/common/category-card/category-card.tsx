import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Category } from "~/entities";

interface Props {
    category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => (
    <Button
        variant="outlined"
        color="inherit"
        fullWidth
        className="justify-start rounded-xl border-gray-200 bg-white normal-case"
        sx={{
            textAlign: "left",
            p: 1.2,
            "&:hover": { borderColor: "primary.main", backgroundColor: "primary.light" },
        }}
        endIcon={<ChevronRight />}
    >
        <Stack direction="row" spacing={1.5} alignItems="center" flex={1}>
            <Box
                sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                    bgcolor: "#fafafa",
                }}
            >
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
            </Box>
            <Stack spacing={0.2} flex={1}>
                <Typography className="text-sm font-semibold">{category.name}</Typography>
                <Typography className="text-xs text-gray-600">{100} items</Typography>
            </Stack>
            {/* {category.badge && (
                <Chip
                    label={cat.badge.label}
                    size="small"
                    variant="outlined"
                    sx={{
                        bgcolor: "grey.100",
                        fontSize: 11,
                        "& .MuiChip-label": { px: 1 },
                    }}
                />
            )} */}
        </Stack>
    </Button>
);

export default CategoryCard;
