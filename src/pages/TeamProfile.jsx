import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getPlayerService } from "../services/player.services";
import { BallTriangle } from "react-loading-icons";
import ModalVote from "../components/ModalVote";
import { Card, Col, Container, Image, Row, Table } from "react-bootstrap";

function TeamProfile() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedUser } = useContext(AuthContext);
  const { playerId } = useParams();

  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [show, setShow] = useState(false);

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

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
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
      <section className="container mt-auto">
        <Container fluid>
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
                <Table responsive="sm">
                  <tbody>
                    <tr>
                      <Row className="justify-content-left ">
                        <Col xs="auto">
                          <img
                            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/PORTERO-GREEN_yot9ml.png"
                            alt="Portero"
                            width={50}
                          />
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-green">Portero:</h4>
                        </Col>

                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{player.portero}</h4>
                        </Col>
                      </Row>
                    </tr>
                    <tr>
                      <Row className="justify-content-left">
                        <Col xs="auto">
                          <img
                            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/DEFENSA-GREEN_fm5aow.png"
                            alt="Defensa"
                            width={50}
                          />
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-green">Defensa:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{player.defensa}</h4>
                        </Col>
                      </Row>
                    </tr>
                    <tr>
                      <Row className="justify-content-left">
                        <Col xs="auto">
                          <img
                            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/ATAQUE-GREEN_fwqccv.png"
                            alt="Ataque"
                            width={50}
                          />
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-green">Ataque:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{player.ataque}</h4>
                        </Col>
                      </Row>
                    </tr>
                    <tr>
                      <Row className="justify-content-left">
                        <Col xs="auto">
                          <img
                            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/TECNICA-GREEN_gti3o6.png"
                            alt="Tecnica"
                            width={50}
                          />
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-green">Técnica:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{player.tecnica}</h4>
                        </Col>
                      </Row>
                    </tr>
                    <tr>
                      <Row className="justify-content-left">
                        <Col xs="auto">
                          <img
                            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/CARDIO-GREEN_hcwdx8.png"
                            alt="Cardio"
                            width={50}
                          />
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-green">Cardio:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{player.cardio}</h4>
                        </Col>
                      </Row>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </section>
      <section className="container mt-auto">
        <Container fluid>
          <Card bg="warning" className="p-1 mt-4">
            <Card.Header className="text-center">
              <h2 className="mt-2 text-big-green">Jugadores</h2>
            </Card.Header>
            <Table responsive>
              <thead className="text-center">
                <tr>
                  <th className="text-green">Selecciona</th>
                  <th className="text-green">Cualifica</th>
                  <th className="text-green">Nombre</th>
                  <th className="text-green">Media</th>
                  <th>
                    <img
                      src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/PORTERO-GREEN_yot9ml.png"
                      alt="Portero"
                      width={50}
                    />
                  </th>
                  <th>
                    <img
                      src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/DEFENSA-GREEN_fm5aow.png"
                      alt="Defensa"
                      width={50}
                    />
                  </th>
                  <th>
                    <img
                      src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/ATAQUE-GREEN_fwqccv.png"
                      alt="Ataque"
                      width={50}
                    />
                  </th>
                  <th>
                    <img
                      src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/TECNICA-GREEN_gti3o6.png"
                      alt="Tecnica"
                      width={50}
                    />
                  </th>
                  <th>
                    <img
                      src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681294167/FutAliner/CARDIO-GREEN_hcwdx8.png"
                      alt="Cardio"
                      width={50}
                    />
                  </th>
                </tr>
              </thead>
              {users.map((eachPlayer) => {
                return (
                  <tbody>
                    <tr>
                      <td className="p-0">
                        <div className="form-check form-switch d-flex justify-content-center mt-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            
                          />
                        </div>
                        
                      </td>
                      <td className="p-0">
                        <p
                          key={eachPlayer.user._id}
                          value={eachPlayer.user._id}
                          className="d-flex justify-content-center mt-3"
                        >
                          <ModalVote player={eachPlayer} />
                        </p>
                      </td>
                      <td className="p-0">
                        {eachPlayer.user.nickName === "" ? (
                          <p
                            key={eachPlayer.user._id}
                            value={eachPlayer.user._id}
                            className="d-flex justify-content-center mt-4 text-green"
                          >
                            {eachPlayer.user.firstName}
                          </p>
                        ) : (
                          <p
                            key={eachPlayer.user._id}
                            value={eachPlayer.user._id}
                            className="d-flex justify-content-center mt-4 text-green"
                          >
                            "{eachPlayer.user.nickName}"{" "}
                          </p>
                        )}
                      </td>
                      <td className="p-0">
                        <p
                          key={eachPlayer.user._id}
                          value={eachPlayer.user._id}
                          className="d-flex justify-content-center mt-4 text-big-green"
                        >
                          {eachPlayer.total}
                        </p>
                      </td>
                      <td className="p-0">
                        <p
                          key={eachPlayer.user._id}
                          value={eachPlayer.user._id}
                          className="d-flex justify-content-center mt-4 text-big-green"
                        >
                          {eachPlayer.portero}
                        </p>
                      </td>
                      <td className="p-0">
                        <p
                          key={eachPlayer.user._id}
                          value={eachPlayer.user._id}
                          className="d-flex justify-content-center mt-4 text-big-green"
                        >
                          {eachPlayer.defensa}
                        </p>
                      </td>
                      <td className="p-0">
                        <p
                          key={eachPlayer.user._id}
                          value={eachPlayer.user._id}
                          className="d-flex justify-content-center mt-4 text-big-green"
                        >
                          {eachPlayer.ataque}
                        </p>
                      </td>
                      <td className="p-0">
                        <p
                          key={eachPlayer.user._id}
                          value={eachPlayer.user._id}
                          className="d-flex justify-content-center mt-4 text-big-green"
                        >
                          {eachPlayer.tecnica}
                        </p>
                      </td>
                      <td className="p-0">
                        <p
                          key={eachPlayer.user._id}
                          value={eachPlayer.user._id}
                          className="d-flex justify-content-center mt-4 text-big-green"
                        >
                          {eachPlayer.cardio}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </Card>
        </Container>
      </section>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default TeamProfile;
