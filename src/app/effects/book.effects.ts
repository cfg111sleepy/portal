import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GoogleBooksService } from '../temp/redux/book-list/books.service';
import {
    retrievedBookList,
    loadBookList,
    errorLoadBookList,
  } from '../state/book.actions';

@Injectable()
export class BookEffects {
 
  //loadBooks$ = createEffect(() => {});
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookList),
      mergeMap(() => this.booksService.getBooks()
        .pipe(
          map(books => (retrievedBookList({ books }))),
          catchError(() => of(errorLoadBookList())
        )
      )
    )
  ));
 
  constructor(
    private actions$: Actions,
    private booksService: GoogleBooksService
  ) {}
}