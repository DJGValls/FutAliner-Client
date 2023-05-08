import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  editUserImageService,
  editUserMailService,
  editUserNamesService,
  editUserPasswordService,
  getUserService,
} from "../services/user.services";
import { BallTriangle } from "react-loading-icons";
import { Col, Collapse, Container, Image, Row } from "react-bootstrap";
import ChangeImage from "../components/ChangeImage";
import ChangeNames from "../components/ChangeNames";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";

function UserProfile() {
  const navigate = useNavigate;
  const { isLoggedIn, loggedUser, authenticateUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isImageFormShowing, setIsImageFormShowing] = useState(false);
  const [isNamesFormShowing, setIsNamesFormShowing] = useState(false);
  const [isEmailFormShowing, setIsEmailFormShowing] = useState(false);
  const [isPasswordFormShowing, SetIsPasswordFormShowing] = useState(false);
  


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(loggedUser._id);
      setUser(foundUser.data);
      setIsFetching(false);
    } catch (error) {
      // if (error.response.status == 401) {
      //   navigate("/login");
      // } else {
      // }
      navigate("/error");
      console.log(error);
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

  const changePassword = async (oldPassword, password1, password2) => {
    try {
      await editUserPasswordService(oldPassword, password1, password2);
      SetIsPasswordFormShowing(!isPasswordFormShowing);
      //Force logout
      localStorage.removeItem("authToken");
      authenticateUser();
      navigate("/login");
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
    <div className="row justify-content-center p-1 mt-auto">
      <section className="container mt-auto">
        <Container fluid>
          <div className="text-center">
            <div className="mt-3">
              <Row className="justify-content-center">
                <Col xs="auto">
                  <button
                    onClick={() => setIsImageFormShowing(!isImageFormShowing)}
                    className="btn btn-block"
                  >
                    <Image
                      src={user.image}
                      className="image-profile-edit"
                      alt="profile pic"
                    />
                    <Image
                      className="ms-2 mb-5"
                      src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681076143/FutAliner/BOTON-EDITAR-YELLOW_psem4y.png"
                      alt="editar"
                      width={30}
                    />
                  </button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="8">
                  <Collapse in={isImageFormShowing}>
                    <div>
                      <ChangeImage changeImage={changeImage} />
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
      <section className="container mt-auto">
        <Container fluid>
          <div className="text-center">
            <div className="mt-2">
              <Row className="justify-content-center">
                <Col xs="auto">
                  <button
                    onClick={() => setIsNamesFormShowing(!isNamesFormShowing)}
                    className="btn btn-block"
                  >
                    <Row>
                      <Col xs="auto">
                        <h4 className="text-big-medium-yellow">
                          {user.firstName} {user.nickName} {user.lastName}
                        </h4>
                      </Col>
                      <Col xs="auto">
                        <Image
                          src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681076143/FutAliner/BOTON-EDITAR-YELLOW_psem4y.png"
                          alt="editar"
                          width={15}
                        />
                      </Col>
                    </Row>
                  </button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col>
                  <Collapse in={isNamesFormShowing}>
                    <div>
                      <div>
                        {errorMessage !== "" ? (
                          <p className="home-text">{errorMessage}</p>
                        ) : null}
                      </div>
                      <ChangeNames changeNames={changeNames} />
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container fluid>
          <div className="text-center">
            <div className="mt-2">
              <Row className="justify-content-center">
                <Col xs="auto">
                  <button
                    onClick={() => setIsEmailFormShowing(!isEmailFormShowing)}
                    className="btn btn-block"
                  >
                    <Row>
                      <Col xs="auto">
                        <h4 className="text-big-medium-yellow">{user.email}</h4>
                      </Col>
                      <Col xs="auto">
                        <Image
                          src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681076143/FutAliner/BOTON-EDITAR-YELLOW_psem4y.png"
                          alt="editar"
                          width={15}
                        />
                      </Col>
                    </Row>
                  </button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col>
                  <Collapse in={isEmailFormShowing}>
                    <div>
                      <div>
                        {errorMessage !== "" ? (
                          <p className="home-text">{errorMessage}</p>
                        ) : null}
                      </div>
                      <ChangeEmail changeEmail={changeEmail} />
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>

      <section className="container mt-auto">
        <Container fluid>
          <div className="text-center">
            <div className="mt-2">
              <Row className="justify-content-center">
                <Col xs="auto">
                  <button
                    onClick={() =>
                      SetIsPasswordFormShowing(!isPasswordFormShowing)
                    }
                    className="btn btn-block"
                  >
                    <Row>
                      <Col xs="auto">
                        <h4 className="text-big-medium-yellow">Password</h4>
                      </Col>
                      <Col xs="auto">
                        <Image
                          src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681076143/FutAliner/BOTON-EDITAR-YELLOW_psem4y.png"
                          alt="editar"
                          width={15}
                        />
                      </Col>
                    </Row>
                  </button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col>
                  <Collapse in={isPasswordFormShowing}>
                    <div>
                      <div>
                        {errorMessage !== "" ? (
                          <p className="home-text">{errorMessage}</p>
                        ) : null}
                      </div>
                      <ChangePassword changePassword={changePassword} />
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </div>
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
}

export default UserProfile;
