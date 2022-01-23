import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fromEvent, of, Subscription } from 'rxjs';
import { debounceTime,  map,  distinctUntilChanged,  filter } from 'rxjs/operators';
import { RolModel } from '../../models/rol.model';
import { RolesService } from '../../services/roles.service';
import { GenericListModel } from '../../models/respuesta.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AplicacionModel } from 'src/app/models/aplicacion.models';
import { AplicacionesService } from '../../services/aplicaciones.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: []
})
export class RolesComponent implements OnInit {

  @ViewChild('txtBuscarRol', { static: true }) txtBuscarRol: ElementRef;
  //isSearching: boolean;
  roles: RolModel[]= [];
  cargando=false;
  page:number=1;
  pageSize:number=20;
  totalItems:number=0;
  public aplicaciones: AplicacionModel[] = [];
  public aplicacion: string;
  
  constructor(private rolesService: RolesService, private aplicacionesService: AplicacionesService,  private router: Router,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.cargarAplicaciones();

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

     this.cargando = true;

     this.doSearch(text).subscribe((resp: GenericListModel) => {
       console.log('resp', resp);
       this.cargando = false;
       this.roles = resp.lista;         
       this.totalItems = resp.total;
       this.cargando=false;
     }, (err) => {
       this.cargando = false;
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
}

doSearch(termino : string){
  
  if(!this.aplicacion)
    this.aplicacion= '';
 return this.rolesService.getRoles(this.page,termino,this.aplicacion);

}

CambioApp(app: string,termino : string) {
  this.aplicacion = app;
  this.cargando = true;
  this.doSearch(termino).subscribe((resp: GenericListModel) => {
    console.log('resp', resp);
    this.cargando = false;
    this.roles = resp.lista;         
    this.totalItems = resp.total;
    this.cargando=false;
  }, (err) => {
    this.cargando = false;
    console.log('error', err);
  });
 
 
}


cargarAplicaciones() {

  this.aplicacionesService.getAplicaciones()
    .subscribe( (aplicaciones: AplicacionModel[]) => {
      this.aplicaciones = aplicaciones;
    })

}

}
