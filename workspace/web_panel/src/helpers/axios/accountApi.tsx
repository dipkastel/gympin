import AxiosClient from "./AxiosClient";



const Client = new AxiosClient().getAxios();
class accountApi {
    constructor() {
    }

    static LoginPanel=(username:string,password:string)=>{
        return Client.get("/v1/user/loginpanel",{
            auth:{
                username:username,
                password:password
            }
        });
    }

}

export default accountApi;
