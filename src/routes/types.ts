type RouteParams = Record<string, string | undefined>;

export interface SlugPathParams extends RouteParams {
    slug?: string;
}
