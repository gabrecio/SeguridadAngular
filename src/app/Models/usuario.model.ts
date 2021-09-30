export class UsuarioModel{
    id: number;
    username: string;
    nombre: string;    
    apellido:string;
    mail:string;

    constructor(){
        this.id=0;
        this.nombre="";
        this.apellido="";
        this.username="";
        this.mail="";
    }
}