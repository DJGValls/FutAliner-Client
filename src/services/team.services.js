import service from "./config.services";

const createTeamService = (team) =>{
    return service.post("/team/create-team", team)
}

const getTeamsService = (player) =>{
    return service.get(`/team/${player}/team`)
}

export {
    createTeamService,
    getTeamsService,
}