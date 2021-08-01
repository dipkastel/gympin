export class UserModel{

    username = "";
    password = "";
    token = "";

    constructor() {
    }
    isLoggedIn= ()=>{
        return this.token !== "";
    }

    saveUser = () => {
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        localStorage.setItem('token', this.token);

    }
}
