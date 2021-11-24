import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  
 public menuItems: any[];
 public usuario : UserModel;

  constructor(private router: Router, private sibebarService: SidebarService, private authService: AuthService) {
    this.menuItems=sibebarService.menu;
    this.usuario = authService.usuario;
    console.log(this.menuItems);
  
  }

  ngOnInit(): void {
  }

}
