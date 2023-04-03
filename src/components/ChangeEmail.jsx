import { useState } from "react";

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
    <form onSubmit={handleSubmitForm}>
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
      <div>
        <input type="submit" value="Actualizar" />
      </div>
    </form>
  );
}

export default ChangeEmail;
