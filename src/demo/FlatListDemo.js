import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';

const cities = [
    {
        id: 1,
        cityName: '北京',
    },
    {
        id: 2,
        cityName: '上海',
    },
    {
        id: 3,
        cityName: '广州',
    },
    {
        id: 4,
        cityName: '深圳',
    },
    {
        id: 5,
        cityName: '郑州',
    },
    {
        id: 6,
        cityName: '杭州',
    },
    {
        id: 7,
        cityName: '苏州',
    },
    {
        id: 8,
        cityName: '成都',
    },
];

const citiesOnEnd = [
    {
        id: 101,
        cityName: '武汉',
    },
    {
        id: 10,
        cityName: '拉萨',
    },
    {
        id: 11,
        cityName: '丽江',
    },
    {
        id: 12,
        cityName: '重庆',
    }];

export default class FlatListDemo extends React.Component {

    // state 初始化
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: cities,
        };
    }

    _renderItemList = ({item}) => {
        return <View style={styles.item}>
            <Text style={styles.text}>{item.cityName}</Text>
        </View>;
    };

    /**
     * 下拉刷新数据
     */
    loadData(refreshing) {
        // 如果是下拉刷新，使顶部圈圈转起来
        if (refreshing) {
            this.setState({
                isLoading: true,
            });
        }
        setTimeout(() => {
            let dataArray = [];
            // 如果是下拉刷新，列表倒序
            if (refreshing) {
                // 下拉刷新，使数据倒序显示
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(citiesOnEnd);
            }

            this.setState({
                dataArray: dataArray,
                isLoading: false,
            });
        }, 2000);
    }

    /**
     * 上拉加载更多数据
     * @returns {*}
     */
    generateActivityIndicator() {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={'large'}
                    animating={true}
                    color={'red'}
                />
                <Text>正在加载更多</Text>
            </View>
        );
    }

    render() {
        // const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={this._renderItemList}
                    keyExtractor={(item, index) => item + index}
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this.loadData();
                    // }}
                    // 定制FlatList样式使用RefreshControl组件
                    refreshControl={
                        <RefreshControl
                            colors={['orange']}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true);
                            }}
                        />
                    }
                    ListFooterComponent={this.generateActivityIndicator()}
                    onEndReached={() => {
                        this.loadData();
                    }}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        fontSize: 18,
        height: 200,
        backgroundColor: '#169',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        margin: 10,
    },
});
