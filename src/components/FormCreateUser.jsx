import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createUserService } from "../services/user.services";

function FormCreateUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        await createUserService(newUser)
        navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
    <h1>Registro de Usuario</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Nombre"
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Apellido"
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="nickName"
              value={nickName}
              placeholder="ailas"
              onChange={handleNickNameChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="email"
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password1"
              value={password1}
              placeholder="contraseña"
              onChange={handlePassword1Change}
            />
          </div>
          <div>
            <input
              type="password"
              name="password2"
              value={password2}
              placeholder="repite contraseña"
              onChange={handlePassword2Change}
            />
          </div>
          <div>
            {errorMessage !== "" ? (
              <p class="date-of-birth-text">{errorMessage}</p>
            ) : null}
          </div>
          <div>
          <input type="submit" value="Registrar" />
        </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreateUser;
