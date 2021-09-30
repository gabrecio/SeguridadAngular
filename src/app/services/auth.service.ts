import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/user.models';
import { map } from 'rxjs/operators';



const AUTH_API = 'http://local.seguridad_api.com/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  userToken:string="";

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  login(usuario: UserModel): Observable<any> {
    //return this.http.post(AUTH_API + '/Usuario/Signin',   usuario , httpOptions);
    return this.http.post(AUTH_API + '/Usuario/Signin',   usuario , httpOptions).pipe(map ( (resp:any)  =>{
      this.guardarToken(resp['token']);
      return resp;
    }))
  }

  logout(){
    localStorage.removeItem('token');
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
  }

}
