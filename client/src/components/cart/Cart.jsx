import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCart } from '../../actions'

class Cart extends Component {

    componentDidMount() {
        this.props.getUserCart();
    }
    render() {
        return (
            <div className='container'>
                <div>Comming soon!</div>
            </div>
        )
    }

}

export default connect(null, { getUserCart })(Cart)

