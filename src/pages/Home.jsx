import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { BallTriangle } from "react-loading-icons";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
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
    return <BallTriangle />;
  }

  return isLoggedIn ? (
    <div>
      <h1>Home Logged</h1>
      <img src={user.image} alt="imagen de perfil" />
      <h3>
        Bienvenido {user.firstName} {user.lastName}{" "}
      </h3>
      <h3>lista de equipos</h3>

      <DropdownButton id="dropdown-basic-button" title="Selecciona un equipo">
        {user.players.map((eachPlayer) => {
          return (
            <Dropdown.Item
              key={eachPlayer.team._id}
              value={eachPlayer.team._id}
              href={`/team/${eachPlayer._id}/team`}
            >
              {eachPlayer.team.teamName}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <div>
        <Link to={"/team/create-team"}>
          <input type="submit" value="crear equipo" />
        </Link>
      </div>
      <div>
        <Link to={"/team/join-team"}>
          <input type="submit" value="unirse a equipo" />
        </Link>
      </div>
    </div>
  ) : (
    // <div className="position-relative">
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
                Entra, registrate y deja que FutAliner haga equipos por ti.
              </p>
            </Carousel.Item>
            <Carousel.Item className="mb-auto">
              <h3 className="text-center m-0 mt-3">Crea un equipo o únete</h3>
              <p className="text-center p-5 m-5 mt-0">
                Podrás formar parte de tantos equipos como desees.
              </p>
            </Carousel.Item>
            <Carousel.Item className="mb-auto">
              <h3 className="text-center m-0 mt-3">Vota a tus compañeros</h3>
              <p className="text-center p-5 m-5 mt-0">
                Vota todas las categorias de tus compañeros y mira tu
                puntuación.
              </p>
            </Carousel.Item>
            <Carousel.Item className="mb-auto">
              <h3 className="text-center m-0 mt-3">
                Deja que FutAliner haga equipos
              </h3>
              <p className="text-center p-5 m-5 mt-0">
                Selecciona a los particifantes del partido y deja que FutAliner
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
