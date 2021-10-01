export class RolModel{
    id: number;    
    nombre: string;    
    descripcion:string;
    observaciones: string;

    constructor(){
        this.id=0;
        this.nombre="";        
        this.descripcion="";
        this.observaciones="";
    }
}