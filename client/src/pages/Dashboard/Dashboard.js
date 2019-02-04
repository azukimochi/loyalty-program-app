import React, { Component } from "react"
import API from "../../utils/API"
import ColourDropDown from "../../components/DropDown/ColourDropDown"

class Dashboard extends Component {
    state = {
        balance: null,
        availableColours: null
    }
    
    componentDidMount = () => {
    this.getBalance()
    this.getInventory()        
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

    handleColourChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value }, () => console.log(this.state.colour))
    }

    render() {
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
        handleColourChange = {this.handleColourChange}
        />
        : null
        }
            </div>
        )
    }
}

export default Dashboard