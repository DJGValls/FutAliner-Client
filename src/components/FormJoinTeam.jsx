import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { joinTeamService } from "../services/team.services";

function FormJoinTeam() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  return isLoggedIn ? (
    <div>
      <h1>FormCreateTeam</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="teamName"
              value={teamName}
              placeholder="Introduzca un nombre de equipo"
              onChange={handleTeamNameChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Introduzca una contraseña"
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            {errorMessage !== "" ? (
              <p class="date-of-birth-text">{errorMessage}</p>
            ) : null}
          </div>
          <div>
            <input type="submit" value="Añadir Equipo" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>
      <Navigate to={("/login")}></Navigate>
    </div>
  );
}

export default FormJoinTeam;
