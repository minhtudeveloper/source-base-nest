export interface Paginate {
  current: number;
  pageSize: number;
  total: number;
}

export interface PaginateData<T> {
  data: T[];
  pagination: Paginate
}