export class AplicacionModel{
    id: number;    
    codigo: string;    
    descripcion:string;
    activo:boolean;
    observaciones:string;

    constructor(){
        this.id=0;
        this.codigo="";        
        this.descripcion="";
        this.activo=true;
        this.observaciones="";
    }
}