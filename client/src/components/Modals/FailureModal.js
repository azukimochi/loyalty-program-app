import React from "react"
import Modal from "react-modal"
import { Icon, Button } from "semantic-ui-react"

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

const FailureModal = props => {
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
          <p className="modalHeader">We're sorry, but we can't process your order.</p>
          <div className="modalBlurb">
            {props.reason === "failByBalance" ?
              <p>You don't have enough points.</p> :
              <p>We don't have enough of that colour in stock.</p>}
          </div>
          <br />
          <Button
            id="failModalBtn"
            onClick={props.negativeHandler}
            color="red"
            animated='vertical'>
            <Button.Content visible>Go back</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default FailureModal