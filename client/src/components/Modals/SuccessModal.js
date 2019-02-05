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

const SuccessModal = props => {
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
          <h2>Success!</h2>
          <div className="modalBlurb">
          <h4>Redeemed: {props.qty} {props.colour} AirBud(s) </h4>
          <h4>Current Balance: {props.balance} points</h4>
          <br />
          <p>Do you want to redeem another AirBud?</p>
          </div>
          <br />
         
          <button className="ui green button" onClick={props.negativeHandler}>
            <i className="check icon"></i>
            Logout
          </button>

          <button className="ui red button" onClick={props.positiveHandler}>
            <i className="check icon"></i>
            Redeem Another
        </button>
        </div>
      </Modal>
    </div>
  )
}

export default SuccessModal