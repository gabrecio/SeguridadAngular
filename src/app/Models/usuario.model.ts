export class UsuarioModel{
    id: number;
    username: string;
    nombre: string;    
    apellido:string;
    mail:string;
    fechaAlta: Date;
    passwd:string ;
    rol: object;
    centroCosto: object;
    roles: [];
    cambiarPass:boolean;
    legajo:string;
    interno:string;
    documento:string;
    Token:string;
    public uid?:string;    


    constructor(){
        this.id=0;
        this.apellido="";
        this.nombre="";
        this.username="";
        this.mail="";
        this.fechaAlta=null;
        this.passwd="";
        this.rol= null;
        this.centroCosto= null;
        this.roles=null;
        this.cambiarPass=false;
        this.legajo="";
        this.interno="";
        this.documento="";
        this.Token="";
        this.uid="";
    }
}