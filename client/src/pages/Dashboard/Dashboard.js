import React, { Component } from "react"
import API from "../../utils/API"

class Dashboard extends Component {
    state = {
        balance: null,
        colours: []
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
                    this.setState({colours: res.data},
                    () => console.log(this.state.colours))
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div className="dashboardContainer">
            {this.state.balance !== null ? 
            <div>Balance: {this.state.balance}</div> :
            null
        }
            </div>
        )
    }
}

export default Dashboard