export interface LuckyNumberAttributes {
    value: string | number;
    date?: string;
}

export interface LuckyNumberData {
    data: {
        id?: string;
        attributes: LuckyNumberAttributes;
        type?: string;
    };
    meta?: Record<string, unknown>;
}