import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import ListOfCoins from './listOfCoins/ListOfCoins';
import Homepage from './homepage/Homepage';
import AdminMain from './adminMain/AdminMain';
import { getUserInfo } from '../actions'
import CoinDetailed from './coinDetailed/CoinDetailed';
import LogIn from './logIn/LogIn';
import Navigation from './navigation/Navigation';
import history from './history';
import EditForm from './adminMain/editForm/EditForm';
import Wrapper from './adminMain/editForm/Wrapper';
import Cart from './cart/Cart';
import SignUp from './registration/SignUp';
// import PostsMain from './posts/PostsMain';

class App extends Component {
    componentDidMount() {
        this.props.getUserInfo();
    }
    render() {
        return (
            <Router history={history}>
                <Navigation />
                <Route exact path='/' component={Homepage} />
                <Route exact path='/coins' component={ListOfCoins} />
                <Route exact path='/coins/coin/:id' render={(props) => <CoinDetailed {...props} />} />
                <Route exact path='/registration' component={SignUp} />
                {/* <Route exact path='/posts' component={PostsMain} /> */}
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/login' component={LogIn} />
                <Route exact path='/admin' component={AdminMain} />
                <Route exact path='/admin/edit/:id' component = {Wrapper} />
                <Route exact path='/admin/create' component={EditForm} />
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(App);