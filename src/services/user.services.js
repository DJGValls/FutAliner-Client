import service from "./config.services";

const createUserService = (user) =>{
    return service.post("/user/create-user", user)
}

const getUserService = (user) =>{
    return service.get("/user/user", user)
}


export{
    createUserService,
    getUserService,
}