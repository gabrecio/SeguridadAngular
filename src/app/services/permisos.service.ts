import { Injectable } from '@angular/core';
import { HttpClient,HttpParams , HttpHeaders } from '@angular/common/http';
import { RolModel } from '../models/rol.model';
import { map, delay } from 'rxjs/operators'
import { PageInfoModel } from '../models/pageInfo.models';
import { GenericListModel } from '../models/respuesta.models';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private headers= new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private pageInfoModel = new  PageInfoModel();
  constructor(private http: HttpClient) { }


  getPermiso(id: string): Observable<any>{
    return this.http.get(`${base_url}/rol/${id}`);
  }

  getPermisos(page:number, aplicacion: string){
   //string aplicacion,  int itemsPerPage, int page, bool reverse, string search, string sortBy
    let params = new HttpParams();
    params = params.append('aplicacion', aplicacion);
    params = params.append('page', page);
    params = params.append('itemsPerPage', 20);
    params = params.append('reverse', false);
    params = params.append('search', "");
    params = params.append('sortBy', "");

    
    
   // return this.http.get(`${this.url}/rol/Search`, {params: params}).pipe(map(this.parseResult), delay(1500));
    return this.http.get(`${base_url}/rol/Search`, {params: params});
    
  
  
  }
}
