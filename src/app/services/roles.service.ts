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
export class RolesService {
  private headers= new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private pageInfoModel = new  PageInfoModel();
  constructor(private http: HttpClient) { }


  getRol(id: string): Observable<any>{
    return this.http.get(`${base_url}/rol/${id}`);
  }

  getRoles3(page:number){
   //string aplicacion,  int itemsPerPage, int page, bool reverse, string search, string sortBy
    let params = new HttpParams();
    params = params.append('aplicacion', "");
    params = params.append('page', page);
    params = params.append('itemsPerPage', 20);
    params = params.append('reverse', false);
    params = params.append('search', "");
    params = params.append('sortBy', "");

    
    
   // return this.http.get(`${this.url}/rol/Search`, {params: params}).pipe(map(this.parseResult), delay(1500));
    return this.http.get(`${base_url}/rol/Search`, {params: params});
    /*
    
    (resp:GenericListModel) => {
      let roles: RolModel[]=[];
      roles =  resp.lista; 
      return roles;
  } );
  
  */
  }

  getRoles(page:number, termino: string){

    let params = new HttpParams({ fromObject: { page: page, app: 'todas', itemsPerPage:20,reverse:false, search:termino,sortBy:''  } });


    return this.http.get(`${base_url}/rol/Search`, {params: params});
  }


  getRoles2(){
   
    return this.http.get(`${base_url}/rol`).pipe(map(this.crearArreglo), delay(1500));

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


  crear( formData: RolModel) {
    
    return this.http.post(`${ base_url }` + "/rol/0", formData, {headers:this.headers});
    
  }

  actualizar( formData: RolModel ) {

    return this.http.put(`${ base_url }/rol/${ formData.id }`, formData, {headers:this.headers} );
  }

  eliminar( id: number ) {    
   
    const url = `${ base_url }/rol/${ id }`;
    return this.http.delete( url,  {headers:this.headers} );
}



}
