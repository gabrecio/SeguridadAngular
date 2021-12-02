import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';
import { AplicacionModel } from '../../models/aplicacion.models';
import { AplicacionesService } from '../../services/aplicaciones.service';

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.css']
})
export class AplicacionesComponent implements OnInit {

  @ViewChild('txtBuscarAplicacion', { static: true }) txtBuscarAplicacion: ElementRef;
  aplicaciones: AplicacionModel[]= [];
  cargando=false;

  constructor(private aplicacionService: AplicacionesService,  private router: Router,  private activatedRoute: ActivatedRoute) { }

 

  ngOnInit() {

    this.cargando=true;
    this.aplicacionService.getAplicaciones().subscribe(resp => {
      this.aplicaciones = resp;
      this.cargando=false;
    } );
  }


  busquedaTodos() {
    let event = new KeyboardEvent('keyup', {
       'bubbles': true
    });
    this.txtBuscarAplicacion.nativeElement.dispatchEvent(event);
  }

  btnNuevo= function () {
    this.router.navigateByUrl('/dashboard/aplicacion/0/nuevo');
    // [routerLink]="[ '/dashboard', 'aplicacion', 0, 'nuevo'] "
};


  borrarAplicacion(app: AplicacionModel, i: number){
  
    Swal.fire({
      title:'Eliminar',
      text:`Esta seguro que desea borrar a ${app.descripcion}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){
        this.aplicacionService.eliminar(app.id).subscribe( (resp: any) => {
          Swal.fire('Eliminado', `eliminado correctamente`, 'success');
          this.aplicaciones.splice(i,1);       
          //this.router.navigateByUrl(`/dashboard/aplicaciones`);
      }, err => {
        Swal.fire('Elimina aplicación', `error al intentar eliminar una aplicación`, 'error');
        console.log("Error: "+ JSON.stringify(err));
        });
        
      }
    });

}


}
