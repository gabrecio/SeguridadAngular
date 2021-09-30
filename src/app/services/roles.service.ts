import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolModel } from '../Models/rol.model';
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url= 'http://local.seguridad_api.com/api';
  constructor(private http: HttpClient) { }



  getRol(id: string){
    return this.http.get(`${this.url}/rol/${id}`);
  }

  getRoles(){
    return this.http.get(`${this.url}/rol/`).pipe(map(this.crearArreglo), delay(1500));

  }

  private crearArreglo(rolObj: object){
    const roles: RolModel[]=[];
    
    if(rolObj === null){return [];}
    

    Object.entries(rolObj).forEach(([key, value]) => {

      const rol: RolModel= value;
      //const heroe: HeroeModel= heroesObj[value];
      rol.id = +key; //+ para hacer convert a number
      roles.push(rol);
    });
    return roles;
  }


}
