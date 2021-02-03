import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
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
  retValDeleteModule:boolean=false;

  getModules(): Observable<Module[]>
  {
    return this.http.get<Module[]>(this.baseUrl+this.ModulesApi);
  }

  getOneModuleById(id)
  {
    return this.http.get<Module[]>(this.baseUrl+this.ModulesApi+"/"+id);
  }







   syncUpdateModule(modules:Module)
      {
        console.log(modules,  " | " ,  modules.id);
        return this.http.put<Module>(this.baseUrl+this.ModulesApi+"/"+modules.id,modules)
        .pipe(
          catchError(this.handleError)
        ).toPromise();
      }

        asyncDeleteModule(idModule:number): boolean
        {
          this.retValDeleteModule=false;
          this.http.delete(this.baseUrl+this.ModulesApi+"/"+idModule)
              .subscribe({
                  next: data => {
                      this.retValDeleteModule = true;
                  },
                  error: error => {
                      console.error('There was an error!', error);
                  }
              });
          return this.retValDeleteModule;
        }

  addModule(modules:Module)
    {
      return this.http.post<Module>(this.baseUrl+this.ModulesApi,modules)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
          // Retourne true si utilisateur a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré
          if(data.id > 0)
          {
            return true;
          }
          else {
            return false;
          }
      });}
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
