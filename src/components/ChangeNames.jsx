import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { BallTriangle } from "react-loading-icons";
import { Form } from "react-bootstrap";

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
    return <BallTriangle />;
  }
  const aboutNickName = user.nickName === "" ? "Mote" : user.nickName;

  return (
    <Form onSubmit={handleSubmitForm}>
      <div>
        <input
          // className="form-control"
          type="text"
          name="firstName"
          value={firstName}
          placeholder={user.firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <br />
      <div>
        <input
          // className="form-control"
          type="text"
          name="lastName"
          value={lastName}
          placeholder={user.lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <br />
      <div>
        <input
          // className="form-control"
          type="text"
          name="nickName"
          value={nickName}
          placeholder={aboutNickName}
          onChange={handleNickNameChange}
        ></input>
      </div>
      <br />
      <div>
        <input type="submit" value="Actualizar" />
      </div>
      <br />
    </Form>
  );
}

export default ChangeNames;
