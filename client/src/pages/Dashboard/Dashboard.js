import React, { Component } from "react"
import API from "../../utils/API"
import ColourDropDown from "../../components/DropDowns/ColourDropDown"
import QtyDropDown from "../../components/DropDowns/QtyDropDown"
import ConfirmationModal from "../../components/Modals/ConfirmationModal"

class Dashboard extends Component {
    state = {
        balance: null,
        availableColours: null,
        colour: "None",
        modalIsOpen: false
    }
    
    componentDidMount = () => {
    this.getBalance()
    this.getInventory() 
    console.log(this.state.availableQty)       
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
                    this.setState({availableColours: res.data},
                    () => console.log(this.state.availableColours))
                }
            })
            .catch(err => console.log(err))
    }

    handleDropDownChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value }, () => console.log(this.state))
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    // afterOpenModal = () => {
    //     this.subtitle.style.color = '#f00';
    // }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const availableQty = [...Array(6).keys()]
        availableQty.splice(0,1)
        return(
            <div className="dashboardContainer">
            {this.state.balance !== null ? 
            <div>Balance: {this.state.balance}</div> 
            : null
        }
        {this.state.availableColours !== null ? 
        <ColourDropDown 
        availableColours = {this.state.availableColours}
        colour = {this.state.colour}
        handleDropDownChange = {this.handleDropDownChange}
        />
        : null
        }

        <QtyDropDown 
        availableQty = {availableQty}
        qty = {this.state.qty}
        handleDropDownChange = {this.handleDropDownChange}
        />

        <button onClick={this.openModal}>Redeem</button>
        
        </div>
        )
    }
}

export default Dashboard