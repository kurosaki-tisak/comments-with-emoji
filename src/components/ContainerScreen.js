import { createStackNavigator, createNavigationContainer } from 'react-navigation';
import ArticleScreen from './ArticleScreen';
import CommentListScreen from './CommentListScreen';

const ContainerScreen = createStackNavigator(
    {
        Article: ArticleScreen,
        Comment: CommentListScreen
    },
    {
        initialRouteName: 'Article'
    }
);

export default createNavigationContainer(ContainerScreen);