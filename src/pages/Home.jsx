import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { BallTriangle } from "react-loading-icons";

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

  if (isFetching) {
    return <BallTriangle />;
  }

  if (isLoggedIn) {
    return (
      <div>
        <h1>Home Logged</h1>
        <img src={user.image} alt="imagen de perfil" />
        <h3>
          Bienvenido {user.firstName} {user.lastName}{" "}
        </h3>
        <h3>lista de equipos</h3>
        <div>
          <Link to={"/team/create-team"}>
            <input type="submit" value="crear equipo" />
          </Link>
        </div>
        <div>
          <input type="submit" value="unirse a equipo" />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
