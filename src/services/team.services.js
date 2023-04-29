import service from "./config.services";

const createTeamService = (team) => {
  return service.post("/team/create-team", team);
};

const getTeamsService = (player) => {
  return service.get(`/team/${player}/team`);
};

const joinTeamService = (team) => {
  return service.post("/team/join-team", team);
};

const createTeamListGeneratorService = (team) => {
  return service.patch("/team/selected-players", team )
};

export {
  createTeamService,
  getTeamsService,
  joinTeamService,
  createTeamListGeneratorService,
};
