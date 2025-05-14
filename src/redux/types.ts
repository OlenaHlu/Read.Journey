export type BooksState = {
  books: Book[];
  book: Book;
  currentPage: number;
  perPage: number;
  totalPages: number;
  filtersLib: string;
  inputFilters: InputFilters;
  isLoading: boolean;
  error: string | null;
  readingBook: AddBooksId | null;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
};

export type BooksResponse = {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type InputFilters = {
  title: string;
  author: string;
};

export type AddBooksId = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: [];
  recommend?: boolean;
  bookId?: string;
};

export type ReadBook = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: Progress[];
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

// export type BookIdResponse = {
//   _id: string;
//   title: string;
//   author: string;
//   imageUrl: string;
//   totalPages: number;
//   status: string;
//   owner: string;
//   progress: Progress[];
//   timeLeftToRead: TimeLeftToRead;
// };
