import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { GenericListModel } from '../../models/respuesta.models';
import { fromEvent, of, Subscription } from 'rxjs';
import { debounceTime,  map,  distinctUntilChanged,  filter } from 'rxjs/operators';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  @ViewChild('txtBuscarUsuario', { static: true }) txtBuscarUsuario: ElementRef;
  isSearching: boolean;
  usuarios: UsuarioModel[]= [];
  cargando=false;
  page:number=1;
  pageSize:number=20;
  totalItems:number=20;
  txtTermino : string='';


  constructor(private usuariosService: UsuariosService) { }



  ngOnInit() {
  
    this.cargando=true;
    
    fromEvent(this.txtBuscarUsuario.nativeElement, 'keyup').pipe(

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

      this.isSearching = true;

      this.doSearch(text).subscribe((resp: GenericListModel) => {
        console.log('resp', resp);
        this.isSearching = false;
        this.usuarios = resp.lista;  
        this.totalItems = resp.total;
        
      }, (err) => {
        this.isSearching = false;
        console.log('error', err);
      });

    });
    this.busquedaTodos();
   
}

busquedaTodos() {
  let event = new KeyboardEvent('keyup', {
     'bubbles': true
  });
  this.txtBuscarUsuario.nativeElement.dispatchEvent(event);
}



  doSearch(termino : string){
    //this.cargando=true;
    
   return this.usuariosService.getUsuarios(this.page,termino);
   //.subscribe((resp: GenericListModel) => {
      /*this.usuarios = resp.lista;  
      this.totalItems = resp.total;*/
     // this.cargando=false;
   // } );
  }

  pageChange(){
    
   this.busquedaTodos();
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
        this.usuariosService.eliminar(usuario.id).subscribe(resp => {
            this.busquedaTodos();
            Swal.fire('usuario borrado',` ${usuario.nombre} fue eliminado correctamente.`, 'success');

         } 
        );
        //this.heroesService.borrarHeroe(usuario.id).subscribe();
      }
    });

}


abrirModal(usuario: UsuarioModel)
{/*
 this.usuarioModalService.abrirModal(usuario.id).subscribe((resp: UsuarioModel) => {
  //   this.Usuario= resp;
     console.log('resp', resp); 
     
   }, (err) => { 
     console.log('error', err);
   });*/
}


}
