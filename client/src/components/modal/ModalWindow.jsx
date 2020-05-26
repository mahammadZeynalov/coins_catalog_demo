import React, { Component } from 'react';
import styles from './ModalWindow.module.css';
import { fetchDeleteCoin } from '../../actions'
import { connect } from 'react-redux';

class ModalWindow extends Component {

    deleteCoin = () => {
        this.props.fetchDeleteCoin(this.props.id);
        this.props.hide();
    }

    render() {
        const { ghost, modal_window, modal_btn_box } = styles
        return (
            <div className={ghost}>
                <div className={modal_window}>
                    <p>Are you sure to delete the {this.props.name} coin?</p>
                    <div className={modal_btn_box}>
                        <button onClick={this.deleteCoin} className ="btn btn-primary">OK</button>
                        <button onClick={this.props.hide} className ="btn btn-secondary"  >Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { fetchDeleteCoin })(ModalWindow);



