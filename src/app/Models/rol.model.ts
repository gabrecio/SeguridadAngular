export class RolModel{
    id: number;    
    nombre: string;       
    observaciones: string;
    activo:boolean;
    aplicacion:object;
    asociado:boolean;
    fechaAlta:Date;
    permisos: object[]

    constructor(){
        this.id=0;
        this.nombre="";        
        this.activo=true;
        this.observaciones="";
        this.aplicacion= null;
        this.asociado=false;
        this.fechaAlta= null;
        this.permisos=null;
    }
}