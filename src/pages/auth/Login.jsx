import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";
import { Alert, Button, Form } from "react-bootstrap";


function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const response = await loginService(user);

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();

      console.log("estás logeado");
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

  return (
    <div className="d-flex justify-content-center pt-0 p-5">
      <div className="row text-center pe-5 ps-5">
        <section>
          <img
            className="big-logo-image"
            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680820032/FutAliner/FutAliner_yellow-peque%C3%B1o_lkvqhu.png"
            alt=""
          />
        </section>
        <section className="ps-5 pe-5">
          <div className="ps-1 pe-1">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  className="text-center"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={handleEmailChange}
                />
                <Form.Text className="text-muted">
                  No compartas tu email con nadie más
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  className="text-center"
                  type="password"
                  name="password1"
                  value={password}
                  placeholder="password"
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
                value="Entrar"
                onClick={hnadleShow}
              >
                <img
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680882326/FutAliner/ENTRA-GREEN_qernrt.png"
                  alt="Entrar"
                  width={120}
                />
              </Button>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
