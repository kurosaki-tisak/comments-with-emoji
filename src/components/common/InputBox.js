import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { 
    TextInput,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

export default class InputBox extends Component {

    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
        onSubmit: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.user.name,
            text: undefined, // user's input
        };
    }

    // Update state when input changes
    onChangeText = (text) => this.setState({ text });

    // Handle return press on the keyboard
    onSubmitEditing = ({ nativeEvent: { text }} ) => this.setState({ text });

    // Call this.props.onSubmit handler and press the comment
    submit = () => {
        const { text } = this.state;
        if (text) {
            this.setState({ text: undefined }, () => this.props.onSubmit(text));
        } else {
            alert('Please enter your comment first');
        }
    };

    render() {
        return (
            <KeyboardAvoidingView
                behavior='position'
            >
            <View style={styles.container}>
                <TextInput
                    placeholder={`Comment as ${this.state.userName}...`}
                    keyboardType="twitter"
                    autoFocus={true}
                    style={styles.input}
                    value={this.state.text}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submit}
                >
                    <Text style={[styles.text, !this.state.text ? styles.inactive : []]}>
                        Post
                    </Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = {
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        alignItems: 'center',
        paddingLeft: 15,
      },
      input: {
        flex: 1,
        height: 40,
        fontSize: 15,
      },
      button: {
        height: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      inactive: {
        color: '#CCC',
      },
      text: {
        color: '#3F51B5',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        textAlign: 'center',
        fontSize: 15,
      },
}