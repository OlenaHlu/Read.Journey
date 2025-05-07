export type BooksState = {
  books: Book[];
  book: BookIdResponse;
  currentPage: number;
  perPage: number;
  totalPages: number;
  filtersLib: string;
  inputFilters: InputFilters;
  isLoading: boolean;
  error: string | null;
  favoriteBooks: Book[];
  readingBook: Book | null;
};

export type InputFilters = {
  title: string;
  author: string;
};

export type BooksResponse = {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type BookIdResponse = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: Progress[];
  timeLeftToRead: TimeLeftToRead;
};

export type Progress = {
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: string;
};

export type TimeLeftToRead = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
};
