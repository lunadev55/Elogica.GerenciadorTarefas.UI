export interface ApiResponse {
  success: boolean;
  message: string;
  errors: string[];
}

export interface PaginatedData<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ApiResponseWithData<T> {
  data: T;
  success: boolean;
  message: string;
  errors: string[];
}

export interface ApiWrappedResponse<T> {
  data: ApiResponseWithData<PaginatedData<T>>;
  success: boolean;
  message: string;
  errors: string[];
}