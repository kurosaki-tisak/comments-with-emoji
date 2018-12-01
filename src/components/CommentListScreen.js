import React, { Component } from "react";
import { Header } from "react-navigation";
import { connect } from "react-redux";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  KeyboardAvoidingView
} from "react-native";
import { WebView } from 'react-native-webview';
import moment from "moment";
import InputBox from "./common/InputBox";
import Comment from "./common/Comment";

import { getCommentList, postComment } from "../actions";
import { colors } from "../theme";

class CommentListScreen extends Component {
  static navigationOptions = {
    title: "Comment"
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: {},
      comments: [],
      refreshing: true
    };
  }

  async componentWillMount() {
    this.fetchComments();
  }

  componentWillReceiveProps(nextProps) {
    this.receiveComments(nextProps);
  }

  receiveComments({ comment, comments }) {
    if (comment !== this.props.comment) {
      this.setState({
        comment: comment,
        comments: [comment, ...comments],
        refreshing: false
      });
    } else {
      this.setState({
        comment: comment,
        comments: comments,
        refreshing: false
      });
    }
  }

  onRefresh = () => {
    this.fetchComments();
  };

  fetchComments = () => {
    this.setState({ refreshing: true });

    this.props.dispatchGetCommentList("1");
  };

  onSubmitComment = ({ article, comment }) => {
    const now = moment([]);
    const postAt = `${moment(now).format(`YYYY-MM-DDTHH:mm:ss`)}`;

    this.props.dispatchPostComment("1", comment, postAt, article.user);
  };

  renderCommentItem = obj => {
    const comment = {
      content: obj.body,
      created: obj.postAt,
      user: {
        name: obj.user.name,
        avatar: obj.user.avatar
      }
    };

    return <Comment comment={comment} key={obj.id} />;
  };

  render() {
    const { navigation } = this.props;
    const article = navigation.getParam("article", {});
    const { title, content, postAt, user } = article;
    const { name, avatar } = user;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={Header.HEIGHT + 40}
          behavior="padding"
        >
          <ScrollView
            ref={scrollView => {
              this._scrollView = scrollView;
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <View style={styles.headerContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.headerAvatarContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.headerAvatar}
                    source={{ uri: avatar }}
                  />
                </View>
                <View style={styles.articleContainer}>
                  <Text style={[styles.text, styles.name]}>{name}</Text>
                  <Text style={[styles.article, styles.name]}>{title}</Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <WebView
                  originWhitelist={["*"]}
                  source={{ html: content }}
                />
                <Text style={[styles.text, styles.created]}>
                  {moment(postAt).fromNow()}
                </Text>
              </View>
            </View>
            <FlatList
              data={this.state.comments}
              renderItem={({ item }) => this.renderCommentItem(item)}
              keyExtractor={(item, index) => `${item.id}`}
            />
          </ScrollView>

          <InputBox
            user={user}
            onSubmit={comment => this.onSubmitComment({ article, comment })}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  dispatchGetCommentList: articleID => getCommentList({ articleID }),
  dispatchPostComment: (articleID, comment, createAt, user) =>
    postComment({ articleID, comment, createAt, user })
};

const mapStateToProps = state => {
  const { loading, comments, comment, error } = state.comment;
  return { loading, comments, comment, error };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListScreen);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20
  },
  headerContainer: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: "#EEE"
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingLeft: 15,
    paddingBottom: 15
  },
  headerAvatarContainer: {
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    width: 40
  },
  headerAvatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 20,
    width: 40,
    height: 40
  },
  articleContainer: {
    flex: 1,
    padding: 5
  },
  article: {
    color: colors.primary,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  text: {
    color: "#000",
    fontSize: 15
  },
  name: {
    fontWeight: "bold"
  },
  created: {
    color: "#BBB",
    paddingTop: 5
  }
};
