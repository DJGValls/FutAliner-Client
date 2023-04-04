import { useState } from "react";
import { Form } from "react-bootstrap";

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handlePassword1Change = (e) => setPassword1(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newPassword = {
      oldPassword,
      password1,
      password2,
    };

    props.changePassword(newPassword);
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <div>
        <input
          //   className="form-control"
          type="password"
          name="oldPassword"
          value={oldPassword}
          placeholder="Password actual"
          onChange={handleOldPasswordChange}
        />
      </div>
      <br />
      <div>
        <input
          //   className="form-control"
          type="password"
          name="password1"
          value={password1}
          placeholder="nevo Password"
          onChange={handlePassword1Change}
        />
      </div>
      <div>
        <br />
        <div>
          <input
            //   className="form-control"
            type="password"
            name="password2"
            value={password2}
            placeholder="repita nuevo Password"
            onChange={handlePassword2Change}
          />
        </div>
        <br />
        <div>
          <input type="submit" value="Actualizar" />
        </div>
        <br />
      </div>
    </Form>
  );
}

export default ChangePassword;
