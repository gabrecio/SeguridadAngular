import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';


const routes: Routes = [

  /*{path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },*/
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: NopagefoundComponent}
 /*  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},     
  {path: '**', pathMatch:'full', redirectTo:'home'}*/  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
