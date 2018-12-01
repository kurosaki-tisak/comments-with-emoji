import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContainerScreen from './components/ContainerScreen';

class App extends Component {

    render() {
        return <ContainerScreen/>
    }
}

const mapStateToProps = (state) => ({
    comment: state.comment
});

export default connect(mapStateToProps)(App);