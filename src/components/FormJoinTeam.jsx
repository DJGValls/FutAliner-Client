import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { joinTeamService } from "../services/team.services";
import { Alert, Button, Form } from "react-bootstrap";

function FormJoinTeam() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleTeamNameChange = (e) => setTeamName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeam = {
      teamName,
      password,
    };
    try {
      await joinTeamService(newTeam);
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  const handleClose = () => setShow(false);
  const hnadleShow = () => {
    errorMessage !== "" ? setShow(true) : setShow(false);
  };

  return isLoggedIn ? (
    <div className="d-flex justify-content-center pt-0 p-5">
      <div className="row text-center pe-5 ps-5">
        <section>
          <img
            className="big-logo-image"
            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680987620/FutAliner/UNIRSE--EQUIPO-YELLOW_m05g0c.png"
            alt="Crear un Equipo"
          />
        </section>
        <section className="ps-5 pe-5">
          <div className="ps-1 pe-1">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="teamName"
                  value={teamName}
                  placeholder="Introduce nombre del equipo"
                  onChange={handleTeamNameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Introduce la contraseña"
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <div>
                {show ? (
                  <Alert variant="danger" onClose={handleClose} dismissible>
                    <Alert.Heading>Ooops...</Alert.Heading>
                    <p>{errorMessage}</p>
                  </Alert>
                ) : null}
              </div>
              <Button
                variant="warning"
                size="lg"
                type="submit"
                value="Registrar"
                onClick={hnadleShow}
              >
                <img
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680987620/FutAliner/UNIRSE--EQUIPO-GREEN_gxpnf5.png"
                  alt="Registrar"
                  width={120}
                />
              </Button>
            </Form>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div>
      <Navigate to={"/login"}></Navigate>
    </div>
  );
}

export default FormJoinTeam;
