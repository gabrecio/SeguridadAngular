import { Injectable } from '@angular/core';
import { HttpClient,HttpParams , HttpHeaders } from '@angular/common/http';
import { RolModel } from '../Models/rol.model';
import { map, delay } from 'rxjs/operators'
import { PageInfoModel } from '../Models/pageInfo.models';
import { GenericListModel } from '../Models/respuesta.models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url= 'http://local.seguridad_api.com/api';

  private pageInfoModel = new  PageInfoModel();
  constructor(private http: HttpClient) { }

  getRol(id: string){
    return this.http.get(`${this.url}/rol/${id}`);
  }

  getRoles(page:number){
   //string aplicacion,  int itemsPerPage, int page, bool reverse, string search, string sortBy
    let params = new HttpParams();
    params = params.append('aplicacion', "");
    params = params.append('page', page);
    params = params.append('itemsPerPage', 20);
    params = params.append('reverse', false);
    params = params.append('search', "");
    params = params.append('sortBy', "");

    
    
   // return this.http.get(`${this.url}/rol/Search`, {params: params}).pipe(map(this.parseResult), delay(1500));
    return this.http.get(`${this.url}/rol/Search`, {params: params});
    /*
    
    (resp:GenericListModel) => {
      let roles: RolModel[]=[];
      roles =  resp.lista; 
      return roles;
  } );
  
  */
  }


  getRoles2(){
   
    return this.http.get(`${this.url}/rol`).pipe(map(this.crearArreglo), delay(1500));

  }

  private crearArreglo(rolObj: object){
    const roles: RolModel[]=[];
    
    if(rolObj === null){return [];}
    

    Object.entries(rolObj).forEach(([key, value]) => {

      const rol: RolModel= value;   
      rol.id = +key; //+ para hacer convert a number
      roles.push(rol);
    });
    return roles;
  }





}
