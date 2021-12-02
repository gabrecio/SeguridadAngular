import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fromEvent, of, Subscription } from 'rxjs';
import { debounceTime,  map,  distinctUntilChanged,  filter } from 'rxjs/operators';
import { RolModel } from '../../models/rol.model';
import { RolesService } from '../../services/roles.service';
import { GenericListModel } from '../../models/respuesta.models';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  @ViewChild('txtBuscarRol', { static: true }) txtBuscarRol: ElementRef;
  isSearching: boolean;
  roles: RolModel[]= [];
  cargando=false;
  page:number=1;
  pageSize:number=20;
  totalItems:number=0;

  
  constructor(private rolesService: RolesService,  private router: Router,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

   // this.doSearch();

   this.cargando=true;
    
   fromEvent(this.txtBuscarRol.nativeElement, 'keyup').pipe(

     // get value
     map((event: any) => {
       return event.target.value;
     })
      //if character length greater then 2
     //, filter(res => res.length > 2)

     // Time in milliseconds between key events
     , debounceTime(1000)

     // If previous query is diffent from current   
     //, distinctUntilChanged() //ses desabilita para que funcione la paginacion

     // subscription for response
   ).subscribe((text: string) => {

     this.isSearching = true;

     this.doSearch(text).subscribe((resp: GenericListModel) => {
       console.log('resp', resp);
       this.isSearching = false;
       this.roles = resp.lista;         
       this.totalItems = resp.total;
       this.cargando=false;
     }, (err) => {
       this.isSearching = false;
       console.log('error', err);
     });

   });
   this.busquedaTodos();

  }

  btnNuevo= function () {
    this.router.navigateByUrl('/dashboard/rol/0/nuevo');
    // [routerLink]="[ '/dashboard', 'aplicacion', 0, 'nuevo'] "
};

  busquedaTodos() {
    let event = new KeyboardEvent('keyup', {
       'bubbles': true
    });
    this.txtBuscarRol.nativeElement.dispatchEvent(event);
  }

  borrarRol(rol: RolModel, i: number){
  
    Swal.fire({
      title:'Eliminar',
      text:`Esta seguro que desea borrar a ${rol.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){
        this.roles.splice(i,1);       
      }
    });

}
pageChange(){
  this.busquedaTodos();
  //this.doSearch();
}

doSearch2(){
  this.cargando=true;
  this.rolesService.getRoles3(this.page).subscribe((resp: GenericListModel) => {
    this.roles = resp.lista;  
    this.totalItems = resp.total;
    this.cargando=false;
  } );
}
doSearch(termino : string){
  
 return this.rolesService.getRoles(this.page,termino);

}

}
