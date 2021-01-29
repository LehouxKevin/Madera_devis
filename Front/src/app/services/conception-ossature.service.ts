import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConceptionOssature } from '../class/conception-ossature';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ConceptionOssatureService {

 baseUrl = environment.baseUrlAPI;
  ConceptionOssatureApi = '/conception_ossatures';
constructor(private http: HttpClient) { }

  getConceptionOssatures(): Observable<ConceptionOssature[]>
  {
    return this.http.get<ConceptionOssature[]>(this.baseUrl+this.ConceptionOssatureApi);
  }

  getOneConceptionOssatureById(id)
  {
    return this.http.get<ConceptionOssature[]>(this.baseUrl+this.ConceptionOssatureApi+"/"+id);
  }
}