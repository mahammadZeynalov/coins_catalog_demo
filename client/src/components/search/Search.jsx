import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFilterModal, fetchFilteredCoins, changeSearchParametrs, resetCurrentPage, resetCoinType } from '../../actions'
import styles from './Search.module.css';
import history from '../history';

class Search extends Component {

    handleBtnAdvanced = () => {
        this.props.toggleFilterModal();
    }

    handleTextInput = (e) => {
        this.props.changeSearchParametrs(e.target.value);
    }

    searchCoins = (value) => {
        history.push('/coins');
        this.props.resetCurrentPage();
        this.props.resetCoinType();
        this.props.fetchFilteredCoins(value, this.props.filterParams, '', this.props.pageSize, 1);
    }


    render() {
        
        const { btn, search, search_block, container, input } = styles
        return (
            <div className = {container}>
                <div>
                    <label htmlFor='text'>Search text</label>
                    <input type='text' id='text' className={input + ' form-control'} onChange={this.handleTextInput} value={this.props.searchParams} />
                    <div className={btn} to='/filter' onClick={this.handleBtnAdvanced}>
                        Advanced filter >
                </div>
                </div>
                <div className={search_block}>
                    <div className={search} onClick={() => { this.searchCoins(this.props.searchParams) }}>Search</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filterModalState,
        coins: state.coins,
        pageSize: state.pageSize,
        currentPage: state.currentPage,
        filterParams: state.filterParams,
        searchParams: state.searchParams,
        type: state.coinType
    }
}

export default connect(mapStateToProps, { toggleFilterModal, changeSearchParametrs, fetchFilteredCoins, resetCurrentPage, resetCoinType })(Search)