import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormArray  } from '@angular/forms';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { GenListaModel } from 'src/app/models/genlista.models';
import { RolesService } from '../../services/roles.service';
import { RolModel } from 'src/app/models/rol.model';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: []
})
export class RolComponent implements OnInit {

 
  public rolForm: FormGroup;
  public roles: RolModel[] = [];
 public rol: RolModel;
 public estados: GenListaModel[] = [];
 public estado: number;
 public _id: number;
 public accion: string;

  constructor( private fb: FormBuilder,  private rolesService: RolesService,
     private router: Router,  private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      id: [0, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],      
      observaciones: [''],     
      activo: [true, Validators.required],     
      aplicacion:[null,Validators.required]
    });
   

    this.estados = [{id: 1, codigo: 'activo' ,descripcion:'Activo', descripcionCompleta:''},{id: 0, codigo: 'inactivo' ,descripcion:'Inactivo', descripcionCompleta:''}];
    //this.estado=this.estados[0].id;
    this.activatedRoute.params
    .subscribe( ({ id, accion }) =>{
     this._id = id;
     this.accion = accion;
     this.cargarRol( id ) });
  }


  get nombreNoValido(){
    return this.rolForm.get('codigo')?.invalid && this.rolForm.get('codigo')?.touched;
  }
/*   get descripcionNoValido(){
    return this.rolForm.get('descripcion')?.invalid && this.rolForm.get('descripcion')?.touched;
  } */

  guardarRol(): void{

    var codigo = this.rolForm.controls['codigo'].value;
    this.rolForm.controls['activo'].setValue((this.estado==1)?true:false);

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
        this.rolForm.setValue({ id:rol.id,  nombre:rol.nombre,  observaciones: rol.observaciones, activo: rol.activo });
        this.estado= (rol.activo) ? this.estados[0].id:this.estados[1].id;
         return '';
      });
  }

cancel(){
  return this.router.navigateByUrl(`/dashboard/roles`);
}

capturarCambio(esta: string) {
  this.estado = +esta;
}



}
