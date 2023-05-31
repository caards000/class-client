export type PageType<T> = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: T[];
}
