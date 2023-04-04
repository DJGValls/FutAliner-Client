import { useState } from "react";
import { Form } from "react-bootstrap";

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
    <Form onSubmit={handleSubmitForm}>
      <div>
        <input
        //   className="form-control"
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleEmailChange}
        />
      </div>
      <br />
      <div>
        <input type="submit" value="Actualizar" />
      </div>
      <br />
    </Form>
  );
}

export default ChangeEmail;
