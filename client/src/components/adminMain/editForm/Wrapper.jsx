import React, { Component } from 'react';
import EditForm from './EditForm';
import { connect } from 'react-redux';
import { fetchSoloCoin  } from '../../../actions'

class Wrapper extends Component {

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.fetchSoloCoin(id);
    }

    render() {
        const id = this.props.match.params.id;
        const nextId = this.props.coin.id
        if (+id === +nextId) {
            return (
                <EditForm initialValues={this.props.coin} />
            )
        } else {
            return <div>Loading...</div>
        }
    }
}


const mapStateToProps = (state) => {
    return {
        coin: state.coin
    }
}

export default connect(mapStateToProps, {fetchSoloCoin})(Wrapper);

