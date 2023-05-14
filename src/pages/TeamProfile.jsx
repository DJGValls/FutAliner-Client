import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getPlayerService } from "../services/player.services";
import { BallTriangle } from "react-loading-icons";
import ModalVote from "../components/ModalVote";
import { createTeamListGeneratorService } from "../services/team.services";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
  Modal,
} from "react-bootstrap";

function TeamProfile() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const { playerId } = useParams();

  const [player, setPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [team, setTeam] = useState(null);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  // const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const [selectedPlayersList, setSelectedPlayersList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundPlayer = await getPlayerService(playerId);
      const goalkeeperStats = foundPlayer.data.portero;
      const playerStats =
        (foundPlayer.data.defensa +
          foundPlayer.data.tecnica +
          foundPlayer.data.ataque +
          foundPlayer.data.cardio) /
        4;
      const checkIfGoalkeeper = () => {
        if (goalkeeperStats > playerStats) {
          return setPlayerStats(goalkeeperStats);
        } else setPlayerStats(playerStats);
      };
      setPlayer(foundPlayer.data);
      setTeam(foundPlayer.data.team);
      setUsers(foundPlayer.data.team.players);
      checkIfGoalkeeper();
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
      console.log(error);
    }
  };

  const handleSelectPlayer = (e) => {
    if (selectedPlayersList.includes(e.target.value)) {
      setSelectedPlayersList(
        selectedPlayersList.filter((sel) => sel !== e.target.value)
      );
    } else {
      setSelectedPlayersList([...selectedPlayersList, e.target.value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeam = {
      selectedPlayersList,
    };
    try {
      const generatedTeams = await createTeamListGeneratorService(newTeam);
      console.log(generatedTeams.data);
      setTeamA(generatedTeams.data[0]);
      setTeamB(generatedTeams.data[1]);
      setScoreA(generatedTeams.data[2]);
      setScoreB(generatedTeams.data[3]);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(teamA);
  console.log(teamB);
  console.log(scoreA);
  console.log(scoreB);
  console.log(selectedPlayersList);

  if (isFetching) {
    return (
      <div className="m-0 vh-100 row justify-content-center align-items-center">
        <div className="col-auto text-center">
          <BallTriangle stroke="#ffc000" />
        </div>
      </div>
    );
  }

  return loggedUser._id === player.user ? (
    <>
      <section className="container mt-auto">
        <Container fluid>
          <section className="mt-3">
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
                      alt=""
                      className="image-profile-team "
                    />
                  </Col>
                  <Col xs="auto" className="d-flex justify-content-center">
                    <h4 className="mt-2 text-green">{loggedUser.firstName}</h4>
                  </Col>
                  <Col xs="auto">
                    {/* <h4>Media Total:</h4> */}
                    <h4 className="mt-2 text-big-green">{playerStats}</h4>
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
                          <h4 className="text-green">Portería:</h4>
                        </Col>

                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{(player.portero).toFixed(2)}</h4>
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
                          <h4 className="text-green ms-0">Nivel Def:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green ms-0">
                            {((player.defensa + player.cardio) / 2).toFixed(2)}
                          </h4>
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
                          <h4 className="text-green">Nivel Ata:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">
                            {((player.ataque + player.cardio) / 2).toFixed(2)}
                          </h4>
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
                          <h4 className="text-green">Nivel Técnico:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{(player.tecnica).toFixed(2)}</h4>
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
                          <h4 className="text-green">Nivel Físico:</h4>
                        </Col>
                        <Col xs="auto" className="mt-3">
                          <h4 className="text-big-green">{(player.cardio).toFixed(2)}</h4>
                        </Col>
                      </Row>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </section>
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
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="top"
                    overlay={
                      <Tooltip id={"tooltip-top"}>
                        Selecciona el jugador para tu lista de asistentes al
                        partido, cuando acabes tu selección pulsa "haz equipos"
                      </Tooltip>
                    }>
                    <th className="text-green">Selección</th>
                  </OverlayTrigger>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="top"
                    overlay={
                      <Tooltip id={"tooltip-top"}>
                        Pulsa el icono y califica a tu compañero
                      </Tooltip>
                    }>
                    <th className="text-green">Califica</th>
                  </OverlayTrigger>

                  <th className="text-green">Perfil</th>
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

              <tbody>
                {users.map((eachPlayer) => {
                  console.log(eachPlayer);
                  const goalkeeperStats = eachPlayer.portero;
                  const playerStats =
                    (eachPlayer.defensa +
                      eachPlayer.tecnica +
                      eachPlayer.ataque +
                      eachPlayer.cardio) /
                    4;
                  const checkIfGoalkeeper = () => {
                    if (goalkeeperStats > playerStats) {
                      return goalkeeperStats;
                    } else return playerStats;
                  };
                  return (
                    <tr key={eachPlayer.user._id} value={eachPlayer.user._id}>
                      <td className="pt-4 text-center">
                        <section className="form-check form-switch d-flex justify-content-center aling-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            value={eachPlayer._id}
                            onChange={handleSelectPlayer}
                          />
                        </section>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-3">
                          <ModalVote player={eachPlayer} />
                        </p>
                      </td>
                      <td xs="auto" className="p-0">
                      <div className="d-flex justify-content-center mt-4">
                        <Image
                          src={eachPlayer.user.image}
                          alt=""
                          className="image-profile-team"
                        />
                      </div>
                      </td>
                      <td className="p-0">
                        {eachPlayer.user.nickName === "" ? (
                          <p className="d-flex justify-content-center mt-4 text-green text-nowrap">
                            {eachPlayer.user.firstName}
                          </p>
                        ) : (
                          <p className="d-flex justify-content-center mt-4 text-green text-nowrap">
                            "{eachPlayer.user.nickName}"{" "}
                          </p>
                        )}
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green text-nowrap">
                          {checkIfGoalkeeper()}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green text-nowrap">
                          {(eachPlayer.portero).toFixed(2)}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green text-nowrap">
                          {((eachPlayer.defensa + eachPlayer.cardio) / 2).toFixed(2)}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green text-nowrap">
                          {((eachPlayer.ataque + eachPlayer.cardio) / 2).toFixed(2)}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green text-nowrap">
                          {(eachPlayer.tecnica).toFixed(2)}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green text-nowrap">
                          {(eachPlayer.cardio).toFixed(2)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Container>
      </section>
      <section className="container mt-3">
        <Container fluid>
          <section className="text-center">
            <Button
              type="submit"
              variant="warning"
              className="btn btn-block"
              // onClick={handleSubmit}
              onClick={handleShow}>
              <img
                src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681331946/FutAliner/HAZ-EQUIPOS-GREEN_w5tryf.png"
                alt="Haz Equipos"
                width={120}
              />
            </Button>
          </section>
        </Container>
      </section>

      <Container fluid>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="modal-dialog-centered modal-lg">
          {/* header */}
          <Modal.Header closeButton className="text-center">
            <Modal.Title>
              <h2 className="mt-2 text-big-green">Equipos Generados</h2>
            </Modal.Title>
          </Modal.Header>

          {/* Body */}
          <Modal.Body>
            <Row className="text-center">
              <Col className="">
                <img
                  width={100}
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1683330028/FutAliner/TEAM-A-GREEN_aj7ndt.png"
                  alt="Equipo Negro"
                />
              </Col>
              <Col className="">
                <img
                  width={100}
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1683330028/FutAliner/TEAM-B-GREEN_utvaxi.png"
                  alt="Equipo Color"
                />
              </Col>
            </Row>
            <Row className="text-center">
              <Col className="pt-2">
                {teamA.map((eachPlayer) => {
                  return (
                    <Row className="">
                      {eachPlayer.nickName === "" ? (
                        <p className="d-flex justify-content-center mt-1 text-big-green text-nowrap">
                          {eachPlayer.firstName}
                        </p>
                      ) : (
                        <p className="d-flex justify-content-center mt-1 text-big-green text-nowrap">
                          "{eachPlayer.nickName}"{" "}
                        </p>
                      )}
                    </Row>
                  );
                })}
              </Col>
              <Col className="pt-2">
                {teamB.map((eachPlayer) => {
                  return (
                    <Row className="">
                      {eachPlayer.nickName === "" ? (
                        <p className="d-flex justify-content-center mt-1 text-big-green text-nowrap">
                          {eachPlayer.firstName}
                        </p>
                      ) : (
                        <p className="d-flex justify-content-center mt-1 text-big-green text-nowrap">
                          "{eachPlayer.nickName}"{" "}
                        </p>
                      )}
                    </Row>
                  );
                })}
              </Col>
            </Row>
            {/* footer */}
            <Row className="text-center">
              <Col className="pt-3">
                <p className="text-big-green fw-bold fst-italic">
                  Valoración Equipo
                </p>
                <h3 className="text-big-green">{scoreA} pts</h3>
              </Col>
              <Col className="pt-3">
                <p className="text-big-green fw-bold fst-italic">
                  Valoración Equipo
                </p>
                <h3 className="text-big-green">{scoreB} pts</h3>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="justify-content-around">
            <section className="text-center">
              <Button
                type="submit"
                // variant="warning"

                className="btn btn-block"
                onClick={handleSubmit}
                // onClick={handleShow}
              >
                <img
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681331946/FutAliner/HAZ-EQUIPOS-YELLOW_mqfodz.png"
                  alt="Haz Equipos"
                  width={120}
                />
              </Button>
            </section>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default TeamProfile;
