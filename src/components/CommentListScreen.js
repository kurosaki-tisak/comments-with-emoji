import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  KeyboardAvoidingView
} from "react-native";
import moment from "moment";
import InputBox from "./common/InputBox";
import Comment from "./common/Comment";

import { getCommentList, postComment, getArticleById } from "../actions";
import { colors } from "../theme";

class CommentListScreen extends Component {

  static propTypes = {
    article: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      content: PropTypes.string,
      postAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  static navigationOptions = {
    header: "Comment"
  };

  constructor(props) {
    super(props);

    this.state = {
      article: {},
      user: {
        id: 1,
        name: "Kittisak",
        avatar: `https://loremflickr.com/320/320/women`
      },
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

    console.log(comment);
  }

  onRefresh = () => {
    this.fetchComments();
  };

  fetchComments = () => {
    this.setState({ refreshing: true });

    this.props.dispatchGetCommentList("1");
  };

  onSubmitComment = comment => {
    const now = moment([]);
    const postAt = `${moment(now).format(`YYYY-MM-DDTHH:mm:ss`)}`;

    this.props.dispatchPostComment("1", comment, postAt, this.state.user);
  };

  onEmojiPressed = isEmojiPressed => {

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
    const name = "Kittisak";
    const title = "Title of this article";
    const content = "Test test";
    const created = "2018-04-19T12:59-0500";

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
                    source={{ uri: "https://loremflickr.com/320/320/women" }}
                  />
                </View>
                <View style={styles.articleContainer}>
                  <Text style={[styles.text, styles.name]}>{name}</Text>
                  <Text style={[styles.article, styles.name]}>{title}</Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <Text>{content}</Text>
                <Text style={[styles.text, styles.created]}>
                  {moment(created).fromNow()}
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
            user={this.state.user}
            onSubmit={this.onSubmitComment}
            onEmojiPress={this.onEmojiPressed} />

        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  dispatchGetArticleById: articleID => getArticleById({ articleID }),
  dispatchGetCommentList: articleID => getCommentList({ articleID }),
  dispatchPostComment: (articleID, comment, createAt, user) =>
    postComment({ articleID, comment, createAt, user })
};

const mapStateToProps = state => {
  const { article } = state.article;
  const { loading, comments, comment, error } = state.comment;
  return { loading, article, comments, comment, error };
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
