import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { Animated } from "react-animated-css";
import styles from './Registration.module.css';
import { createNewUser } from '../../actions'


const required = value => value ? undefined : 'Required'
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

const minLength = min => value =>
    value && value.length < min ? `Password should be at least ${min} characters` : undefined
const minLength6 = minLength(6)

class SignUp extends Component {

    renderName = ({ label, input, type, meta: { touched, error, warning } }) => {
        return (
            <div>
                <label>{label}</label>
                <input type={type} {...input} className="form-control" />
                {touched && ((error && <p className={styles.error}>{error}</p>) || (warning && <span>{warning}</span>))}
            </div>
        )
    }

    renderEmail = ({ label, input, type, meta: { touched, error, warning } }) => {
        return (
            <div>
                <label>{label}</label>
                <input type={type} {...input} className="form-control" />
                {touched && ((error && <p className={styles.error}>{error}</p>) || (warning && <span>{warning}</span>))}
            </div>
        )
    }

    renderPassword = ({ label, input, type, meta: { touched, error, warning } }) => {
        return (
            <div>
                <label>{label}</label>
                <input type={type} {...input} className="form-control" />
                {touched && ((error && <p className={styles.error}>{error}</p>) || (warning && <span>{warning}</span>))}
            </div>
        )
    }

    onSubmit = values => {
        this.props.createNewUser(values);
    }

    render() {
        const { submit, form } = styles
        return (
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={form}>
                    <h1>Sign Up</h1>
                    <Field validate={required} label='Name' type='text' name='name' component={this.renderName} />
                    <Field validate={[required, email]} label='Email' type='email' name='email' component={this.renderEmail} />
                    <Field validate={[required, minLength6]} label='Password' type='password' name='password' component={this.renderPassword} />
                    <div className={submit}>
                        <input type='submit' />
                    </div>
                </form>
            </Animated>
        )
    }
}

export default reduxForm({
    form: 'regForm'
})(connect(null, { createNewUser })(SignUp))