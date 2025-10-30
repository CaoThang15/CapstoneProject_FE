import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Category } from "~/entities";

interface Props {
    category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/category/${category.slug ?? category.name.toLowerCase()}`);
    };

    return (
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
            onClick={handleNavigate}
            endIcon={<ChevronRight />}
        >
            <Stack direction="row" spacing={1.5} alignItems="center" flex={1}>
                <Box
                    sx={{
                        width: 100,
                        height: 100,
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
            </Stack>
        </Button>
    );
};

export default CategoryCard;
