import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Coin.module.css';
import { connect } from 'react-redux';
import { addToCart, fetchDeleteCoin } from '../../../../actions';
import history from '../../../history';
import ModalWindow from '../../../modal/ModalWindow';
import ModalBuy from '../../../modal/ModalBuy';

const path = 'http://161.35.222.71/image/'
class Coin extends Component {

    state = {
        modal: false,
        buyModal: false
    }

    handleDelete = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleBuy = () => {
        this.setState({
            buyModal: !this.state.buyModal
        })
    }

    render() {
        const link = `/coins/coin/${this.props.id}`;
        const { container, navlink, text, info, btn_group } = styles
        return (
            <div className={container}>
                <div>
                    <img className={styles.image_coin} src={path + this.props.image_averse} alt={this.props.name} />
                </div>
                <div className={info}>
                    <NavLink className={navlink} to={link}>{this.props.name}</NavLink>
                    <p className={text}>{this.props.short_description}</p>
                    {
                        this.props.user.isAdmin === 0 ? <div className = {btn_group}><button className="btn btn-primary" onClick={this.handleBuy}>Buy</button></div> : null
                    }
                    {
                        this.props.user.isAdmin ?
                            <div className = {btn_group}>
                                <button className="btn btn-primary" onClick = {() => history.push(`admin/edit/${this.props.id}`)}>Edit</button>
                                <button className="btn btn-secondary" onClick={this.handleDelete}>Delete</button>
                            </div> : null
                    }
                </div>
                {
                    this.state.modal && <ModalWindow id = {this.props.id} name = {this.props.name} hide = {this.handleDelete}/>
                }
                {
                    this.state.buyModal && <ModalBuy id = {this.props.id} name = {this.props.name} hide = {this.handleBuy}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        type: state.coinType
    }
}
export default connect(mapStateToProps, { addToCart, fetchDeleteCoin })(Coin);