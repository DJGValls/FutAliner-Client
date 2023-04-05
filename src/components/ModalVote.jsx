import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Form } from "react-bootstrap";
import { BallTriangle } from "react-loading-icons";
import { editVoteService } from "../services/player.services";

function ModalVote(player) {
  const navigate = useNavigate;
  const { isLoggedIn } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [portero, setPortero] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [ataque, setAtaque] = useState(0);
  const [tecnica, setTecnica] = useState(0);
  const [cardio, setCardio] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setShow(false);
    setSelectedPlayer("");
    setSelectedUser("");
  };
  const handleShow = () => {
    setShow(true);
    setSelectedPlayer(player.player);
    setSelectedUser(player.player.user);
  };
  
  const handlePorteroChange = (e) => setPortero(e.target.value);
  const handleDefensaChange = (e) => setDefensa(e.target.value);
  const handleAtaqueChange = (e) => setAtaque(e.target.value);
  const handleTecnicaChange = (e) => setTecnica(e.target.value);
  const handleCardioChange = (e) => setCardio(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault()

    const player = {
      portero,
      defensa,
      ataque,
      tecnica,
      cardio,
    }
    try {
      await editVoteService(selectedPlayer._id, player)
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  }
 
  console.log(selectedPlayer);

  // if (isFetching) {
  //   return <BallTriangle></BallTriangle>;
  // }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Vota
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <section>
          <Modal.Header closeButton>
            <Modal.Title>
              <div>
                {selectedUser.firstName} {selectedUser.lastName}
              </div>
              <div>Media Total: {selectedPlayer.total}</div>
            </Modal.Title>
          </Modal.Header>
        </section>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <p>
              El valor de cada campo describe su actual media en esa categoría
            </p>
            <div>
              <label>Portero: </label>
              <input
                type="number"
                min="0"
                max="10"
                name="portero"
                value={portero}
                placeholder={selectedPlayer.portero}
                onChange={handlePorteroChange}
              />
            </div>
            <br />
            <div>
              <label>Defensa: </label>
              <input
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.defensa}
                value={defensa}
                placeholder="media"
                onChange={handleDefensaChange}
              />
            </div>
            <br />
            <div>
              <label>Ataque: </label>
              <input
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.ataque}
                value={ataque}
                placeholder="media"
                onChange={handleAtaqueChange}
              />
            </div>
            <br />
            <div>
              <label>Técnica: </label>
              <input
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.tecnica}
                value={tecnica}
                placeholder="media"
                onChange={handleTecnicaChange}
              />
            </div>
            <br />
            <div>
              <label>Cardio: </label>
              <input
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.cardio}
                value={cardio}
                placeholder="media"
                onChange={handleCardioChange}
              />
            </div>
            <br />
            <div>
              {errorMessage !== "" ? (
                <p class="date-of-birth-text">{errorMessage}</p>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button type="submit" variant="primary">Votar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalVote;
