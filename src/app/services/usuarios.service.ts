import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {tap, map, delay, catchError } from 'rxjs/operators'
import { Observable, of  } from 'rxjs';
import { environment } from '../../environments/environment';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


const base_url = environment.base_url;


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

 
  getUsuario(id: string): Observable<any>{
    return this.http.get(`${this.url}/usuario/${id}`);
  }

  getUsuarios(page:number, termino: string){

    let params = new HttpParams({ fromObject: { page: page, app: 'todas', itemsPerPage:20,reverse:false, search:termino,sortBy:''  } });


    return this.http.get(`${this.url}/usuario/Search`, {params: params});
  }

  getUsuarios2(page:number){

    let params = new HttpParams({ fromObject: { page: page, app: 'todas', itemsPerPage:20,reverse:false, search:'',sortBy:''  } });


    return this.http.get(`${this.url}/usuario/Search`, {params: params});
  }

  getUsuarios3(){
    return this.http.get(`${this.url}/usuario/`).pipe(map(this.crearArreglo), delay(1500));

  }

  login3(user: any): Observable<any>  {
    return this.http.post(`${this.url}/login`, user);
  }

  eliminar(id: number): Observable<any>  {
    const url= `${this.url}/usuario/${id}`;
    return this.http.delete(url);
  //  return this.http.delete(`${this.url}/usuario/${id}`);
  }

  login(username: string, password: string, codeApp: string): Observable<any> {
    return this.http.post(this.url + '/CheckUser', {
      username,
      password,
      codeApp
    }, this.httpOptions);
  }

  login2( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

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


  
  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )

  }

}
