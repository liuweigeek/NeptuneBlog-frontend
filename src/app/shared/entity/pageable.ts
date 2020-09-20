export interface Pageable<T> {

    number: number;

    size: number;

    content?: T[];

    empty: boolean;

    first: boolean;

    last: boolean;

    numberOfElements: number;

    totalPages: number;

    totalElements: number;
}
