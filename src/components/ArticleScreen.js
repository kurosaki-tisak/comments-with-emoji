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
        content: '<h1>This is title</h1><p>Throw your entire HTML here</p>',
        postAt: "2018-11-01T12:59-0500",
        user: {
          id: 1,
          name: "Kittisak",
          avatar: "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/46809992_10216581688868586_2607384708786421760_o.jpg?_nc_cat=105&_nc_ht=scontent.fbkk12-2.fna&oh=8f51b1006850b9a23338e443fd7e074e&oe=5C660299"
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
