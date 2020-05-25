import React, { Component } from 'react';
import styles from './Registration.module.css'
import { Animated } from "react-animated-css";
import { connect } from 'react-redux';
import { createNewUser } from '../../actions';
import * as EmailValidator from 'email-validator';

class Registration extends Component {

    state = {
        name: "",
        email: '',
        password: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.createNewUser(this.state);
    }

    render() {
        const { submit, form } = styles
        return (
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <form onSubmit={this.handleSubmit} className={form}>
                    <h1>Sign Up</h1>
                    <label>Name</label>
                    <input
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control"
                    />
                    <br />

                    <label>Email</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            aria-label="Email"
                            aria-describedby="basic-addon1" />
                    </div>
                    <br />

                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="form-control"
                    />
                    <br />
                    <div className={submit}>
                        <input type='submit' />
                    </div>
                </form>
            </Animated>
        )
    }
}

export default connect(null, { createNewUser })(Registration);