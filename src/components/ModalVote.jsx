import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { editVoteService } from "../services/player.services";

function ModalVote(player) {
  const navigate = useNavigate;
  const [show, setShow] = useState(false);
  const [portero, setPortero] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [ataque, setAtaque] = useState(0);
  const [tecnica, setTecnica] = useState(0);
  const [cardio, setCardio] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPlayerMedia, setSelectedPlayerMedia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setShow(false);
    setSelectedPlayer("");
    setSelectedUser("");
    setSelectedPlayerMedia("");
  };
  const handleShow = () => {
    
    const goalkeeperStats = player.player.portero;
    const playerStats = (player.player.defensa + player.player.tecnica + player.player.ataque + player.player.cardio)/4
    const checkIfGoalkeeper = ()=>{
      if (goalkeeperStats > playerStats) {
        return setSelectedPlayerMedia(goalkeeperStats)
      } else setSelectedPlayerMedia(playerStats)
    }

    setShow(true);
    setSelectedPlayer(player.player);
    setSelectedUser(player.player.user);
    checkIfGoalkeeper()
    // console.log(player.player)
  };

  const handlePorteroChange = (e) => setPortero(e.target.value);
  const handleDefensaChange = (e) => setDefensa(e.target.value);
  const handleAtaqueChange = (e) => setAtaque(e.target.value);
  const handleTecnicaChange = (e) => setTecnica(e.target.value);
  const handleCardioChange = (e) => setCardio(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const player = {
      portero,
      defensa,
      ataque,
      tecnica,
      cardio,
    };
    try {
      await editVoteService(selectedPlayer._id, player);
      handleClose();
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <img
          src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681293160/FutAliner/CUALIFICAR_d4dkk6.png"
          alt="calificar"
          width={40}
        />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <section>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="mt-2 text-big-green">
                {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              <h4 className="mt-2 text-big-green">
                Media Total: {selectedPlayerMedia}
              </h4>
            </Modal.Title>
          </Modal.Header>
        </section>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                min="0"
                max="10"
                name="portero"
                // value={portero}
                placeholder="Portero"
                onChange={handlePorteroChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.defensa}
                // value={defensa}
                placeholder="Defensa"
                onChange={handleDefensaChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.ataque}
                // value={ataque}
                placeholder="Ataque"
                onChange={handleAtaqueChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.tecnica}
                // value={tecnica}
                placeholder="Técnica"
                onChange={handleTecnicaChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                min="0"
                max="10"
                name={selectedPlayer.cardio}
                // value={cardio}
                placeholder="Cardio"
                onChange={handleCardioChange}
              />
            </Form.Group>
            <div>
              {errorMessage !== "" ? (
                <Alert key="danger" variant="danger">
                  <p className="date-of-birth-text">{errorMessage}</p>
                </Alert>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="warning" size="lg" type="submit" value="votar">
              <img
                src="https://res.cloudinary.com/dn3vdudid/image/upload/v1684077036/FutAliner/VOTA_GREEN_nmglzc.png"
                alt="Vota"
                width={60}
              />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalVote;
