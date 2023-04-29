import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getPlayerService } from "../services/player.services";
import { getOthersUsersService } from "../services/user.services";
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
} from "react-bootstrap";

function TeamProfile() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const { playerId } = useParams();

  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedPlayersList, setSelectedPlayersList] = useState([]);

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
      let teamA = [];
      let teamB = [];
      let newTeamA = [];
      let newTeamB = [];
      console.log(newTeam);
      const generatedTeams = await createTeamListGeneratorService(newTeam);
      // navigate("/");
      // console.log(generatedTeams.data);
      teamA = generatedTeams.data.slice(0,1);
      teamB = generatedTeams.data.slice(1);
      // console.log(teamA);
      // console.log(teamB);

      teamA.forEach((element) => {
        element.forEach(async (player) => {
          const foundPlayer = await getPlayerService(player._id);
          const foundUserPlayer = await getOthersUsersService(
            foundPlayer.data.user
          );
          await newTeamA.push(foundUserPlayer);
          setTeamA(newTeamA);
        });
      });

      teamB.forEach((element) => {
        element.forEach(async (player) => {
          const foundPlayer = await getPlayerService(player._id);
          const foundUserPlayer = await getOthersUsersService(
            foundPlayer.data.user
          );
          await newTeamB.push(foundUserPlayer);
          setTeamB(newTeamB);
        });
      });
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  console.log(teamA);
  console.log(teamB);

  if (isFetching) {
    return <BallTriangle></BallTriangle>;
  }
  // console.log(player);
  // console.log(team);
  // console.log(loggedUser);
  // console.log(users);
  console.log(selectedPlayersList);

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
                  <th className="text-green">Selección</th>
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

              <tbody>
                {users.map((eachPlayer) => {
                  return (
                    <tr key={eachPlayer.user._id} value={eachPlayer.user._id}>
                      <td className="pt-4 text-center">
                        <section className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            value={eachPlayer._id}
                            onChange={handleSelectPlayer}
                          />

                          <OverlayTrigger
                            trigger={["hover", "focus"]}
                            placement="top"
                            overlay={
                              <Tooltip id={"tooltip-top"}>
                                Selecciona este jugador para tu lista de
                                asistentes al partido, cuando acabes tu
                                selección pulsa "haz equipos"
                              </Tooltip>
                            }
                          >
                            <img
                              src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681375371/FutAliner/INTERROGANTE-GREEN_dyvqgd.png"
                              alt="Interrogante"
                              width={20}
                              className="me-auto"
                            />
                          </OverlayTrigger>
                        </section>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-3">
                          <ModalVote player={eachPlayer} />
                        </p>
                      </td>
                      <td className="p-0">
                        {eachPlayer.user.nickName === "" ? (
                          <p className="d-flex justify-content-center mt-4 text-green">
                            {eachPlayer.user.firstName}
                          </p>
                        ) : (
                          <p className="d-flex justify-content-center mt-4 text-green">
                            "{eachPlayer.user.nickName}"{" "}
                          </p>
                        )}
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green">
                          {eachPlayer.total}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green">
                          {eachPlayer.portero}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green">
                          {eachPlayer.defensa}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green">
                          {eachPlayer.ataque}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green">
                          {eachPlayer.tecnica}
                        </p>
                      </td>
                      <td className="p-0">
                        <p className="d-flex justify-content-center mt-4 text-big-green">
                          {eachPlayer.cardio}
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
              onClick={handleSubmit}
            >
              <img
                src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681331946/FutAliner/HAZ-EQUIPOS-GREEN_w5tryf.png"
                alt="Haz Equipos"
                width={120}
              />
            </Button>
          </section>
        </Container>
      </section>

      <section className="container mt-auto">
        <Container fluid>
          <Card bg="warning" className="p-1 mt-4">
            <Card.Header className="text-center">
              <h2 className="mt-2 text-big-green">Equipos Generados</h2>
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Container>
      </section>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default TeamProfile;
