import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OpDataPacket } from './parameter-trend.models';


 
@Injectable({ providedIn: 'root' })
export class ParameterTrendService {
  constructor(private http: HttpClient) {}
 

  getTable(objects:number[], parameters:number[], from: string, to:string): Observable<OpDataPacket> {
    let o = JSON.stringify(objects);
    let p = JSON.stringify(parameters);
    return this.http.get<OpDataPacket>(environment.apiBaseUrl + `/table?objects=${o}&parameters=${p}&from=${from}&to=${to}`, { withCredentials: true }).pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}