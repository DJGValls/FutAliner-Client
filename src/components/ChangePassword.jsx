import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    <div className="d-flex justify-content-center pt-0 p-5">
      <div className="row text-center pe-5 ps-5">
        <section className="ps-5 pe-5">
          <div className="ps-1 pe-1">
            <Form onSubmit={handleSubmitForm}>
              <Form.Group className="mb-3">
                <Form.Control
                  //   className="form-control"
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  placeholder="Password actual"
                  onChange={handleOldPasswordChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  //   className="form-control"
                  type="password"
                  name="password1"
                  value={password1}
                  placeholder="nevo Password"
                  onChange={handlePassword1Change}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  //   className="form-control"
                  type="password"
                  name="password2"
                  value={password2}
                  placeholder="repita nuevo Password"
                  onChange={handlePassword2Change}
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

export default ChangePassword;
