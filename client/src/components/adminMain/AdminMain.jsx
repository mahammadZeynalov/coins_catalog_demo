import React, { Component } from 'react';
import styles from './AdminMain.module.css';
import history from '../history';
import Search from '../search/Search';
import Filter from '../filter/Filter';
import Coins from '../listOfCoins/coins/Coins';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'


class AdminMain extends Component {
    render() {
        const { addCoin, margin } = styles
        if (this.props.user) {
            return (
                <div className={margin + ' container'}>
                    <div className='row'>
                        <div className='col-sm-5'>
                            <Search />
                        </div>
                        <div className='col-sm align-self-end' >
                            <div className={addCoin}>
                                <div onClick={() => history.push('/admin/create')}>+ Add new coin</div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm'>
                            <Filter />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm'>
                            <Coins />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div>You are not logged in as admin! Please, <NavLink exact to='/login'>login</NavLink></div>
                </div>

            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.isAdmin
    }
}

export default connect(mapStateToProps, null)(AdminMain);