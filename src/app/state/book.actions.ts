import { createAction, props } from '@ngrx/store';
import { Book } from '../temp/redux/book-list/book.model';
 
export const addBook = createAction(
  '[Book List] Add Book',
  props<{ bookId: string }>()
);
 
export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId: string }>()
);
 
export const retrievedBookList = createAction(
  '[Book List/API] Retrieve Books Success',
  props<{ books: ReadonlyArray<Book> }>()
);

export const loadBookList = createAction(
  '[Book List/API] Load Books',
  //props<{ books: ReadonlyArray<Book> }>()
);
export const errorLoadBookList = createAction(
  '[Book List/API] LoadError',
  //props<{  }>()
);