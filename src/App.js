import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentListScreen from './components/CommentListScreen';

class App extends Component {

    render() {
        return <CommentListScreen/>
    }
}

const mapStateToProps = (state) => ({
    comment: state.comment
});

export default connect(mapStateToProps)(App);