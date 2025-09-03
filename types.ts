export type DuckTheme = {
    colors: Record<string, Record<string, string>>;
    spacing: Record<string, number>;
    radius: Record<string, number>;
    shadow: Record<string, string>;
};

export type Config = {
    include: string[];
    theme: DuckTheme;
};
