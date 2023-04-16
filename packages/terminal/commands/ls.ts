export type LsConfig = {
    list: (path?: string) => string[];
}

export function ls(args: string[], config: LsConfig) {
    const [path] = args;
    return config.list(path);
}