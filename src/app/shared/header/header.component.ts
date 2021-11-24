import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserModel } from 'src/app/models/user.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit {

  autenticado: Observable<boolean>; 
  menuItems: any[];
  public usuario: UserModel;
  constructor(private auth: AuthService, private router:Router, private usuarioService: UsuariosService) {
    
    this.usuario = auth.usuario;
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
