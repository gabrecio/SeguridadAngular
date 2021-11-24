import { Component, OnInit } from '@angular/core';
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

  aplicaciones: AplicacionModel[]= [];
  cargando=false;

  constructor(private aplicacionService: AplicacionesService, private rolService: RolesService) { }

 

  ngOnInit() {

    this.cargando=true;
    this.aplicacionService.getAplicaciones().subscribe(resp => {
      this.aplicaciones = resp;
      this.cargando=false;
    } );
  }



  borrarAplicacion(app: AplicacionModel, i: number){
  
    Swal.fire({
      title:'Eliminar',
      text:`Esta seguro que desea borrar a ${app.descripcion}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){
        this.aplicaciones.splice(i,1);       
      }
    });

}


}
