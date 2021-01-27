import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../class/client';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/ld+json',
    })
  };
  
  baseUrl = environment.baseUrlAPI;
  clientsApi = '/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]>
  {
    return this.http.get<Client[]>(this.baseUrl+this.clientsApi);
/*
/*this.http.get<Client[]>(this.baseUrl+this.clientsApi).pipe(
      map(client => client['hydra:member'])
    ).subscribe(
      client => this.clients = client 
    );
    return this.clients;*/

  }

  getOneClientById(id)
  {
    return this.http.get<Client[]>(this.baseUrl+this.clientsApi+"/"+id).toPromise();
  }

  addClient(client:Client)
  {
    this.http.post<Client>(this.baseUrl+this.clientsApi,client)
    .pipe(
      catchError(this.handleError)
    ).subscribe();
  }


  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
