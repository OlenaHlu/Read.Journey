export type BooksResponse = {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type BooksState = {
  books: Book[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
};
