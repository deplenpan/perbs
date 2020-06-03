import React from 'react';
import PropTypes from 'prop-types';
import {Platform, StatusBar, StyleSheet, Text, View, ViewPropTypes} from "react-native";

// 导航栏在IOS中的高度
const NAV_BAR_WEIGHT_IOS = 44;
// 导航栏在ANDROID中的高度
const NAV_BAR_WEIGHT_ANDROID = 10;
// 状态栏的高度
const STATUS_BAR_WEIGHT = 20;
// 设置状态栏接受的属性
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
}

/**
 * 在组件的 props 上进行类型检查，你只需配置特定的 propTypes 属性
 * 当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，propTypes 仅在开发模式下进行检查
 */
NavigationBar.propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    // 通过 PropTypes.element 来确保传递给组件的 children 中只包含一个元素
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
};

NavigationBar.defaultProps = {
    statusBar: {
        barStyle: 'light-content',
        hidden: false,
    },
};

export default class NavigationBar extends React.Component {
    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View> : null;
        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode={'head'} numberOfLines={1} style={styles.title}>{this.props.title}</Text>;
        let content = this.props.hide ? null :
            <View style={styles.navigationBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navigationBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }

    getButtonElement(leftButton) {
        return (
            <View style={styles.navigationBarButton}>
                {data ? data : null}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196f3',
    },
    navigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === "ios" ? NAV_BAR_WEIGHT_IOS : NAV_BAR_WEIGHT_ANDROID,
    },
    navigationBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // 绝对布局
        position: 'absolute',
        // 左边距
        left: 40,
        // 右边距
        right: 40,
        // 顶部边距
        top: 0,
        // 底部边距
        bottom: 0,
    },
    navigationBarButton: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    statusBar: {
        height: Platform.OS === "ios" ? STATUS_BAR_WEIGHT : 0,
    }
});
