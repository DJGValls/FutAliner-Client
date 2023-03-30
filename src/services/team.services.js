import service from "./config.services";

const createTeamService = (team) =>{
    return service.post("/team/create-team", team)
}

export {
    createTeamService,
}