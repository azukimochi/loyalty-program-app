import React, { Component } from "react"
import API from "../../utils/API"
import ColourDropDown from "../../components/DropDowns/ColourDropDown"
import QtyDropDown from "../../components/DropDowns/QtyDropDown"
import ConfirmationModal from "../../components/Modals/ConfirmationModal"
import SuccessModal from "../../components/Modals/SuccessModal"
import FailureModal from "../../components/Modals/FailureModal"
import HeaderComponent from "../../components/Header/Header"
import ColourGrid from "../../components/ColourGrid/ColourGrid"
import { Grid, Header, Icon, Button } from "semantic-ui-react"
import "./Dashboard.css"

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
    }

    // Grabs the initial balance of the user after they've logged in
    getBalance = () => {
        API.getBalance({
            id: this.state.id,
            token: this.state.token
        })
            .then(res => {
                if (res.data.status === "404" || res.data === null) {
                    localStorage.clear()
                    this.props.history.push("/")
                } else {
                    this.setState({balance: res.data.balance})
                }
            })
            .catch(err => console.log(err))
    }

    // Grabs the available colours of AirBuds
    getInventory = () => {
        API.getInventory(this.state.token)
            .then(res => {
                if (res.data.status === "404") {
                    localStorage.clear()
                    this.props.history.push("/")
                } else {
                    this.setState({
                        availableColours: res.data,
                        redemptionValue: res.data[0].price,
                        colour: res.data[0].colour
                    })
                }
            })
            .catch(err => console.log(err))
    }
        
    handleDropDownChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value }, 
            () => this.getRedemptionValue())
    }
        
    setColour = colour => {
        this.setState({colour: colour}, 
            () => this.getRedemptionValue()
    )}

    logOut = () => {
        localStorage.clear()
        this.props.history.push("/")
    }
            
    // Creates the subtotal amount of points for redemption based on qty multiplied by the products price
    getRedemptionValue = () => {
        const selectedColourObj = this.state.availableColours.filter(colourObj => colourObj.colour === this.state.colour)
        let redemptionValue = selectedColourObj[0].price * this.state.qty
        this.setState({redemptionValue: redemptionValue})
    }

    // ---Modal Functions (START)---
    openModal = () => {
        this.setState({ modalIsOpen: true })
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
    // ---Modal Functions (END)---


    // ---Functions When Redeeming (START)---
    checkBalanceIsValid = () => {
        API.getBalance({
            id: this.state.id,
            token: this.state.token
        })
            .then(res => {
                if (res.data.status === "404") {
                    localStorage.clear()
                    this.props.history.push("/")
                } else {
                    const remainingBalance = res.data.balance - this.state.redemptionValue
                    if (remainingBalance < 0) {
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
                this.setState({modalSwitchExp: "failByQty"})
            } else {
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
            this.setState({
                balance: res.data.balance,
                modalSwitchExp: "success"
            })
        })
        .catch(err => console.log(err))
    }

    // ---Functions When Redeeming (END)---

    // Handles which Modal child component to render
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

        const name=localStorage.getItem("name")
        return(
            <div className="dashboardContainer">
            <Grid>

            <Grid.Row>
            <Grid.Column textAlign="center">
            <HeaderComponent 
            name={name}
            logOut={this.logOut}
            />
            {this.state.balance !== null ? 
                <div id="balanceContainer">
                    <Header id="pointsHeader" as='h2' icon>
                    <Icon name='money' circular />
                    <Header.Content>Your Points</Header.Content>
                    </Header>
                    <div id="balanceDiv">{this.state.balance}</div> 
                </div>
            : null
        }
        </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2} id="productRow">

        <Grid.Column verticalAlign="middle">
         <img id="airBudImg" src={require("../../images/airpods.jpeg")} alt="image"/>
        </Grid.Column>

        <Grid.Column>    
        {this.state.availableColours !== null ? 
            <div>
                <div id="priceDiv">
                <span className="boldSpan">Price:</span> 
                {this.state.redemptionValue} points
        </div>
        <div id="dropdownContainer">
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
        </div>
        <ColourGrid 
        availableColours={this.state.availableColours}
        setColour={this.setColour}
        />
        <br />
        <Button id="redeemBtn" color="blue" onClick={this.openConfirmationModal}>Redeem</Button>
        <div id="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>    
        </div>
        : null
        }

        {this.renderModalSwitch(this.state.modalSwitchExp)}
        </Grid.Column>
        </Grid.Row>
    </Grid>
        </div>
        )
    }
}

export default Dashboard