import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AplicacionModel } from '../models/aplicacion.models';
import { map, delay } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {
  private url= 'http://local.seguridad_api.com/api';
  constructor(private http: HttpClient) { }


  getAplicacion(id: string){
    return this.http.get(`${this.url}/aplicacion/${id}`);
  }

  getAplicaciones(){
    return this.http.get(`${this.url}/aplicacion/`).pipe(map(this.crearArreglo), delay(1500));

  }

  private crearArreglo(objeto: object){
    const aplicaciones: AplicacionModel[]=[];
    
    if(objeto === null){return [];}
    

    Object.entries(objeto).forEach(([key, value]) => {

      const rol: AplicacionModel= value;
      //const heroe: HeroeModel= heroesObj[value];
      rol.id = +key; //+ para hacer convert a number
      aplicaciones.push(rol);
    });
    return aplicaciones;
  }


}
