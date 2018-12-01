import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TextInput,
  Text,
  Image,
  View,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors } from '../../theme';

export default class InputBox extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onEmojiPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      userName: this.props.user.name,
      text: undefined, // user's input
      isEmojiPressed: false
    };
  }

  // Update state when input changes
  onChangeText = text => this.setState({ text });

  // Handle return press on the keyboard
  onSubmitEditing = ({ nativeEvent: { text } }) => this.setState({ text });

  // Call this.props.onSubmit handler and press the comment
  submit = () => {
    const { text } = this.state;
    if (text) {
      this.setState({ text: undefined }, () => this.props.onSubmit(text));
    } else {
      alert("Please enter your comment first");
    }
  };

  emojiClick = () => {
    const { isEmojiPressed } = this.state;
    if (isEmojiPressed) {
      this.setState({ isEmojiPressed: false }, () => this.props.onEmojiPress(isEmojiPressed));
    } else {
      this.setState({ isEmojiPressed: true }, () => this.props.onEmojiPress(isEmojiPressed));  
    }
  }

  render() {
    const { avatar } = this.props.user;

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            resizeMode="contain"
            style={styles.avatar}
            source={{ uri: avatar }}
          />
        </View>
        <TextInput
          placeholder={`Comment as ${this.state.userName}...`}
          keyboardType="twitter"
          autoFocus={false}
          style={styles.input}
          value={this.state.text}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
        />
        <Icon name="smile" size={20} color={!this.state.isEmojiPressed ? `#CCC` : colors.primary} onPress={this.emojiClick} />
        <TouchableOpacity style={styles.button} onPress={this.submit}>
          <Text
            style={[styles.text, !this.state.text ? styles.inactive : []]}
          >
            Post
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    paddingLeft: 15
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  inactive: {
    color: "#CCC"
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },
  avatarContainer: {
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    width: 40
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 20,
    width: 40,
    height: 40
  },
};
