import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../actions'
import styles from './Login.module.css';
import { Animated } from "react-animated-css";

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.userLogin(this.state);
  }

  render() {
    const { form, submit } = styles
    return (
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <form onSubmit={this.handleSubmit} className={form}>
          <h1>Login</h1>

          <label>Email</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input name='email'
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1" />
          </div><br />

          <label>Password</label>
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            className="form-control"
          /><br />
          <div className={submit}>
            <input type='submit' />
          </div>
        </form>
      </Animated>
    )
  }
}


export default connect(null, { userLogin })(LogIn);

