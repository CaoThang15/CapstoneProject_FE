import { InfiniteData } from "@tanstack/react-query";
import { IBaseApiResponse, IPagination } from "~/libs/axios/types";

/**
 * Flattens paginated InfiniteData<IBaseApiResponse<IPagination<T>>>
 * into a single array of type T[].
 */
export const transformInfiniteData = <T>(data: InfiniteData<IBaseApiResponse<IPagination<T>>>): T[] => {
    console.log(data.pages.flatMap((page) => page.data.items));
    return data.pages.flatMap((page) => page.data.items);
};
