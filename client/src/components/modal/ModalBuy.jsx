import React, { Component } from 'react';
import styles from './ModalWindow.module.css';
import { addToCart } from '../../actions'
import { connect } from 'react-redux';

class ModalBuy extends Component {

    handleSubmit = () => {
        this.props.addToCart(this.props.id, this.props.user.id);
        this.props.hide();
    }

    render() {
        const { ghost, modal_window, modal_btn_box } = styles
        return (
            <div className={ghost}>
                <div className={modal_window}>
                    <p>Are you sure to buy <bold>{this.props.name}</bold>?</p>
                    <div className={modal_btn_box}>
                        <button className="btn btn-primary" onClick = {this.handleSubmit}>OK</button>
                        <button className="btn btn-secondary"  onClick = {this.props.hide}>Cancel</button>
                    </div>
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

export default connect(mapStateToProps, { addToCart })(ModalBuy);