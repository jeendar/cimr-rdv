export function setRole(token:string){
    localStorage.setItem("token",token);
}

export function getRole(){
    return localStorage.getItem("admin");
}