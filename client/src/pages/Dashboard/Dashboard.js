import React, { Component } from "react"
import API from "../../utils/API"

class Dashboard extends Component {
    state = {
        balance: null
    }
    
    componentDidMount = () => {
    this.getBalance()        
    }

    getBalance = () => {
        const userData = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("session_token")
        }
        API.getBalance(userData)
            .then(res => {
                console.log(res)
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