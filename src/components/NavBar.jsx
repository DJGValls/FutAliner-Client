import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Navbar } from "react-bootstrap";

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
          <Navbar bg="warning" sticky="top" className="rounded-pill mt-3 ms-2">
            <Container className="d-flex justify-content-between">
              <Navbar.Brand href={"/"} id="navbar" className="text-center ms-5">
                <img
                  id="image-navbar"
                  alt=""
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680820032/FutAliner/FutAliner_green-peque%C3%B1o_c6yefy.png"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Navbar.Brand href={"/user"} id="navbar" className="text-center">
                <img
                  id="image-navbar"
                  alt=""
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680882326/FutAliner/PERFIL-GREEN_q5wl6j.png"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Navbar.Brand
                onClick={handleLogout}
                id="navbar"
                className="text-center me-5"
              >
                <img
                  id="image-navbar"
                  alt=""
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680882326/FutAliner/SALIR-GREEN_ufgrcz.png"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
      ) : (
        // not logged
        <div className="container">
          <Navbar bg="warning" sticky="top" className="rounded-pill mt-3 ms-2">
            <Container className="d-flex justify-content-between">
              <Navbar.Brand href={"/"} id="navbar" className="text-center ms-5">
                <img
                  id="image-navbar"
                  alt=""
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680819507/FutAliner/home-green_sf4bob.png"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Navbar.Brand href={"/login"} id="navbar" className="text-center">
                <img
                  id="image-navbar"
                  alt=""
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680882326/FutAliner/ENTRA-GREEN_qernrt.png"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Navbar.Brand
                href={"/user/create-user"}
                id="navbar"
                className="text-center me-5"
              >
                <img
                  id="image-navbar"
                  alt=""
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680882326/FutAliner/REGISTRATE-GREEN_qx0ref.png"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
      )}
    </div>
  );
}

export default NavBar;
