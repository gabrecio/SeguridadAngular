import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*this.getUsuarios(usuarios=> {
      console.log(usuarios);
    });*/
this.getUsuarios();

   /* const promesa = new Promise( (resolve, reject) =>{
      if(true){
        resolve('hola mensaje');
      }
      else{
        reject ('algo salio para el ojete');
      }
    });


    promesa.then((mensaje)=>{
      console.log(mensaje);
    })
    .catch( error => console.log('error en mi promesa', error));
    )

  console.log('hola init fin'); */


  }


  getUsuarios(){
    fetch('https://reqres.in/api/users')
    .then(resp=> {
      resp.json().then(body=> console.log(body))
    });
  }


}
