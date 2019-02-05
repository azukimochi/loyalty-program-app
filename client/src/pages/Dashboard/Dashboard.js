import React, { Component } from "react"
import API from "../../utils/API"
import ColourDropDown from "../../components/DropDowns/ColourDropDown"
import QtyDropDown from "../../components/DropDowns/QtyDropDown"
import ConfirmationModal from "../../components/Modals/ConfirmationModal"
import SuccessModal from "../../components/Modals/SuccessModal"
import FailureModal from "../../components/Modals/FailureModal"

class Dashboard extends Component {
    state = {
        balance: null,
        availableColours: null,
        colour: "",
        modalIsOpen: false,
        modalSwitchExp: "confirmingOrder",
        qty: 1,
        colourErrMsg: null,
        redemptionValue: null
    }
    
    componentDidMount = () => {
    this.getBalance()
    this.getInventory() 
    console.log(this.state) 
    }

    getBalance = () => {
        const userData = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("session_token")
        }
        API.getBalance(userData)
            .then(res => {
                console.log(res)
                if (res.data.status === "404") {
                    localStorage.clear()
                    this.props.history.push("/")
                } else {
                    this.setState({balance: res.data.balance})
                }
            })
            .catch(err => console.log(err))
    }

    getInventory = () => {
        API.getInventory(localStorage.getItem("session_token"))
            .then(res => {
                console.log(res)
                if (res.data.status === "404") {
                    localStorage.clear()
                    this.props.history.push("/")
                } else {
                    this.setState({
                        availableColours: res.data,
                        redemptionValue: res.data[0].price,
                        colour: res.data[0].colour
                    }, () => console.log(this.state))
                }
            })
            .catch(err => console.log(err))
    }

    handleDropDownChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            console.log(this.state)
            this.getRedemptionValue()
        })
    }

    getRedemptionValue = () => {
        const selectedColourObj = this.state.availableColours.filter(colourObj => colourObj.colour === this.state.colour)
        console.log("selectedColourObj", selectedColourObj[0].price, typeof selectedColourObj[0].price)
        let redemptionValue = selectedColourObj[0].price * this.state.qty
        console.log("redemptionValue", redemptionValue, typeof redemptionValue)
        this.setState({redemptionValue: redemptionValue})
    }

    openModal = () => {
        this.setState({ modalIsOpen: true },
        () => console.log("opening modal", this.state.modalSwitchExp))
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    checkOrderIsValid = () => {
        this.setState({colourErrMsg: null})
        if (this.state.colour === "None") {
            this.setState({colourErrMsg: "Please select a colour."})
        } else {
            this.setState({modalSwitchExp: "confirmingOrder"},
            () => this.openModal())
        }
    }

    renderModalSwitch(exp) {
        console.log(exp)
        switch(exp) {
          case "confirmingOrder":
            return(
                <ConfirmationModal
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
                redemptionValue={this.state.redemptionValue}
                qty={this.state.qty}
                colour={this.state.colour.toLowerCase()}
                positiveHandler={this.closeModal}
                negativeHandler={this.closeModal}
                />
            )
            case "success":
            return (
                <SuccessModal
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
                qty={this.state.qty}
                colour={this.state.colour.toLowerCase()}
                balance={this.state.balance}
                positiveHandler={this.closeModal}
                negativeHandler={this.closeModal}
                />
            )
          case "failByBalance":
            return (
                <FailureModal
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
                qty={this.state.qty}
                colour={this.state.colour}
                negativeHandler={this.closeModal}
                reason={exp}
                />
            )
          case "failByQty":
            return (
                <FailureModal
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
                qty={this.state.qty}
                colour={this.state.colour}
                negativeHandler={this.closeModal}
                reason={exp}
                />
            )
          default:
            return null
        }
    }

    render() {
        const availableQty = [...Array(6).keys()]
        availableQty.splice(0,1)

        return(
            <div className="dashboardContainer">
            {this.state.balance !== null ? 
            <div>Balance: {this.state.balance} points</div> 
            : null
        }
        {this.state.availableColours !== null ? 
        <div>
            <div>Price: {this.state.redemptionValue} points</div>
        <ColourDropDown 
        availableColours = {this.state.availableColours}
        colour = {this.state.colour}
        handleDropDownChange = {this.handleDropDownChange}
        />
        <QtyDropDown 
        availableQty = {availableQty}
        qty = {this.state.qty}
        handleDropDownChange = {this.handleDropDownChange}
        />

        <button onClick={this.checkOrderIsValid}>Redeem</button>
        <div>{this.state.colourErrMsg}</div>
        </div>
        : null
        }


        {this.renderModalSwitch(this.state.modalSwitchExp)}

        </div>
        )
    }
}

export default Dashboard