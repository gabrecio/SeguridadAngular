import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  
  autenticado: boolean=false; 

  constructor(private auth: AuthService, private router:Router) {
    
  
   }

   ngOnInit() {    
    this.autenticado = this.auth.estaAutenticado();
  }

  logout(){
      this.auth.logout();
      this.router.navigateByUrl('/login');
  }

}
