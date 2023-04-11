import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function ChangeEmail(props) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newEmail = {
      email,
    };

    props.changeEmail(newEmail);
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
                  type="email"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={handleEmailChange}
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

export default ChangeEmail;
