import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  
  autenticado: Observable<boolean>; 


  constructor(private auth: AuthService, private router:Router) {
    
  
   }

   ngOnInit() {    
    //this.autenticado = this.auth.estaAutenticado();
    this.autenticado = this.auth.isLoggedIn;
  }

  logout(){
      this.auth.logout();
    //  this.router.navigateByUrl('/login');
  }

}
