import React from "react"
import Modal from "react-modal"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const FailureModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        // onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <div className="modalContainer">
          <p onClick={props.closeModal}>x</p>
          <br />
          <h2>We're sorry, but we can't process your order.</h2>
          <div className="modalBlurb">

          {props.reason === "failByBalance" ? 
          <p>You don't have enough points.</p> :
          <p>We don't have enough of that colour in stock.</p>}

          </div>
          <br />

          <button className="ui red button" onClick={props.negativeHandler}>
            <i className="check icon"></i>
            Go back
        </button>
        </div>
      </Modal>
    </div>
  )
}

export default FailureModal