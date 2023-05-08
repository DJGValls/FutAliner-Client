import service from "./config.services";

const editVoteService = (playerId, player) => {
  return service.patch(`/player/${playerId}/votes`, player);
};

const getPlayerService = (playerId) => {
  return service.get(`/player/${playerId}`);
};

const deletePlayerService = (playerId) => {
  return service.delete(`/player/${playerId}/delete`);
};

export { editVoteService, getPlayerService, deletePlayerService };
