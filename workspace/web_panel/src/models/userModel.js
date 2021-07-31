class UserModel{

    username = "";
    password = "";
    token = "";

    constructor() {
        this.password = JSON.parse(localStorage.getItem('password')||"");
        this.username = JSON.parse(localStorage.getItem('username')||"");
        this.token = JSON.parse(localStorage.getItem('token')||"");
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
module.exports = UserModel;
