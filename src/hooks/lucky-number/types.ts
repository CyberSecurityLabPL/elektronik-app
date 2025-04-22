export interface LuckyNumberData {
    data: {
        documentId: string;
        value: string | number;
        createdAt: string | Date;
        updatedAt: string | Date;
        publishedAt: string | Date;
    };
    meta: Record<string, unknown>;
}