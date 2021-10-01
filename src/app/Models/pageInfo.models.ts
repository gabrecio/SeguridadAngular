export class PageInfoModel{
    page: number;    
    itemsPerPage: number;    
    sortBy: string;      
    reverse:boolean;
    search:string;
    totalItems: number;    
    activo: number;        
    

    constructor(){
        this.page=1;
        this.page=10;
        this.sortBy="";        
        this.reverse=false;
        this.search="";
        this.totalItems=1;
        this.activo=1;
    }
}
/*
public class PageInfo
{
    public int Page  { get; set; }
    public int ItemsPerPage { get; set; }
    public string SortBy { get; set; }
    public bool Reverse { get; set; }
    public string  Search  { get; set; }
    public int TotalItems { get; set; }
    public int Activo { get; set; }
    public int CentroCostoId { get; set; }
    public List<string> Estados { get; set; }
    public string App { get; set; }
}*/