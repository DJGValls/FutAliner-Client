import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Nav, Navbar } from "react-bootstrap";

function NavBar() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  // logged
  return (
    <div className="my-navbar">
      {isLoggedIn ? (
      <div className="container">
        <Navbar>
          <Nav>
            <div>
              <Nav.Link>
                <span onClick={handleLogout}>Salir</span>
              </Nav.Link>
            </div>
            <div>
              <Nav.Link to={"/"}>
                <span>Home</span>
              </Nav.Link>
            </div>
            <div>
              <Nav.Link to={"/user"}>
                <span>Perfil</span>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar>
      </div>
      ) : ( // not logged
      <div className="container">
        <Navbar>
          <Nav>
            <div>
              <Nav.Link to={"/"}>
                <span>Home</span>
              </Nav.Link>
            </div>

            <div>
              <Nav.Link to={"/login"}>
                <span>Login</span>
              </Nav.Link>
            </div>

            <div>
              <Nav.Link to={"/user/create-user"}>
                <span>Registrate</span>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar>
      </div>
      )}
    </div>
  );
}

export default NavBar;
