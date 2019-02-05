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
        redemptionValue: null,
        id: localStorage.getItem("id"),
        token: localStorage.getItem("session_token")
    }
    
    componentDidMount = () => {
    this.getBalance()
    this.getInventory() 
    console.log(this.state) 
    }

    getBalance = () => {
        API.getBalance({
            id: this.state.id,
            token: this.state.token
        })
            .then(res => {
                console.log(res)
                if (res.data.status === "404" || res.data === null) {
                    localStorage.clear()
                    this.props.history.push("/")
                } else {
                    this.setState({balance: res.data.balance})
                }
            })
            .catch(err => console.log(err))
    }

    getInventory = () => {
        API.getInventory(this.state.token)
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
        this.setState({ modalIsOpen: false })
        this.getBalance()
        this.getInventory()
    }

    openConfirmationModal = () => {
            this.setState({modalSwitchExp: "confirmingOrder"},
            () => this.openModal())
    }

    checkBalanceIsValid = () => {
        API.getBalance({
            id: this.state.id,
            token: this.state.token
        })
            .then(res => {
                console.log(res)
                if (res.data.status === "404") {
                    localStorage.clear()
                    this.props.history.push("/")
                } else {
                    const remainingBalance = res.data.balance - this.state.redemptionValue
                    console.log("remainingBalance", remainingBalance, typeof remainingBalance)
                    if (remainingBalance < 0) {
                        console.log("Not enough balance")
                        this.setState({modalSwitchExp: "failByBalance"})
                    } else {
                        this.setState({balance: res.data.balance})
                        this.checkQtyIsValid()
                    }
                }
            })
            .catch(err => console.log(err))
    }

    checkQtyIsValid = () => {
        API.showItemQty({
            colour: this.state.colour,
            token: this.state.token
        })
        .then(res => {
            if (res.data.qty < this.state.qty) {
                console.log("Not enough units in stock")
                this.setState({modalSwitchExp: "failByQty"})
            } else {
                console.log("enough units in stock")
                this.completeOrder()
            }
        })
        .catch(err => console.log(err))
    }

    completeOrder = () => {
        API.insertOrder({
            token: this.state.token,
            userId: this.state.id,
            colour: this.state.colour,
            qty: this.state.qty,
            redemptionValue: this.state.redemptionValue
        })
        .then(res => {
            console.log(res)
            this.setState({
                balance: res.data.balance,
                modalSwitchExp: "success"
            })
        })
        .catch(err => console.log(err))
    }

    logOut = () => {
        localStorage.clear()
        this.props.history.push("/")
    }

    renderModalSwitch(exp) {
        switch(exp) {
          case "confirmingOrder":
            return(
                <ConfirmationModal
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
                redemptionValue={this.state.redemptionValue}
                qty={this.state.qty}
                colour={this.state.colour.toLowerCase()}
                positiveHandler={this.checkBalanceIsValid}
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
                negativeHandler={this.logOut}
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

        <button onClick={this.openConfirmationModal}>Redeem</button>
        </div>
        : null
        }

        {this.renderModalSwitch(this.state.modalSwitchExp)}

        </div>
        )
    }
}

export default Dashboard