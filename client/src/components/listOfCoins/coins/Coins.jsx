import React, { Component } from 'react';
import Coin from './coin/Coin';
import { connect } from 'react-redux';
import styles from './Coins.module.css';
import { Animated } from "react-animated-css";
import ReactPagination from '../../pagination/Pagination';
import { changeCurrentPage, fetchFilteredCoins, resetCoinType } from '../../../actions';

class Coins extends Component {

    componentDidMount() {
        this.props.changeCurrentPage(1);
        this.props.fetchFilteredCoins(this.props.searchParams, this.props.filterParams, this.props.type, this.props.onPage, 1);
    }

    changeCurrentPage = numPage => {
        this.props.changeCurrentPage(numPage);
        this.props.fetchFilteredCoins(this.props.searchParams, this.props.filterParams, this.props.type, this.props.onPage, numPage);
    };

    render() {
        const { alert, coins } = styles
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div>
                    <div className='row'>
                        {
                            this.props.coins ?
                                this.props.coins.map(coin =>
                                    <div className='col-12 col-md-6 col-xl-4'>
                                        <Coin key={coin.id} {...coin} />
                                    </div>
                                ) : <div className={alert}>There is no coins found by given parameters</div>
                        }
                    </div>
                </div>
                <div>
                    <ReactPagination
                        currentPage={this.props.currentPage}
                        totalPages={Math.ceil(this.props.length / this.props.onPage)}
                        changeCurrentPage={this.changeCurrentPage} />
                </div>
            </Animated>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modal: state.filterModalState,
        coins: state.coins.paginated,
        length: state.coins.length,
        onPage: state.pageSize,
        currentPage: state.currentPage,
        filterParams: state.filterParams,
        searchParams: state.searchParams,
        type: state.coinType
    }
}

export default connect(mapStateToProps, { changeCurrentPage, fetchFilteredCoins, resetCoinType })(Coins)