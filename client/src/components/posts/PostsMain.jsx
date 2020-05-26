import React, { Component } from 'react';
import { connect } from 'react-redux';
import OnPage from './OnPage';
import Select from './Select';
import Posts from './Posts';

class PostsMain extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-2'>
                        <Select />
                    </div>
                    <div className='col-sm-2 offset-md-6'>
                        <div>
                            <div>+ Post</div>
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm-2 offset-md-8'>
                        <OnPage />
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm'>
                        <Posts />
                    </div>
                </div>
            </div>
        )
    }
}

export default PostsMain;