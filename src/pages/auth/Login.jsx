import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";


function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    //   navigate("/user");
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
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="password1"
            value={password}
            placeholder="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div>{errorMessage !== "" ? <p>{errorMessage}</p> : null}</div>

        <div>
          <input type="submit" value="Entrar" />
        </div>
      </form>
    </div>
  );
}

export default Login;
