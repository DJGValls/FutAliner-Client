import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  // logged
  return isLoggedIn ? (
    <div>
      <div>
        <NavLink>
          <span onClick={handleLogout}>Salir</span>
        </NavLink>
      </div>
      <div>
        <NavLink to={"/"}>
          <span>Home</span>
        </NavLink>
      </div>
      <div>
        <NavLink to={"/user"}>
          <span>Perfil</span>
        </NavLink>
      </div>
    </div>
  ) : (
    //  not logged
    <div>
      <div>
        <NavLink to={"/"}>
          <span>Home</span>
        </NavLink>
      </div>

      <div>
        <NavLink to={"/login"}>
          <span>Login</span>
        </NavLink>
      </div>

      <div>
        <NavLink to={"/user/create-user"}>
          <span>Registrate</span>
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
