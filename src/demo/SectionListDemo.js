import React from 'react';
import {ActivityIndicator, RefreshControl, SectionList, StyleSheet, Text, View} from 'react-native';

const DATA = [
    {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];

const fruits = [
    {
        title: 'Sides-2',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks-2',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts-2',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];

export default class SectionListDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: DATA,
        };
    }

    /**
     * 下拉刷新数据
     * @param refreshing
     */
    loadData(refreshing) {
        // 如果是下拉刷新，数据倒序显示
        if (refreshing) {
            this.setState({
                isLoading: true,
            });
        }

        setTimeout(() => {
            let dataArray = [];
            // 如果是下拉刷新，列表倒序
            if (refreshing) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(fruits);
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
                    color={'orange'}
                />
                <Text>Load more...</Text>
            </View>
        );
    }

    getListViewItem = (item) => {
        alert(item);
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#000',
                }}
            />
        );
    };

    _renderItem = ({item}) => {
        return <Text style={styles.item}
                     onPress={this.getListViewItem.bind(this, item)}>{item}</Text>;
    };

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.state.dataArray}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index}
                    refreshControl={
                        <RefreshControl
                            colors={['red']}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true);
                            }
                            }
                        />
                    }
                    ListFooterComponent={this.generateActivityIndicator()}
                    onEndReached={() => {
                        this.loadData();
                    }}
                    onEndReachedThreshold={0.5}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    stickySectionHeadersEnabled={true}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        marginHorizontal: 16,
    },
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        margin: 10,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#8fb1aa',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
