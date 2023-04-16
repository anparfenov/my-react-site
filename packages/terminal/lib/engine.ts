import { CdConfig } from '../commands/cd';
import { LsConfig } from '../commands/ls';

type Command = (args: string[], config: any) => Promise<string[] | null | void>

const commands = {
    cd: (args: string[], config: CdConfig) => {
        return import('../commands/cd').then((module) => {
            const { cd } = module;
            const res = cd(args, config);
            return res;
        })
    },
    ls: (args: string[], config: LsConfig) => {
        return import('../commands/ls').then((module) => {
            const { ls } = module;
            const res = ls(args, config);
            return res;
        })
    },
}

type CommandName = keyof typeof commands;

type UserInput = {
    command: Command;
    args: string[];
}

export type Ok<TResult> = {
	readonly kind: 'ok';
	readonly result: TResult;
}

export type Failure<TError> = {
	readonly kind: 'failure';
	readonly error: TError;
}

export type Result<TError, TResult> = Failure<TError> | Ok<TResult>;

// TODO move to other file
export const makeOk = <TError, TData>(data: TData): Result<TError, TData> => ({ result: data, kind: 'ok' });
export const makeError = <TError, TData>(error: TError): Result<TError, TData> => ({ error, kind: 'failure' });

export const isOk = <TData>(result: Result<unknown, TData>): result is Ok<TData> => result.kind === 'ok';
export const isError = <TError>(result: Result<TError, unknown>): result is Failure<TError> => result.kind === 'failure';


// Maybe i can do this check another way
function isCommand(command: string): command is CommandName {
    return command === 'ls' || command === 'cd';
}

function parseUserInput(input: string): Result<Error, UserInput> {
    const [commandName, ...args] = input.split(' ');
    if (isCommand(commandName)) {
        return makeOk({
            command: commands[commandName],
            args,
        })
    }
    const error = new Error('no such command');
    return makeError(error);
}

export async function execute(input: string, config: any): Promise<string[]> {
    const userInput = parseUserInput(input);

    if (isOk(userInput)) {
        const { command, args } = userInput.result;
        const res = await command(args, config);
        if (Array.isArray(res)) {
            return res;
        } else {
            return [''];
        }
    }
    // TODO handle error
    return ['']
}

/**
 * Process:
 * user input -> parse input -> call apropriate executable -> ... -> profit
 * 
 * Initialization:
 * provide executable methods -> make config -> use config
 */

type ExecutableMethods = {
    push: () => void,
    list: () => void,
}

type Config = {
    methods: ExecutableMethods;
}

export function makeTestConfig(): Config {
    return {
        methods: {
            push: () => {
                return 'push!!!';
            },
            list: () => {
                return ['first', 'second'];
            }
        }
    }
}

export function makeConfig(executableMethods: ExecutableMethods): Config {
    return {
        methods: executableMethods,
    }
}