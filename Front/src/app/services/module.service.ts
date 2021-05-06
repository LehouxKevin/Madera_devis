import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Module} from '../class/Module';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';
import {Modele} from "../class/modele";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  public modules: Module[] = [];

  baseUrl = environment.baseUrlAPI;
  ModulesApi = '/modules';

  constructor(private http: HttpClient) {
  }

  retValDeleteModule = false;

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.baseUrl + this.ModulesApi);
  }
  // tslint:disable-next-line:typedef
  syncgetModules()
  {
    return this.http.get<Module[]>(this.baseUrl + this.ModulesApi)
      .pipe(
        map(module => module['hydra:member'])
      )
      .toPromise()
      .then();
    {

      // tslint:disable-next-line:no-unused-expression
      module => this.modules = module; console.log('point 10 modele');
    }
  }
  // tslint:disable-next-line:typedef
  getOneModuleById(id) {
    return this.http.get<Module[]>(this.baseUrl + this.ModulesApi + '/' + id).toPromise();
  }


  // tslint:disable-next-line:typedef
  syncUpdateModule(modules: Module) {
    console.log(modules, ' | ', modules.id);
    return this.http.put<Module>(this.baseUrl + this.ModulesApi + '/' + modules.id, modules)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  asyncDeleteModule(idModule: number): boolean {
    this.retValDeleteModule = false;
    this.http.delete(this.baseUrl + this.ModulesApi + '/' + idModule)
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


  // tslint:disable-next-line:typedef
  async DeletelisteModule(idGamme) {
    console.log('point 6');
    this.modules = await this.modules.filter(module => module.gamme === '/api/gammes/' + idGamme);

    console.log(this.modules);
    for ( let i = 0; i < this.modules.length; i++)
    {
      await this.asyncDeleteModule(this.modules[i].id);
      console.log('point 1');
    }

  }

  // tslint:disable-next-line:typedef
  async deleteModuleCleGamme(idGamme) {
    this.modules = await this.syncgetModules();

    await this.DeletelisteModule(idGamme);
    console.log('point 5');
  }

  // tslint:disable-next-line:typedef
  addModule(modules: Module) {
    return this.http.post<Module>(this.baseUrl + this.ModulesApi, modules)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si utilisateur a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré
        if (data.id > 0) {
          return true;
        } else {
          return false;
        }
      });
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
