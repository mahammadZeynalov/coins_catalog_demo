import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeOnPagePosts} from '../../actions';
import s from './PostsAll.module.css';

class OnPage extends Component {

    handleSelect = (e) => {
        this.changeOnPagePosts(e.target.value);
    }

    render() {
        const { select, margin, center_select } = s;
        return (
            <div className = {center_select}>
            <div className={select}>
                <label>One the page:</label>
                <select onChange={this.handleSelect} defaultValue={this.props.pageSize} class="form-control">
                    <option value='3'>3</option>
                    <option value='6'>6</option>
                    <option value='9'>9</option>
                    <option value='12'>12</option>
                    <option value='15'>15</option>
                </select>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        select: state.selectOnPagePosts
    }
}
export default connect(mapStateToProps, { changeOnPagePosts })(OnPage);