import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeBuySelect } from '../../actions'

class Select extends Component {

    handleSelect = (e) => {
        this.changeBuySelect(e.target.value)
    }

    render() {
        return (
            <div>
                <select onChange={this.handleSelect} defaultValue={this.props.pageSize} class="form-control">
                    <option value = 'buy'>Buy</option>
                    <option value = 'sell'>Sell</option>
                </select>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        select: state.selectBuyOrSell
    }
}

export default connect(mapStateToProps, { changeBuySelect })(Select);