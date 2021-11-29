import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { AplicacionModel } from '../models/aplicacion.models';
import { tap,map, delay } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {
  //private url= 'http://local.seguridad_api.com/api';

  private headers= new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }


  getAplicacion(id: string): Observable<any>{
    return this.http.get(`${base_url}/aplicacion/${id}`);
  }

  getAplicaciones(){
    return this.http.get(`${base_url}/aplicacion/`).pipe(map(this.crearArreglo), delay(1500));

  }

  private crearArreglo(objeto: object){
    const aplicaciones: AplicacionModel[]=[];
    
    if(objeto === null){return [];}
    

    Object.entries(objeto).forEach(([key, value]) => {

      const rol: AplicacionModel= value;
      //const heroe: HeroeModel= heroesObj[value];     
      aplicaciones.push(rol);
    });
    return aplicaciones;
  }

  crear( formData: AplicacionModel) {
    
    return this.http.post(`${ base_url }` + "/aplicacion/0", formData, {headers:this.headers});
    
  }

  actualizar( formData: AplicacionModel ) {

    return this.http.put(`${ base_url }/aplicacion/${ formData.id }`, formData, {headers:this.headers} );
  }

  eliminar( id: number ) {    
   
    const url = `${ base_url }/aplicacion/${ id }`;
    return this.http.delete( url,  {headers:this.headers} );
}
}