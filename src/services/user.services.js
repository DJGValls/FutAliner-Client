import service from "./config.services";

const createUserService = (NewUser) =>{
    return service.post("/user/create-user", NewUser)
}

const getUserService = (user) =>{
    return service.get("/user/user", user)
}

const editUserNamesService = (userNames) =>{
    return service.patch("/user/edit-names", userNames)
}

const editUserMailService = (userMail) =>{
    return service.patch("/user/edit-email", userMail)
}

const editUserPasswordService = (oldPassword, password1, password2) =>{
    return service.patch("/user/edit-password", oldPassword, password1, password2)
}

const editUserImageService = (userImage) =>{
    return service.patch("/user/edit-image", userImage)
}

const deleteUserService = (user) =>{
    return service.delete("/user/delete", user)
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