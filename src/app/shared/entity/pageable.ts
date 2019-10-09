export interface Pageable<T> {
    current: number;
    size: number;
    total?: number;
    records?: T[];
}
