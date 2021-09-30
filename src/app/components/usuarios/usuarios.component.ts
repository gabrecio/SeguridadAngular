import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../Models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuarioModel[]= [];
  cargando=false;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.cargando=true;
    this.usuariosService.getUsuarios().subscribe(resp => {
      this.usuarios = resp;
      this.cargando=false;

    } );
   /*  this.usuarios.push({id:1,nombre:'ga',apellido:'rec',username:'pepo', mail:'grecop@gmail.com'});
    this.cargando=false; */
  }


  borrarUsuario(usuario: UsuarioModel, i: number){
  
    Swal.fire({
      title:'Eliminar',
      text:`Esta seguro que desea borrar a ${usuario.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){
        this.usuarios.splice(i,1);
        //this.heroesService.borrarHeroe(usuario.id).subscribe();
      }
    });

}


}
