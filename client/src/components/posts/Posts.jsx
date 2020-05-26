import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PostsAll.module.css';
import { Animated } from "react-animated-css";
import ReactPagination from '../pagination/Pagination';


class Posts extends Component {
    render() {
        const { alert, coins } = styles
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div className={coins}>
                </div>
                <div>
                    <ReactPagination
                        currentPage={1}
                        totalPages={1}
                        changeCurrentPage={1} />
                </div>
            </Animated>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, null)(Posts);