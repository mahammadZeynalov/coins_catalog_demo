import React, { Component } from 'react';
import Coins from './coins/Coins';
import Filter from '../filter/Filter'
import { getUserCart, changeCoinsOnPage, fetchFilteredCoins, resetCurrentPage, resetCoinType } from '../../actions'
import { connect } from 'react-redux';
import s from './ListOfCoins.module.css';
import Search from '../search/Search';

class ListOfCoins extends Component {

    handleSelect = (e) => {
        this.props.changeCoinsOnPage(+e.target.value);
        this.props.resetCurrentPage();
        this.props.fetchFilteredCoins(this.props.searchParams, this.props.filterParams, this.props.type, +e.target.value, 1)
    }
    componentDidMount() {
        this.props.fetchFilteredCoins(this.props.searchParams, this.props.filterParams, this.props.type, this.props.pageSize, 1)
    }
    render() {
        const type = this.props.match.params.type
        const { select, margin, center_select } = s;
        return (
            <div className={margin + ' container'}>
                <div className='row'>
                    <div className='col-sm-5'>
                        <Search />
                    </div>
                    <div className='col-sm'>
                        <div className = {center_select}>
                            <div className={select}>
                                <label>One the page:</label>
                                <select onChange={this.handleSelect} defaultValue={this.props.pageSize}>
                                    <option value='3'>3</option>
                                    <option value='6'>6</option>
                                    <option value='9'>9</option>
                                    <option value='12'>12</option>
                                    <option value='15'>15</option>
                                </select>
                            </div>
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
                        {
                            !(this.props.coins === undefined || this.props.coins.length === 0) ?
                                <Coins type={type} /> :
                                <div>There is no coins found</div>
                        }
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        coins: state.coins.paginated,
        filterParams: state.filterParams,
        searchParams: state.searchParams,
        type: state.coinType,
        modal: state.filterModalState,
        pageSize: state.pageSize,
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps, { getUserCart, changeCoinsOnPage, fetchFilteredCoins, resetCurrentPage, resetCoinType })(ListOfCoins);