class PocketBase {


    protected setPocket = (key:string, value:string)=>{
        localStorage.setItem(key, value);
    }
    protected getPocket = (key:string)=>{
        return localStorage.getItem(key)
    }
}

export default PocketBase;
