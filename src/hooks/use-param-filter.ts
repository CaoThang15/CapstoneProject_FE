import React from "react";
import { DEFAULT_PAGINATION_PARAMS } from "~/constants/pagination";

interface FilterParams {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    order?: string;
    search?: string;
    [k: string]: any;
}

const defaultParams = {
    page: DEFAULT_PAGINATION_PARAMS.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION_PARAMS.PAGE_SIZE,
};

interface FilterResponse {
    params: FilterParams;
    onChange: (params: Partial<FilterParams>) => void;
}

const useParamFilter = (initialFilter: FilterParams = defaultParams): FilterResponse => {
    const [params, setParams] = React.useState(initialFilter);

    const handleChange = React.useCallback((updatedValues: Partial<FilterParams>) => {
        setParams((prevValues) => ({ ...prevValues, ...updatedValues }));
    }, []);

    return {
        params,
        onChange: handleChange,
    };
};

export default useParamFilter;
