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

const ConfirmationModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <div className="modalContainer">
          <p onClick={props.closeModal}>x</p>
          <br />
          <h2>Are you sure?</h2>
          <div className="modalBlurb">
          You are about to redeem {props.redemptionValue} points for {props.qty} {props.colour} AirBuds
          </div>
          <br />
            
          <button className="ui green button" onClick={props.positiveHandler}>
            <i className="check icon"></i>
            Redeem
          </button>

          <button className="ui red button" onClick={props.negativeHandler}>
            <i className="check icon"></i>
            Cancel
        </button>
        </div>
      </Modal>
    </div>
  )
}

export default ConfirmationModal