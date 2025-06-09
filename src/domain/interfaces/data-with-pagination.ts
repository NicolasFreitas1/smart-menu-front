export interface DataWithPagination<T> {
  data: T[];
  amount: number;
  totalPages: number;
  actualPage: number;
  perPage: number;
}
