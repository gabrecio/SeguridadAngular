import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioComponent } from './usuarios/usuario.component';
import { AplicacionComponent } from './aplicaciones/aplicacion.component';
import { RolComponent } from './roles/rol.component'; 

@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    RolesComponent,
    AplicacionesComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    UsuarioComponent,
    AplicacionComponent,
    RolComponent,
  ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    RolesComponent,
    AplicacionesComponent,
    PagesComponent,
  ],
  imports: [ 
    CommonModule,
    FormsModule,    
    ReactiveFormsModule, 
    SharedModule,
    RouterModule,
    NgbModule,
  ]
})
export class PagesModule { }
