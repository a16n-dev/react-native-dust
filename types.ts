export type DuckTheme = {
    colors: Record<string, Record<string, string>>;
    spacing: Record<string, number>;
    radius: Record<string, number>;
    shadow: Record<string, string>;
    [key: string]: any
};

export type Config = {
    include: string[];
    theme: Record<string, DuckTheme>;
};
