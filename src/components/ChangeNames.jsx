import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { BallTriangle } from "react-loading-icons";
import { Button, Form } from "react-bootstrap";

function ChangeNames(props) {
  //   console.log(props);
  const navigate = useNavigate;
  const { loggedUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleNickNameChange = (e) => setNickName(e.target.value);

  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const newNames = {
      firstName,
      lastName,
      nickName,
    };

    try {
      await props.changeNames(newNames);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(loggedUser._id);
      setUser(foundUser.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return (
      <div className="m-0 vh-100 row justify-content-center align-items-center">
        <div className="col-auto text-center">
        <BallTriangle stroke="#ffc000" />
        </div>
      </div>
    );
  }
  const aboutNickName = user.nickName === "" ? "Mote" : user.nickName;

  return (
    <div className="d-flex justify-content-center pt-0 p-5">
      <div className="row text-center pe-5 ps-5">
        <section className="ps-5 pe-5">
          <div className="ps-1 pe-1">
            <Form onSubmit={handleSubmitForm}>
              <Form.Group className="mb-3">
                <Form.Control
                  // className="form-control"
                  type="text"
                  name="firstName"
                  value={firstName}
                  placeholder={user.firstName}
                  onChange={handleFirstNameChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  // className="form-control"
                  type="text"
                  name="lastName"
                  value={lastName}
                  placeholder={user.lastName}
                  onChange={handleLastNameChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  // className="form-control"
                  type="text"
                  name="nickName"
                  value={nickName}
                  placeholder={aboutNickName}
                  onChange={handleNickNameChange}
                />
              </Form.Group>
              <div className="form-group mx-sm-4 pb-4 pt-4">
                <Button
                  type="submit"
                  variant="warning"
                  className="btn btn-block"
                >
                  <img
                    src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681079669/FutAliner/ACTUALIZAR-GREEN_e2akd2.png"
                    alt="Actualizar"
                    width={120}
                  />
                </Button>
              </div>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangeNames;
