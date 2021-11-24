import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RolModel } from '../../models/rol.model';
import { RolesService } from '../../services/roles.service';
import { GenericListModel } from '../../models/respuesta.models';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: RolModel[]= [];
  cargando=false;
  page:number=1;
  pageSize:number=20;
  totalItems:number=0;
  constructor(private rolesService: RolesService) { }

  ngOnInit() {
    this.doSearch();
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
    
  this.doSearch();
}

doSearch(){
  this.cargando=true;
  this.rolesService.getRoles(this.page).subscribe((resp: GenericListModel) => {
    this.roles = resp.lista;  
    this.totalItems = resp.total;
    this.cargando=false;
  } );
}


}
