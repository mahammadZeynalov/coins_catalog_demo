import React, { Component } from 'react';
import Filter from '../filter/Filter';
import { Animated } from "react-animated-css";
import Search from '../search/Search';
import s from './Homepage.module.css';
import { NavLink } from 'react-router-dom';
import M from './images/Alligatorv_2.png';
import E from './images/Canadian_Beaver_2.png';
import F from './images/Franc_2.png'

class Homepage extends Component {
    render() {
        const { link, image_coin, margin } = s
        return (

            <div className={margin + ' container'}>
                <div className='row'>
                    <div className='col-sm-5'>
                        <Search />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <Filter />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm shadow-sm p-3 mb-5 bg-white rounded'>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <h1>Memorial coins</h1>
                            <NavLink to='/coins' className={link}>Show all ></NavLink>
                            <div>
                                <img className={image_coin} src={M} alt='coint' />
                            </div>
                        </Animated>
                    </div>
                    <div className='col-sm shadow-sm p-3 mb-5 bg-white rounded'>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <h1>Exclusive coins</h1>
                            <NavLink to='/coins' className={link}>Show all ></NavLink>
                            <div>
                                <img className={image_coin} src={E} alt='coint' />
                            </div>
                        </Animated>
                    </div>
                    <div className='col-sm shadow-sm p-3 mb-5 bg-white rounded'>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <h1>Invested coins</h1>
                            <NavLink to='/coins' className={link}>Show all ></NavLink>
                            <div>
                                <img className={image_coin} src={F} alt='coint' />
                            </div>
                        </Animated>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;