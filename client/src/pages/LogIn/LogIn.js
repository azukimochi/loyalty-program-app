import React, { Component } from "react"
import API from "../../utils/API.js"
import { Grid, Input, Button, Icon } from "semantic-ui-react"
import "./Login.css"

class LogIn extends Component {
	state = {
		email: "",
		password: "",
		statusMsg: ""
	}

	componentDidMount = () => {
		if (localStorage.getItem("session_token")) {
			API.checkUserIsLoggedIn(localStorage.getItem("session_token"))
				.then(res => {
					if (res.data.status === "200") {
						this.props.history.push("/dashboard")
					}
				})
				.catch(err => console.log(err))

		}
	}
	onInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
	}

	onFormSubmit = event => {
        event.preventDefault();
		const loginData = {
			email: this.state.email,
			password: this.state.password
		}
		API.logIn(loginData)
			.then(res => {
				if (res.data.validate === false) {
					localStorage.clear()
					console.log("Login failed")
					this.setState({
						statusMsg: "Login failed. The email/password did not match.",
						email: "",
						password: ""
					})
                } else if (res.data.validate === true ) {
                    console.log("logged in!")
					localStorage.setItem('session_token', res.data.token)
					localStorage.setItem('id', res.data.id)
					localStorage.setItem('name', res.data.name)
					localStorage.setItem('auth', true)
					this.props.history.push('/dashboard')
				}
			})
			.catch(err => {
				console.log('login error', err)
			})
	}

	render() {
		return (
			<div className="body">
			<Grid columns="equal">
>			<Grid.Column>
			</Grid.Column>
			<Grid.Column textAlign="center">
			<div className="logIn">
						<div id="loginContent">
						<h1 className="logInHeader">SuperMiles User Portal</h1>
						<form id="loginForm" onSubmit={this.onFormSubmit}>
							<Input
								className="loginInput"
								icon="mail"
								iconPosition="left"
								type="email"
								placeholder="Email Address"
								name="email"
								value={this.state.email}
								onChange={this.onInputChange}
								required />
							<br/>
							<Input
								className="loginInput"
								icon="key"
								iconPosition="left"
								type="password"
								placeholder="Password"
								name="password"
                                value={this.state.password}
                                autoComplete="current-password"
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
								title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
								onChange={this.onInputChange}
								required />

							<div>
								<Button animated color="orange">
									<Button.Content visible>Log In</Button.Content>
									<Button.Content hidden>
										<Icon name='arrow right' />
									</Button.Content>
								</Button>
							</div>
						</form>
						{this.state.statusMsg}
					</div>
					</div>
					</Grid.Column>
					<Grid.Column>
					</Grid.Column>
					</Grid>
					</div>
		)
	}
}

export default LogIn