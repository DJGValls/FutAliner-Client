import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserService } from "../services/user.services";
import { Alert, Button, Form } from "react-bootstrap";

function FormCreateUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleNickNameChange = (e) => setNickName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassword1Change = (e) => setPassword1(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      nickName,
      email,
      password1,
      password2,
    };
    try {
      await createUserService(newUser);
      navigate("/login");
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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="firstName"
                  value={firstName}
                  placeholder="Nombre"
                  onChange={handleFirstNameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="lastName"
                  value={lastName}
                  placeholder="Apellido"
                  onChange={handleLastNameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="nickName"
                  value={nickName}
                  placeholder="ailas"
                  onChange={handleNickNameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="password"
                  name="password1"
                  value={password1}
                  placeholder="contraseña"
                  onChange={handlePassword1Change}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="password"
                  name="password2"
                  value={password2}
                  placeholder="repite contraseña"
                  onChange={handlePassword2Change}
                />
                <Form.Text className="text-muted">
                El password debe tener al menos 6 caracteres, incluir una mayuscula y un caracter especial
                </Form.Text>
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
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680882326/FutAliner/REGISTRATE-GREEN_qx0ref.png"
                  alt="Registrar"
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

export default FormCreateUser;
