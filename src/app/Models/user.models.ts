
export class UserModel {

    username: string;
    mail:string;
    password: string;
    role?:string;
    img?:string;
    uid?:string;
   

    constructor(){
        this.username="";
        this.mail = "gabrielrecio@gmail.com";
        this.password="";        
        this.role="";
        this.img="";        
    }

}