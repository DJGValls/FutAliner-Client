import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getPlayerService } from "../services/player.services";
import { BallTriangle } from "react-loading-icons";
import ModalVote from "../components/ModalVote";

function TeamProfile() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedUser } = useContext(AuthContext);
  const { playerId } = useParams();

  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundPlayer = await getPlayerService(playerId);
      setPlayer(foundPlayer.data);
      setTeam(foundPlayer.data.team);
      setUsers(
        foundPlayer.data.team.players
        // foundPlayer.data.team.players.forEach(eachPlayer => {
        //     console.log(eachPlayer.user);
        // })
      );
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
      console.log(error);
    }
  };

  if (isFetching) {
    return <BallTriangle></BallTriangle>;
  }

  console.log(player);
  console.log(team);
  console.log(loggedUser);
  console.log(users);

  return loggedUser._id === player.user ? (
    <div>
      <h1>{team.teamName}</h1>
      <section>
        <div>
          <img src={loggedUser.image} alt="imagen de perfil" />
        </div>
        <br />
        <div>
          <h3>
            {loggedUser.firstName} {loggedUser.lastName}
          </h3>
        </div>
        <div>
          <h4>Portero:</h4>
          <p>{player.portero}</p>
        </div>
        <div>
          <h4>Defensa:</h4>
          <p>{player.defensa}</p>
        </div>
        <div>
          <h4>Ataque:</h4>
          <p>{player.ataque}</p>
        </div>
        <div>
          <h4>Técnica:</h4>
          <p>{player.tecnica}</p>
        </div>
        <div>
          <h4>Cardio:</h4>
          <p>{player.cardio}</p>
        </div>
      </section>
      <section>
        <h3>Jugadores</h3>
        <div>
          {users.map((eachPlayer) => {
            return eachPlayer.user.nickName === "" ? (
              <p key={eachPlayer.user._id} value={eachPlayer.user._id}>
                {eachPlayer.user.firstName} {eachPlayer.user.lastName}
                <ModalVote />
                <br />
              </p>
            ) : (
              <p key={eachPlayer.user._id} value={eachPlayer.user._id}>
                {eachPlayer.user.firstName} "{eachPlayer.user.nickName}"
                <ModalVote />
                <br />
              </p>
            );
          })}
        </div>
      </section>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default TeamProfile;
