export class GenListaModel{
    id: number;    
    codigo: string;    
    nombre:string;
    descripcion:string;
    centroCostoPadreId:number;
    manejaPresupuesto:boolean;
    activo:boolean;
    constructor(){
        this.id=0;
        this.codigo="";        
        this.descripcion="";
        this.nombre="";
        this.centroCostoPadreId=0;
        this.manejaPresupuesto=false;
        this.activo=true;
    }
}

