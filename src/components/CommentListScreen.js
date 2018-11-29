import React, { Component } from 'react';
import { 
    View, 
    ScrollView,
    RefreshControl
} from 'react-native';

import InputBox from './common/InputBox';

class CommentListScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            comments: [],
            refreshing: true,
        };
    }

    onRefresh = () => { }

    onSubmitComment = async (comment) => {

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView) => { this._scrollView = scrollView; }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                        />
                    }
                >

                </ScrollView>
                <InputBox
                    user={{ name: 'Kittisak', avatar: ''}}
                    onSubmit={this.onSubmitComment}
                />
            </View>
        )
    }
}

export default CommentListScreen;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 20,
      }
}