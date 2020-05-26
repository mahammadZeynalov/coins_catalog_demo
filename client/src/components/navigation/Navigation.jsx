import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Animated } from "react-animated-css";
import logo from '../../images/A_penny_1.png';

class Navigation extends Component {

    logout = () => {
        localStorage.removeItem('token');
        this.props.logoutUser();
    }
    render() {
        const { header, link, active, user_name, wrapper, logo_img } = styles
        return (
            <div className={wrapper}>
                <div className='container'>
                    <Navbar bg="light" expand="lg" className={styles.container}>
                        <Navbar.Brand className={header}>
                            <img className={logo_img} src={logo} alt='logo' />
                            Coins Catalog
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto" >
                                <NavLink activeClassName={active} className={link} exact to='/'>Home</NavLink>
                                <NavLink className={link} activeClassName={active} exact to='/coins'>List of Coins</NavLink>
                                {
                                    this.props.user.isAdmin ? <NavLink activeClassName={active} className={link} exact to='/admin'>Admin Panel</NavLink> : null
                                }
                                {/* {
                                    this.props.user.isAdmin === 0 ? <NavLink activeClassName={active} className={link} exact to='/cart'>Cart</NavLink> : null
                                }
                                {
                                    this.props.user.email ? <NavLink className={link} exact to='/posts' onClick={this.logout}>Posts</NavLink> : null
                                } */}
                            </Nav>
                            <Nav>
                                {
                                    !this.props.user.email ? <NavLink activeClassName={active} className={link} exact to='/registration'>Sign Up</NavLink> : null
                                }
                                {
                                    !this.props.user.email ? <NavLink activeClassName={active} className={link} exact to='/login'>Sign In</NavLink> : null
                                }
                                {
                                    this.props.user.email ? <NavLink className={link} exact to='/' onClick={this.logout}>Log Out</NavLink> : null
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logoutUser })(Navigation);