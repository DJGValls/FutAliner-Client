import service from "./config.services";

const createUserService = (NewUser) =>{
    return service.post("/user/create-user", NewUser)
}

const getUserService = (user) =>{
    return service.get("/user/user", user)
}

const editUserNamesService = (userNames) =>{
    return service.get("/user/edit-names", userNames)
}

const editUserMailService = (userMail) =>{
    return service.get("/user/edit-email", userMail)
}

const editUserPasswordService = (password1, password2) =>{
    return service.get("/user/edit-password", password1, password2)
}

const editUserImageService = (userImage) =>{
    return service.get("/user/edit-image", userImage)
}

const deleteUserService = (user) =>{
    return service.get("/user/delete", user)
}


export{
    createUserService,
    getUserService,
    editUserNamesService,
    editUserMailService,
    editUserPasswordService,
    editUserImageService,
    deleteUserService,
}