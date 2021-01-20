import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/class/client';
import { environment } from 'src/environments/environment';
import { ClientService } from 'src/app/services/client.service';
import { ArrayType } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-choix-client',
  templateUrl: './choix-client.component.html',
  styleUrls: ['./choix-client.component.css']
})
export class ChoixClientComponent implements OnInit {

  private clientsSubjects$ = new BehaviorSubject<Client[]>([]);
  clientsChange$ = this.clientsSubjects$.asObservable();

  public clients:Client[] = [];

  constructor(private clientService: ClientService, private http: HttpClient) { }

  ngOnInit(): void {

    
    this.clientService.getClients().pipe(
      map(client => client['hydra:member'])
    ).subscribe(
      client => this.clients = client 
    );

    console.log(this.clients);
  }
}

