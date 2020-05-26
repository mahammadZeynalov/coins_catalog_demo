import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated } from "react-animated-css";
import history from '../history';
import s from './CoinDetailed.module.css';
import { fetchSoloCoin } from '../../actions'

const path = 'http://161.35.222.71/image/';
class CoinDetailed extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchSoloCoin(id);
    }

    render() {
        const { container, image_section, info_section, image, heading, text, table, back, wrapper, margin } = s;
        if (this.props.coin) {
            const { coin } = this.props
            return (
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <div className={margin + ' container'}>
                        <div className='row'>
                            <div className='col align-self-center'>
                                <main className={container}>
                                    <section className={image_section}>
                                        <img className={image} src={path + coin.image_averse} alt='coin' />
                                        <img className={image} src={path + coin.image_reverse} alt='coin' />
                                    </section>
                                    <section className={info_section}>
                                        <div >
                                            <div className={heading}>{coin.name}</div>
                                            <p className={text}>{coin.short_description}</p>
                                            <p className={text}>{coin.full_description}</p>
                                        </div>
                                        <table className={table}>
                                            <tbody>
                                                <tr>
                                                    <td>Issuing Country</td>
                                                    <td>{coin.country}</td>
                                                </tr>
                                                <tr>
                                                    <td>Composition</td>
                                                    <td>{coin.metal}</td>
                                                </tr>
                                                <tr>
                                                    <td>Quality</td>
                                                    <td>{coin.quality}</td>
                                                </tr>
                                                <tr>
                                                    <td>Denomination</td>
                                                    <td>{coin.face_value}</td>
                                                </tr>
                                                <tr>
                                                    <td>Year</td>
                                                    <td>{coin.issue_year}</td>
                                                </tr>
                                                <tr>
                                                    <td>Weight</td>
                                                    <td>{coin.weight}</td>
                                                </tr>
                                                <tr>
                                                    <td>Price</td>
                                                    <td>{coin.price}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className={back} onClick={() => { history.goBack() }}>Back to the list</div>
                                    </section>
                                </main>
                            </div>
                        </div>

                    </div>
                </Animated>
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
export default connect(mapStateToProps, { fetchSoloCoin })(CoinDetailed);