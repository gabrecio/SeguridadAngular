import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormArray  } from '@angular/forms';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { GenListaModel } from 'src/app/models/genlista.models';
import { RolesService } from '../../services/roles.service';
import { RolModel } from 'src/app/models/rol.model';
import { AplicacionModel } from '../../models/aplicacion.models';
import { AplicacionesService } from 'src/app/services/aplicaciones.service';
import { PermisosService } from '../../services/permisos.service';
import { PermisosModel } from 'src/app/models/permiso.models';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: []
})
export class RolComponent implements OnInit {

 
  public rolForm: FormGroup;
  public roles: RolModel[] = [];
  public rol: RolModel;
  public aplicaciones: AplicacionModel[] = [];
  public aplicacion: number;
  public estados: GenListaModel[] = [];
  public estado: number;
  public _id: number;
  public accion: string;
  public permisos = [];
  public selTodos=false;
  
  constructor( private fb: FormBuilder,  private rolesService: RolesService, private aplicacionesService: AplicacionesService, 
    private permisosService: PermisosService, private router: Router,  private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      id: [0, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],      
      observaciones: [''],     
      activo: [true, Validators.required],     
      aplicacion:[null,Validators.required],    
      fechaAlta: [null], 
      permisos: [null]
    });
    this.cargarAplicaciones();

    this.estados = [{id: 1, codigo: 'activo' ,descripcion:'Activo', descripcionCompleta:''},{id: 0, codigo: 'inactivo' ,descripcion:'Inactivo', descripcionCompleta:''}];    
    
   /*  this.activatedRoute.params
    .subscribe( ({ id, accion }) =>{
     this._id = id;
     this.accion = accion;
     this.cargarRol( id ) }); */

  }


  get nombreNoValido(){
    return this.rolForm.get('nombre')?.invalid && this.rolForm.get('nombre')?.touched;
  }

  guardarRol(): void{

    var codigo = this.rolForm.controls['nombre'].value;
    this.rolForm.controls['activo'].setValue((this.estado==1)?true:false);
    this.rolForm.controls['aplicacion'].setValue(this.aplicaciones[this.aplicacion]);
    if ( this._id != 0 ) {
      //actualizar
       this.rolesService.actualizar(  this.rolForm.value )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ codigo } actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/roles`);
        }, err => {
          console.log("Error: "+ JSON.stringify(err));
          });

    } else {
      // crear      

     this.rolesService.crear( this.rolForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ codigo } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/roles`);
        }, err => {
          console.log("Error: "+ JSON.stringify(err));
          });

    }
  }


  cargarRol(id: string) {

    if (  id == '0' ) {
      //this.aplicacionForm.controls['id'].setValue(0);
      return;
    }
    
     this.rolesService.getRol( id )
      .pipe(
        delay(100)
      )
      .subscribe( rol => {

        if ( !rol ) {
          return this.router.navigateByUrl(`/dashboard/roles`);
        }
       
        this.rol= rol;
        //console.log(app);
        this.rolForm.setValue({ id:rol.id, nombre:rol.nombre,  observaciones: rol.observaciones, activo: rol.activo, aplicacion: rol.aplicacion, fechaAlta: rol.fechaAlta, permisos:null });
        this.estado= (rol.activo) ? this.estados[0].id:this.estados[1].id;
        this.aplicacion= rol.aplicacion.id;
        this.rolForm.controls['aplicacion'].setValue(this.aplicaciones[rol.aplicacion]);
        this.CambioApp(rol.aplicacion.id);
         return '';
      });
  }

cancel(){
  return this.router.navigateByUrl(`/dashboard/roles`);
}

capturarCambio(esta: string) {
  this.estado = +esta;
}

CambioApp(app: string) {
  this.aplicacion = +app;
  this.rolForm.controls['aplicacion'].setValue(this.aplicaciones[this.aplicacion]);

this.rolesService.rolPermissionByApp(this.aplicacion).subscribe( (perm: PermisosModel[]) => {
  this.permisos = perm;
  })  
}

cargarAplicaciones() {

  this.aplicacionesService.getAplicaciones()
    .subscribe( (aplicaciones: AplicacionModel[]) => {
      this.aplicaciones = aplicaciones;
      this.activatedRoute.params
      .subscribe( ({ id, accion }) =>{
       this._id = id;
       this.accion = accion;
       this.cargarRol( id ) });
    })

}

/*change() {        
  $scope.permisos.forEach(function(entry) {			
    entry.operaciones.forEach(function(ope) {				
      ope.activo =$scope.selTodos;
    });
  });
};*/

getPermisos () {        
  var rolPerm = this.rolesService.getRolPermissions(this._id).subscribe( (perm: PermisosModel[]) => {
    this.permisos = perm;
    })  
};

}
