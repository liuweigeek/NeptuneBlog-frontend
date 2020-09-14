export interface Pageable<T> {
    offset: number;
    limit: number;
    total?: number;
    records?: T[];
}
