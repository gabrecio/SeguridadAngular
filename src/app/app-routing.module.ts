import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},    
  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  {path: 'roles', component: RolesComponent, canActivate:[AuthGuard]},
  {path: 'aplicaciones', component: AplicacionesComponent, canActivate:[AuthGuard]},
  {path: '**', pathMatch:'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
