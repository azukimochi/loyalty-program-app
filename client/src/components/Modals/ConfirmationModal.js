import React from "react"
import Modal from "react-modal"
import { Icon, Button } from "semantic-ui-react"
import "./Modal.css"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

const ConfirmationModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <div className="modalContainer">
          <p className="closeP" onClick={props.closeModal}>x</p>
          <br />
          <p className="modalHeader">Are you sure?</p>
          <div className="modalBlurb">
            You are about to redeem {props.redemptionValue} points for {props.qty} {props.colour} AirBud(s).
          </div>
          <br />
          <Button
            className="modalBtn"
            onClick={props.negativeHandler}
            color="red"
            animated='vertical'>
            <Button.Content visible>Cancel</Button.Content>
            <Button.Content hidden>
              <Icon name="cancel" />
            </Button.Content>
          </Button>

          <Button 
            className="modalBtn"
            onClick={props.positiveHandler}
            color="blue"
            animated='vertical'>
            <Button.Content visible>Redeem</Button.Content>
            <Button.Content hidden>
              <Icon name="check" />
            </Button.Content>
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ConfirmationModal