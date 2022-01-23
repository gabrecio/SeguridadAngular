export class PermisosModel{
    menu: string;    
    imagen: string;       
    esCentroCosto: boolean;
    operaciones : PermisoModel[]    

    constructor(){
        
        this.menu="";        
        this.imagen="";        
        this.esCentroCosto=true;     
        this.operaciones=null;
    }
}

export class PermisoModel{
    operacion: string;    
    imagen: string;       
    activo: boolean;
    listaPermisoId:number;


    constructor(){
        
        this.operacion="";        
        this.imagen="";        
        this.activo=true;     
        this.listaPermisoId=0;
    }
}