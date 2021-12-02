export class RolModel{
    id: number;    
    nombre: string;       
    observaciones: string;
    activo:boolean;
    aplicacion:object

    constructor(){
        this.id=0;
        this.nombre="";        
        this.activo=true;
        this.observaciones="";
        this.aplicacion= null;
    }
}