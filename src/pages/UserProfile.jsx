import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  editUserImageService,
  editUserMailService,
  editUserNamesService,
  getUserService,
} from "../services/user.services";
import { BallTriangle } from "react-loading-icons";
import { Collapse } from "react-bootstrap";
import ChangeImage from "../components/ChangeImage";
import ChangeNames from "../components/ChangeNames";
import ChangeEmail from "../components/ChangeEmail";

function UserProfile() {
  const navigate = useNavigate;
  const { isLoggedIn, loggedUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isImageFormShowing, setIsImageFormShowing] = useState(false);
  const [isNamesFormShowing, setIsNamesFormShowing] = useState(false);
  const [isEmailFormShowing, setIsEmailFormShowing] = useState(false);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(loggedUser._id);
      setUser(foundUser.data);
      setIsFetching(false);
    } catch (error) {
      if (error.response.status === 404) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  const changeImage = async (image) => {
    try {
      const response = await editUserImageService(image);
      setIsImageFormShowing(!isImageFormShowing);
      setUser(response.data);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const changeNames = async (names) => {
    try {
      const response = await editUserNamesService(names);
      setIsNamesFormShowing(!isNamesFormShowing);
      setUser(response.data);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const changeEmail = async (email) => {
    try {
      const response = await editUserMailService(email);
      setIsEmailFormShowing(!isEmailFormShowing);
      setUser(response.data);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // const aboutNickName = user.nickName === "" ? "Mote" : user.nickNmae

  if (isFetching) {
    return <BallTriangle />;
  }

  return isLoggedIn ? (
    <div>
      <h1>UserProfile</h1>
      <section>
        <img src={user.image} alt="profile pic" />
        <button
          onClick={() => setIsImageFormShowing(!isImageFormShowing)}
          className="btn btn-block"
        >
          ✎
        </button>
        <Collapse in={isImageFormShowing}>
          <div>
            <ChangeImage changeImage={changeImage} />
          </div>
        </Collapse>
      </section>
      <section>
        <h3>
          {user.firstName} {user.nickName} {user.lastName}
        </h3>
        <button
          onClick={() => setIsNamesFormShowing(!isNamesFormShowing)}
          className="btn btn-block"
        >
          ✎
        </button>
        <Collapse in={isNamesFormShowing}>
          <div>
            <div>
              {errorMessage !== "" ? (
                <p className="date-of-birth-text">{errorMessage}</p>
              ) : null}
            </div>
            <ChangeNames changeNames={changeNames} />
          </div>
        </Collapse>
      </section>
      <section>
        <h3>
          {user.email}
        </h3>
        <button
          onClick={() => setIsEmailFormShowing(!isEmailFormShowing)}
          className="btn btn-block"
        >
          ✎
        </button>
        <Collapse in={isEmailFormShowing}>
          <div>
            <div>
              {errorMessage !== "" ? (
                <p className="date-of-birth-text">{errorMessage}</p>
              ) : null}
            </div>
            <ChangeEmail changeEmail={changeEmail} />
          </div>
        </Collapse>
      </section>
    </div>
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
}

export default UserProfile;
