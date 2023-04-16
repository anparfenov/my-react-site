export type CdConfig = {
    push: (url: string, as?: string, options?: object) => Promise<void>
}

/**
 * 
 * @param args 
 */
export function cd(args: string[], config: CdConfig) {
    // TODO: parse args
    const [path] = args;
    config.push(path);
}