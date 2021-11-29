import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormArray  } from '@angular/forms';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AplicacionModel } from 'src/app/models/aplicacion.models';
import { AplicacionesService } from '../../services/aplicaciones.service';
import { GenListaModel } from 'src/app/models/genlista.models';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styles: [
  ]
})
export class AplicacionComponent implements OnInit {

 
  public aplicacionForm: FormGroup;
  public aplicaciones: AplicacionModel[] = [];
 public aplicacion: AplicacionModel;
 public estados: GenListaModel[] = [];
 public estado: number;
 public _id: number;
 public accion: string;

  constructor( private fb: FormBuilder,  private aplicacionesService: AplicacionesService,
     private router: Router,  private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {


    this.aplicacionForm = this.fb.group({
      id: [0, Validators.required],
      codigo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],     
      observaciones: [''],     
      activo: [true, Validators.required],     
    });
   

    this.estados = [{id: 1, codigo: 'activo' ,descripcion:'Activo', descripcionCompleta:''},{id: 0, codigo: 'inactivo' ,descripcion:'Inactivo', descripcionCompleta:''}];
    //this.estado=this.estados[0].id;
    this.activatedRoute.params
    .subscribe( ({ id, accion }) =>{
     this._id = id;
     this.accion = accion;
     this.cargarAplicacion( id ) });
   // this.cargarAplicaciones();
   // this.cargarAreas();
   
  }



  get codigoNoValido(){
    return this.aplicacionForm.get('codigo')?.invalid && this.aplicacionForm.get('codigo')?.touched;
  }
  get descripcionNoValido(){
    return this.aplicacionForm.get('descripcion')?.invalid && this.aplicacionForm.get('descripcion')?.touched;
  }

  guardarAplicacion(): void{

    var codigo = this.aplicacionForm.controls['codigo'].value;
    this.aplicacionForm.controls['activo'].setValue((this.estado==1)?true:false);

    if ( this._id != 0 ) {
      //actualizar
       this.aplicacionesService.actualizar(  this.aplicacionForm.value )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ codigo } actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/aplicaciones`);
        }, err => {
          console.log("Error: "+ JSON.stringify(err));
          });

    } else {
      // crear      

     this.aplicacionesService.crear( this.aplicacionForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ codigo } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/aplicaciones`);
        }, err => {
          console.log("Error: "+ JSON.stringify(err));
          });

    }
  }


  cargarAplicacion(id: string) {

    if (  id == '0' ) {
      //this.aplicacionForm.controls['id'].setValue(0);
      return;
    }
    
     this.aplicacionesService.getAplicacion( id )
      .pipe(
        delay(100)
      )
      .subscribe( app => {

        if ( !app ) {
          return this.router.navigateByUrl(`/dashboard/aplicaciones`);
        }
       
        this.aplicacion= app;
        //console.log(app);
        this.aplicacionForm.setValue({ id:app.id,  codigo:app.codigo,  descripcion: app.descripcion, observaciones: app.observaciones, activo: app.activo });
        this.estado= (app.activo) ? this.estados[0].id:this.estados[1].id;
         return '';
      });
  }

cancel(){
  return this.router.navigateByUrl(`/dashboard/aplicaciones`);
}

capturarCambio(esta: string) {
  this.estado = +esta;
}

}
