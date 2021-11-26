import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenListaModel } from '../models/genlista.models';
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private url= 'http://local.seguridad_api.com/api';
  constructor(private http: HttpClient) { }
  
//centro de costos
  
  getArea(id: string){
    return this.http.get(`${this.url}/centroCosto/${id}`);
  }

  getAreas(){
    return this.http.get(`${this.url}/centroCosto/`).pipe(map(this.crearArreglo), delay(1500));

  }

  getAreasAgil(){
    return this.http.get(`${this.url}/centroCosto/GetListaAgil2`).pipe(map(this.crearArreglo), delay(1500));

  }

  private crearArreglo(objeto: object){
    const aplicaciones: GenListaModel[]=[];
    
    if(objeto === null){return [];}
    

    Object.entries(objeto).forEach(([key, value]) => {

      const rol: GenListaModel= value;
      //const heroe: HeroeModel= heroesObj[value];
      //rol.id = +key; //+ para hacer convert a number
      aplicaciones.push(rol);
    });
    return aplicaciones;
  }


}
