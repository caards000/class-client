export type PageType<T> = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: T[];
}

export const EmptyPage: PageType<any> = {
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 0,
  content: [],
}