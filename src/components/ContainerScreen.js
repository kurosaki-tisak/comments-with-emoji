import { createStackNavigator } from 'react-navigation';
import ArticleScreen from './ArticleScreen';
import CommentListScreen from './CommentListScreen';

export default ContainerScreen = createStackNavigator(
    {
        Article: ArticleScreen,
        Comment: CommentListScreen
    },
    {
        initialRouteName: 'Article'
    }
);