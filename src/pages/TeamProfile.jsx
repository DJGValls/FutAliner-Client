import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getPlayerService } from "../services/player.services";
import { BallTriangle } from "react-loading-icons";
import ModalVote from "../components/ModalVote";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

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
      setUsers(foundPlayer.data.team.players);
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
    <div className="">
      <section className="container mt-auto">
        <Container fluid>
          <div className="">
            <div className="mt-3">
              <Row className="justify-content-center">
                <Col xs="auto">
                  <h1 className="text-big-yellow">{team.teamName}</h1>
                </Col>
              </Row>
              <Card bg="warning" className="p-1">
                <Card.Header className="text-center">
                  <h2 className="mt-2 text-big-green">Ficha de mi Jugador</h2>
                </Card.Header>
                <Card.Title className="mt-2">
                  <Row className="justify-content-left pt-2 ms-0">
                    <Col xs="auto" className="d-flex justify-content-center">
                      <Image
                        src={loggedUser.image}
                        alt="imagen de perfil"
                        className="image-profile-team "
                      />
                    </Col>
                    <Col xs="auto" className="d-flex justify-content-center">
                      <h4 className="mt-2 text-green">
                        {loggedUser.firstName} {loggedUser.lastName}
                      </h4>
                    </Col>
                    <Col xs="auto">
                      {/* <h4>Media Total:</h4> */}
                      <h4 className="mt-2 text-big-green">{player.total}</h4>
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Body>
                  <Row className="justify-content-left ms-0 ">
                    <Col xs="auto">
                      <h4 className="text-green">Portero:</h4>
                    </Col>
                    <Col xs="auto">
                      <h4 className="text-big-green">{player.portero}</h4>
                    </Col>
                  </Row>
                  <Row className="justify-content-left ms-0">
                    <Col xs="auto">
                      <h4 className="text-green">Defensa:</h4>
                    </Col>
                    <Col xs="auto">
                      <h4 className="text-big-green">{player.defensa}</h4>
                    </Col>
                  </Row>
                  <Row className="justify-content-left ms-0">
                    <Col xs="auto">
                      <h4 className="text-green">Ataque:</h4>
                    </Col>
                    <Col xs="auto">
                      <h4 className="text-big-green">{player.ataque}</h4>
                    </Col>
                  </Row>
                  <Row className="justify-content-left ms-0">
                    <Col xs="auto">
                      <h4 className="text-green">Técnica:</h4>
                    </Col>
                    <Col xs="auto">
                      <h4 className="text-big-green">{player.tecnica}</h4>
                    </Col>
                  </Row>
                  <Row className="justify-content-left ms-0">
                    <Col xs="auto">
                      <h4 className="text-green">Cardio:</h4>
                    </Col>
                    <Col xs="auto">
                      <h4 className="text-big-green">{player.cardio}</h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <h3>Jugadores</h3>
        <div>
          {users.map((eachPlayer) => {
            return eachPlayer.user.nickName === "" ? (
              <p key={eachPlayer.user._id} value={eachPlayer.user._id}>
                {eachPlayer.user.firstName} {eachPlayer.user.lastName}
                <ModalVote player={eachPlayer} />
                <br />
              </p>
            ) : (
              <p key={eachPlayer.user._id} value={eachPlayer.user._id}>
                "{eachPlayer.user.nickName}" {eachPlayer.user.lastName}
                <ModalVote player={eachPlayer} />
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
