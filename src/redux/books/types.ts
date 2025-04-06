export type Books = Book[];

export type Book = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
};

export type BooksResponse = {
  results: Books;
  totalPages: number;
  page: number;
  perPage: number;
};
