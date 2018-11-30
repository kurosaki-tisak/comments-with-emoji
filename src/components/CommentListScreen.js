import React, { Component } from "react";
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

import { getCommentList, getArticleById } from "../actions";
import { colors } from "../theme";

class CommentListScreen extends Component {
  static navigationOptions = {
    header: "Comment"
  };

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      refreshing: true
    };
  }

  async componentWillMount() {
    this.fetchComments();

    this.receiveComments(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.receiveComments(nextProps);
  }

  receiveComments({ comments }) {
    this.setState({
      comments: comments,
      refreshing: false
    });

    console.log(comments);
  }

  onRefresh = () => {
    this.fetchComments();
  };

  fetchComments = () => {
    this.setState({ refreshing: true });

    this.props.dispatchGetCommentList("1");
  };

  onSubmitComment = async comment => {};

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
              keyExtractor={(item, index) => item.id}
            />
          </ScrollView>

          <InputBox
            user={{
              name: "Kittisak",
              avatar: `https://loremflickr.com/320/320/women`
            }}
            onSubmit={this.onSubmitComment}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  dispatchGetArticleById: articleID => getArticleById({ articleID }),
  dispatchGetCommentList: articleID => getCommentList({ articleID })
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
