import React, { Component } from 'react';
import styles from './ModalWindow.module.css';
import { closeModalCreateEdit } from '../../actions'
import { connect } from 'react-redux';
import history from '../history'

class ModalAdmin extends Component {

    handleSubmit = () => {
        this.props.closeModalCreateEdit();
    }

    render() {
        const { ghost, modal_window, admin_modal } = styles
        return (
            <div className={ghost}>
                <div className={modal_window}>
                    <p>{this.props.createdCoin.error ? 'Internal server error, please, try later.' : 'Success!'}</p>
                    <div className = {admin_modal}>
                        <button className="btn btn-primary" onClick={() => {
                            history.push('/admin')
                            this.props.closeModalCreateEdit()
                        }}>Admin Panel</button>
                        <button className="btn btn-secondary" onClick={this.handleSubmit}>Stay here</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        modal: state.modalCreateEdit,
        createdCoin: state.createdCoin
    }
}
export default connect(mapStateToProps, { closeModalCreateEdit })(ModalAdmin);