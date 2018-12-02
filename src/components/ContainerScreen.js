import { createStackNavigator, createAppContainer } from 'react-navigation';
import ArticleScreen from './ArticleScreen';
import CommentListScreen from './CommentListScreen';

const ContainerScreen = createStackNavigator(
    {
        Article: ArticleScreen,
        Comment: CommentListScreen
    },
    {
        initialRouteName: 'Article',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default createAppContainer(ContainerScreen);