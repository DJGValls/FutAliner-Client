import service from "./config.services";

const createUserService = (user) =>{
    return service.post("/user/create-user", user)
}


export{
    createUserService,
}