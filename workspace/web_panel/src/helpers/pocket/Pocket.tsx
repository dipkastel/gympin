import PocketBase from "./PocketBase";

var TOKEN_KEY :string =  "TOKEN_KEY";

class Pocket extends PocketBase{
    private static pocket: Pocket  ;
    private constructor() {
        super()
    }
    static getInstance(){
        if(this.pocket == null)
            this.pocket = new Pocket();
        return this.pocket;
    }

    setToken=(token:string)=>{
        this.setPocket(TOKEN_KEY,token);
    }
    public getToken(){

       return this.getPocket(TOKEN_KEY) ?this.getPocket(TOKEN_KEY) as string:"";
    }


}
export default Pocket;
