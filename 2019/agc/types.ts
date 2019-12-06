export interface OpArgs {
    memory: number[],
    params: number[],
    paramModes?: Array<number>,
    ip?: number
}

export interface Op {
    name: string;
    length: number;
    run: (args: OpArgs) => number[] | number;
    output?: boolean;
    input?: boolean;
    jmp?: boolean;
    halt?: boolean;
}
