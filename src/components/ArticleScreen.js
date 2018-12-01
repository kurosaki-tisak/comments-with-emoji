import React, { Component } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity 
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../theme";

class ArticleScreen extends Component {
  static navigationOptions = {
    title: "Article"
  };

  onCommentPressed = () => {
    this.props.navigation.navigate("Comment", {
      article: {
        id: 1,
        title: "Title of this article",
        content: '<h1>Hello world</h1>',
        postAt: "2018-04-19T12:59-0500",
        user: {
          id: 1,
          name: "Kittisak",
          avatar: "https://loremflickr.com/320/320/women"
        }
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={this.onCommentPressed}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="comments" size={20} color={colors.primary} />
            <Text style={{ paddingLeft: 10, color: colors.primary }}>2</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default ArticleScreen;
