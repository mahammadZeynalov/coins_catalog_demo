import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated } from "react-animated-css";

class Post extends Component {
    render() {
        const { container, navlink, text, info, btn_group } = styles
        return (
            <div className={container}>
                <div>
                    <img className={styles.image_coin} src={path + this.props.image_averse} alt={this.props.name} />
                </div>
                <div className={info}>
                    <NavLink className={navlink} to={link}>{this.props.name}</NavLink>
                    <p className={text}></p>
                </div>
            </div>
        )
    }
}

export default Post;