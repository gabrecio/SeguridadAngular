import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RolModel } from '../../Models/rol.model';
import { RolesService } from '../../services/roles.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: RolModel[]= [];
  cargando=false;

  constructor(private rolesService: RolesService) { }

  ngOnInit() {

    this.cargando=true;
    this.rolesService.getRoles().subscribe(resp => {
      this.roles = resp;
      this.cargando=false;
    } );
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


}
