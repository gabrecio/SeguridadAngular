import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserModel } from '../../Models/user.models';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  usuario: UserModel = new UserModel();
  recordarme = false;
  errorMessage = '';
  roles: string[] = [];
  
  constructor(private authService: AuthService,  private router: Router ) { }

    ngOnInit() {

      if ( localStorage.getItem('username') ) {
        this.usuario.username = localStorage.getItem('username')??"";
        this.recordarme = true;
      }

   
  
    }

    reloadPage(): void {
      window.location.reload();
    }

  login( form: NgForm ) {

   if (  form.invalid ) { return; }



Swal.fire({
  title:'Login',
  text:`Espere por favor...`,
  icon:'info',
  showConfirmButton:true,
  showCancelButton:true
});

  
    Swal.showLoading();

    this.authService.login(this.usuario).subscribe( data => {
      console.log(data);

      if(this.recordarme){
        localStorage.setItem('username', this.usuario.username)
      }

      Swal.close();
      this.router.navigateByUrl('/home');
     
     // this.roles = this.tokenStorage.getUser().roles;
      //this.reloadPage();
    },
    err => {
      this.errorMessage = err.message;
     // this.isLoginFailed = true;
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text:  this.errorMessage
      });
     // Swal.close();

    });


   
  }

}

