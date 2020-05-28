import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Filter.module.css';
import {
    fetchCoinsPropertiesCountry,
    fetchCoinsPropertiesMetal,
    fetchCoinsPropertiesQuality,
    fetchFilteredCoins,
    changefilterParametrs
} from '../../actions'
import { Animated } from "react-animated-css";

class Filter extends Component {

    componentDidMount() {
        this.props.fetchCoinsPropertiesCountry();
        this.props.fetchCoinsPropertiesMetal();
        this.props.fetchCoinsPropertiesQuality();
    }

    state = {
        isVisible: false,
        country: '',
        metal: '',
        quality: '',
        priceFrom: '',
        priceTo: '',
        yearFrom: '',
        yearTo: ''
    }

    handleValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.props.changefilterParametrs(this.state);
        })
    }

    renderCountries = () => {
        const countries = this.props.coinsProperties.country.data
        return countries.map((country, index) => <option key={index} value={country.country}>{country.country}</option>)
    }

    renderMetals = () => {
        const metals = this.props.coinsProperties.metal.data
        return metals.map((metal, index) => <option key={index} value={metal.metal}>{metal.metal}</option>)
    }

    renderQualities = () => {
        const qualities = this.props.coinsProperties.quality.data
        return qualities.map((quality, index) => <option key={index} value={quality.quality}>{quality.quality}</option>)
    }


    render() {
        const { label, input, metal, quality, country, number, number_parent, container } = styles

        if (this.props.modal && this.props.coinsProperties.country
            && this.props.coinsProperties.metal
            && this.props.coinsProperties.quality) {
            return (
                <Animated className = {container} animationIn="bounceInUp" animationOut="fadeIn" isVisible={true} animationInDuration={500}>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6'>
                                <div className={country}>
                                    <label className = {label}>
                                        Issuing country
                            </label>
                                    <select name='country' onChange={this.handleValue} value={this.props.filterParams.country}>
                                        <option value=''>Any</option>
                                        {
                                            this.renderCountries()
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <div >
                                    <label className = {label}>Price</label>
                                    <div className = {number_parent}>
                                        <div className = {number}>
                                            {/* <label className={label}>from</label> */}
                                            <input placeholder = 'from' className={input} name='priceFrom' type='number' onChange={this.handleValue} value={this.props.filterParams.priceFrom} />
                                        </div>
                                        <div className = {number}>
                                            {/* <label className={label}>to</label> */}
                                            <input placeholder = 'to' className={input} name='priceTo' type='number' onChange={this.handleValue} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'> 
                            <div className='col-sm-12 col-md-6'>
                                <div className={metal}>
                                    <label className = {label}>
                                        Metal
                            </label>
                                    <select name='metal' onChange={this.handleValue} value={this.props.filterParams.metal}>
                                        <option value=''>Any</option>
                                        {
                                            this.renderMetals()
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <div >
                                    <label className = {label}>Year of issue</label>
                                    <div className = {number_parent}>
                                        <div className = {number}>
                                            {/* <label className={label}>from</label> */}
                                            <input placeholder = 'from' className={input} name='yearFrom' type='number' onChange={this.handleValue} value={this.props.filterParams.yearFrom} />
                                        </div>
                                        <div className = {number}>
                                            {/* <label className={label}>to</label> */}
                                            <input placeholder = 'to' className={input} name='yearTo' type='number' onChange={this.handleValue} value={this.props.filterParams.yearTo} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6'>
                                <div className={quality}>
                                    <label className = {label}>
                                        Quality of the coin
                            </label>
                                    <select name='quality' onChange={this.handleValue} value={this.props.filterParams.quality}>
                                        <option value=''>Any</option>
                                        {
                                            this.renderQualities()
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                            </div>
                        </div>
                </Animated>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        modal: state.filterModalState,
        coins: state.coins,
        filterParams: state.filterParams,
        coinsProperties: state.coinsProperties,
        pageSize: state.pageSize,
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps, {
    fetchCoinsPropertiesCountry,
    fetchCoinsPropertiesMetal,
    fetchCoinsPropertiesQuality,
    fetchFilteredCoins,
    changefilterParametrs
})(Filter);