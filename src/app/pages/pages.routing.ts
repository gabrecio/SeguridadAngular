import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuarioComponent } from './usuarios/usuario.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { AplicacionComponent } from './aplicaciones/aplicacion.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data:{titulo:'Dashboard'} },
            { path: 'usuarios', component: UsuariosComponent , data:{titulo:'Usuarios'}},
            { path: 'roles', component: RolesComponent , data:{titulo:'Roles'}},           
            { path: 'aplicaciones', component: AplicacionesComponent , data:{titulo:'Aplicaciones'}},     
            { path: 'account-settings', component: AccountSettingsComponent , data:{titulo:'Ajustes'}},            
            { path: 'promesas', component: PromesasComponent , data:{titulo:'Promesas'}},          
            { path: 'rxjs', component: RxjsComponent, data:{titulo:'Rxjs'} }, 
            { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'ABM Usuario' }},
            { path: 'aplicacion/:id/:accion', component: AplicacionComponent, data: { titulo: 'ABM Aplicacion' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


