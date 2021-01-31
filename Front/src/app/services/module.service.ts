import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Module } from '../class/Module';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

 baseUrl = environment.baseUrlAPI;
  ModulesApi = '/modules';
constructor(private http: HttpClient) { }

  getModules(): Observable<Module[]>
  {
    return this.http.get<Module[]>(this.baseUrl+this.ModulesApi);
  }

  getOneModuleById(id)
  {
    return this.http.get<Module[]>(this.baseUrl+this.ModulesApi+"/"+id);
  }
}
