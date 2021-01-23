import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../class/client';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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
}
