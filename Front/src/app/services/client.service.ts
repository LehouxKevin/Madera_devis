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

  baseUrlApi = environment.baseUrlAPI;
  baseUrl = environment.baseUrl;
  clientsApi = '/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]>
  {
    return this.http.get<Client[]>(this.baseUrlApi + this.clientsApi);
  }

  // tslint:disable-next-line:typedef
  syncGetClients()
  {
    let clients: Client[] = [];
    return this.http.get<Client[]>(this.baseUrlApi + this.clientsApi)
    .pipe(
      map(client => client['hydra:member'])
    )
    .toPromise()
    .then();
    {
      // tslint:disable-next-line:no-unused-expression
      client => clients = client;
    }
  }

  // tslint:disable-next-line:typedef
  getOneClientById(id)
  {
    return this.http.get<Client[]>(this.baseUrlApi + this.clientsApi + '/' + id).toPromise();
  }

  // tslint:disable-next-line:typedef
  addClient(client: Client)
  {
    return this.http.post<Client>(this.baseUrlApi + this.clientsApi, client)
    .pipe(
      catchError(this.handleError)
    ).toPromise().then(data => {
        // Retourne true si client a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré
        if (data.id > 0)
        {
          return true;
        }
        else {
          return false;
        }
    });
  }

  // tslint:disable-next-line:typedef
  getOneClientByLink(link)
  {
    return this.http.get<any[]>(this.baseUrl + link).toPromise();
  }


  // tslint:disable-next-line:typedef
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
