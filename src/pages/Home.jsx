import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { BallTriangle } from "react-loading-icons";
import { Button, Dropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(loggedUser._id);
      setUser(foundUser.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
      console.log(error);
    }
  };

  if (isFetching && isLoggedIn) {
    return (
      <div className="m-0 vh-100 row justify-content-center align-items-center">
        <div className="col-auto text-center">
          <BallTriangle stroke="#ffc000" />
        </div>
      </div>
    );
  }

  return isLoggedIn ? (
    <div className="row justify-content-center p-1 mt-auto">
      <section className="container mt-auto">
        <div className="text-center">
          <Image
            src={user.image}
            className="image-profile mt-4"
            alt="imagen de perfil"
          />
          <h1 className="text-big-yellow mt-2">Bienvenido</h1>
          <h4 className="text-big-medium-yellow">
            {user.firstName} {user.lastName}{" "}
          </h4>
        </div>
      </section>
      <section className="container mt-auto">
        <div className="text-center">
          <section className="d-flex justify-content-center">
            <div className="me-1">
              <Link to={"/team/create-team"}>
                <Button variant="warning" size="lg" type="submit">
                  <img
                    src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680987620/FutAliner/CREAR-EQUIPO-GREEN_qx0g8p.png"
                    alt="Crear Equipo"
                    width={120}
                  />
                </Button>
              </Link>
            </div>
            <div className="ms-1">
              <Link to={"/team/join-team"}>
                <Button variant="warning" size="lg" type="submit">
                  <img
                    src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680987620/FutAliner/UNIRSE--EQUIPO-GREEN_gxpnf5.png"
                    alt="Unirse a Equipo"
                    width={120}
                  />
                </Button>
              </Link>
            </div>
          </section>
          <section className="mt-3">
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true" variant="warning">
                <img
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680985212/FutAliner/SELECCIONA-EQUIPO-GREEN_xmpiiq.png"
                  alt="Sellecciona Equipo"
                  className="image-selecciona-equipo-button"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user.players.map((eachPlayer) => {
                  return (
                    <Dropdown.Item
                      key={eachPlayer.team._id}
                      value={eachPlayer.team._id}
                      href={`/team/${eachPlayer._id}/team`}
                      className=""
                    >
                      {eachPlayer.team.teamName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </section>
        </div>
      </section>
    </div>
  ) : (
    <div className="row justify-content-center p-1 mt-auto">
      <section className="container mt-auto">
        <div className="text-center">
          <Image
            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680737166/FutAliner/FutAliner_r4c39y.png"
            className="img-fluid"
            alt="FutAliner"
          />
        </div>
      </section>
      <section className="contanier m-5 mt-0">
        <div className="home-text fw-bold fs-6">
          <Carousel className="d-flex">
            <Carousel.Item className="mb-auto">
              <h3 className="text-center m-0 mt-3">Regístrate</h3>
              <p className="text-center p-5 m-5 mt-0">
                Registrate, entra y adéntrate en FutAliner.
              </p>
            </Carousel.Item>
            <Carousel.Item className="mb-auto">
              <h3 className="text-center m-0 mt-3">Crea o únete a un equipo</h3>
              <p className="text-center p-5 m-5 mt-0">
                Podrás formar parte de tantos equipos como desees.
              </p>
            </Carousel.Item>
            <Carousel.Item className="mb-auto">
              <h3 className="text-center m-0 mt-3">Vota a tus compañeros</h3>
              <p className="text-center p-5 m-5 mt-0">
                Vota todas las categorias de tus compañeros y mira su
                puntuación.
              </p>
            </Carousel.Item>
            <Carousel.Item className="mb-auto">
              <h3 className="text-center m-0 mt-3">
                Deja que FutAliner haga equipos
              </h3>
              <p className="text-center p-5 m-5 mt-0">
                Selecciona a los participantes del partido y deja que FutAliner
                haga su magia y equilibre los equipos.
              </p>
            </Carousel.Item>
          </Carousel>
        </div>
        <footer className="d-flex justify-content-evenly p-2 mt-1">
          <Link to="https://www.linkedin.com/in/daniel-jimenez-07092754/">
            <img
              className="footer-image"
              src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680885985/FutAliner/linkedin-logo-yellow_ukaxtj.png"
              alt="Linkedin"
            />
          </Link>
          <Link to="https://github.com/DJGValls">
            <img
              className="footer-image"
              src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680885985/FutAliner/GitHub-Logo-yellow_k3hqoi.png"
              alt="GitHub"
            />
          </Link>
        </footer>
      </section>
    </div>
  );
}

export default Home;
