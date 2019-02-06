import React from "react"
import "./Header.css"
import { Button, Icon } from 'semantic-ui-react'

const Header = props => {
    return(
        <div id="headerContainer">
            <div id="greeting"><Icon name="user"/>{props.name}</div>
            <Button id="logOutBtn" color="orange" onClick={props.logOut}>Log Out</Button>
        </div>
    )
}

export default Header