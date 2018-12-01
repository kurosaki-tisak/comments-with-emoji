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

    onCommentPressed = () => {
        this.props.navigation.navigate("Comment");
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.onCommentPressed}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="comments" size={20} color={colors.primary} />
                        <Text style={{ paddingLeft: 10, color: colors.primary }}>2</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

export default ArticleScreen;