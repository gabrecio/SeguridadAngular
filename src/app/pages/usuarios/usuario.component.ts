import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormArray  } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AplicacionModel } from 'src/app/models/aplicacion.models';
import { AplicacionesService } from '../../services/aplicaciones.service';
import { AreasService } from 'src/app/services/areas.service';
import { GenListaModel } from '../../models/genlista.models';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: []
})


export class UsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;
  public aplicaciones: AplicacionModel[] = [];
  public areas: GenListaModel[] = [];

 public  usuario :UsuarioModel;
 public aplicacion: AplicacionModel;
 public area: GenListaModel;

  constructor( private fb: FormBuilder, private usuariosService: UsuariosService,  private aplicacionesService: AplicacionesService,private areaService: AreasService,
     private router: Router,  private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
  

    this.usuarioForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      mail:['',[ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      activo: ['', Validators.required],
      documento: ['', Validators.required],
      legajo: ['', Validators.required],
      interno: ['', Validators.required],
      passwd: ['', Validators.required],
      passwd2: ['', Validators.required],
      rol: [null, Validators.required],
      centroCosto: [null, Validators.required],
     // roles: [null, Validators.required],
    });
    this.activatedRoute.params
    .subscribe( ({ id }) => this.cargarUsuario( id ) );

    this.cargarAplicaciones();
    this.cargarAreas();
    /*this.usuarioForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
        })*/

  
  }

  guardarUsuario(): void{

    const { nombre } = this.usuarioForm.value;

    if ( this.usuario ) {
      // actualizar
  /*    const data = {
        ...this.usuarioForm.value,
        _id: this.usuarioSeleccionado._id
      }*/
    /*  this.usuarioService.actualizarMedico( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })*/

    } else {
      // crear
      
     /* this.usuarioService.crearMedico( this.usuarioForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })*/
    }
  }


  cargarUsuario(id: string) {

    if (  id === 'nuevo' ) {
      return;
    }
    
     this.usuariosService.getUsuario( id )
      .pipe(
        delay(100)
      )
      .subscribe( user => {

        if ( !user ) {
          return this.router.navigateByUrl(`/dashboard/usuarios`);
        }

       
        this.usuario= user;
       console.log(user);
        this.usuarioForm.setValue({   id:user.id,  nombre:user.nombre,  apellido: user.apellido,
        username: user.username, mail:user.mail, activo: user.activo, documento: user.documento, 
        legajo: user.legajo, interno: user.interno, passwd: 123456, passwd2: 123456, rol: user.rol, centroCosto: user.centroCosto });
         return '';
      });

  }

  
cancel(){
  return this.router.navigateByUrl(`/dashboard/usuarios`);
}

  cargarAplicaciones() {

    this.aplicacionesService.getAplicaciones()
      .subscribe( (aplicaciones: AplicacionModel[]) => {
        this.aplicaciones = aplicaciones;
      })

  }
  cargarAreas() {

    this.areaService.getAreasAgil()
      .subscribe( (areas: GenListaModel[]) => {
        this.areas = areas;
      })

  }

}
