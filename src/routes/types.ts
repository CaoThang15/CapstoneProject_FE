type RouteParams = Record<string, string | undefined>;

export interface SlugPathParams extends RouteParams {
    slug?: string;
}

export interface IdPathParams extends RouteParams {
    id?: string;
}
