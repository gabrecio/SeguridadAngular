import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../models/user.models';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';


const AUTH_API = 'http://local.seguridad_api.com/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public usuario: UserModel;
  userToken:string="";

  constructor(private http: HttpClient,  private router:Router) { 
    this.leerToken();
  }

  login(usuario: UserModel): Observable<any> {
    //return this.http.post(AUTH_API + '/Usuario/Signin',   usuario , httpOptions);
    return this.http.post(AUTH_API + '/Usuario/Signin',   usuario , httpOptions).pipe(map ( (resp:any)  =>{
      this.guardarToken(resp['token']);
      this.loggedIn.next(true);
      this.usuario = resp;
      return resp;
    }))
  }

  logout(){
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
   // this.router.navigateByUrl('/login');
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      username,
      email,
      password
    }, httpOptions);
  }


  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    //fecha expiracion del token
    let hoy = new Date();
     hoy.setSeconds(3600); //1hora
     localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken= localStorage.getItem('token')??"";
    }
    else{
      this.userToken='';
    }
    return this.userToken;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  validarToken(): Observable<boolean> {
    const token= localStorage.getItem('token')??"";
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
      //  this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
    );

  }


/*
  estaAutenticado():boolean{
    if(this.userToken.length < 2 )
    {
      return false;
    }
    const expira  = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date())
    {
      return true;
    }
    else{
      return false;
    }  
  }*/

}
