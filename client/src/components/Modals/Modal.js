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

const Modal = props => {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <div className="modalContainer">
          <p onClick={props.closeModal}>x</p>
          <br />
          <h2>{props.header}</h2>
          <div className="modalBlurb">{props.blurb}</div>
          <br />
            
          <button className="ui green button" onClick={props.activeHandler}>
            <i className={props.activeIcon}></i>
            {props.activeBtnMsg}
          </button>

          <button className="ui red button" onClick={() => props.inactiveHandler}>
            <i className={props.inactiveIcon}></i>
            {props.inactiveBtnMsg}
        </button>
        </div>
      </Modal>
    </div>
  )
}

export default Modal


// ConfirmationModal
// sum of points to redeem
// colour
// qty
// cancel handler
// redeem handler (check that you have enough balance and that there's enough in stock)

// FailureModal
// go back handler 
// blurb: saying either you don't have enough balance or there's not enough items in stock

// SuccessModal
// colour
// balance
// logout handler
// Return to Screen 2 handler 