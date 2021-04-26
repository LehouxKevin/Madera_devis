import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeModule } from '../class/type-module';

@Injectable({
  providedIn: 'root'
})
export class TypeModuleService {

  baseUrl = environment.baseUrlAPI;
  TypeModuleApi = "/type_modules";

  constructor(private http:HttpClient) { }

  getTypesModule(): Observable<TypeModule[]>
  {
    return this.http.get<TypeModule[]>(this.baseUrl+this.TypeModuleApi);
  }

  asyncGetTypesModule()
  {
    return this.http.get<TypeModule[]>(this.baseUrl+this.TypeModuleApi);
  }

  getOneTypeModuleById(id)
  {
    return this.http.get<any[]>(this.baseUrl+this.TypeModuleApi+"/"+id).toPromise();
  }

  getOneTypeModuleByForeignKey(FK)
  {
    return this.http.get<any[]>(this.baseUrl+FK).toPromise();
  }

  asyncgetOneTypeModuleByForeignKey(FK)
  {
    return this.http.get<any[]>(this.baseUrl+FK);
  }
}
