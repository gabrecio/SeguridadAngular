import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../Models/usuario.model';
import { map, delay } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class UsuariosService {
  private url= 'http://local.seguridad_api.com/api';

  private headers= new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

 
  getUsuario(id: string){
    return this.http.get(`${this.url}/usuario/${id}`);
  }

  getUsuarios(){
    return this.http.get(`${this.url}/usuario/`).pipe(map(this.crearArreglo), delay(1500));

  }

  login2(user: any): Observable<any>  {
    return this.http.post(`${this.url}/login`, user);
  }

  login(username: string, password: string, codeApp: string): Observable<any> {
    return this.http.post(this.url + '/CheckUser', {
      username,
      password,
      codeApp
    }, this.httpOptions);
  }

 
  register(user: any): Observable<any> {
    return  this.http.post(`${this.url}/register`, user);
  }
/*  setToken(token: String) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }*/
  private crearArreglo(usuarioObj: object){
    const usuarios: UsuarioModel[]=[];
    
    if(usuarioObj === null){return [];}
    

    Object.entries(usuarioObj).forEach(([key, value]) => {

      const usuario: UsuarioModel= value;
      //const heroe: HeroeModel= heroesObj[value];
      usuario.id = +key; //+ para hacer convert a number
      usuarios.push(usuario);
    });
    return usuarios;
  }

}
