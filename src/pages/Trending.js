import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index';
import Toast from 'react-native-easy-toast';
import TrendingItem from "../common/TrendingItem";

// https://github.com/trending/dart?since=daily
const URL = "https://github.com/trending";
// 默认按天排序
const QUERY_STR = "?since=daily"
// const QUERY_STR = "?since=weekly"
// const QUERY_STR = "?since=monthly"

// pageSize设置为常量，防止修改
const pageSize = 10;

class Trending extends React.Component {

    constructor(props) {
        super(props);
        this.storeName = this.props.route.name;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMore) {
        const {onLoadTrendingData, onLoadMoreTrendingData} = this.props;
        const store = this._store();
        const url = this.generateFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMoreTrendingData(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('no more data');
            })
        } else {
            onLoadTrendingData(this.storeName, url, pageSize)
        }
    }

    /**
     *
     * @private
     */
    _store() {
        const {trending} = this.props;
        // 动态获取state
        let store = trending[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                // 要显示的数据
                projectModes: [],
                // 默认隐藏加载更多
                hideLoadingMore: true,
            }
        }
        return store;
    }

    generateFetchUrl(key) {
        if (key.toLowerCase() === "all") {
            return URL + QUERY_STR;
        }
        return URL + "/" + key + QUERY_STR;
    }

    generateIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    animating={true}
                    color={'tomato'}
                    size={'large'}
                />
                <Text style={{fontSize: 20}}>Loading more data</Text>
            </View>
    }

    renderItem(data) {
        const item = JSON.stringify(data.item);
        return <TrendingItem
            item={item}
            onSelect={() => {

            }}
        />
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.rootContainer}>
                <FlatList
                    data={store.projectModes}
                    renderItem={(data) => this.renderItem(data)}
                    keyExtractor={(item) => item.fullName.toString()}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={['red']}
                            refreshing={
                                store.isLoading
                            }
                            onRefresh={() => {
                                this.loadData();
                            }}
                        />
                    }
                    ListFooterComponent={() => this.generateIndicator()}
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={2}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true;
                    }}
                />
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    trending: state.trending
})

const mapDispatchToProps = (dispatch) => ({
    onLoadTrendingData: (storeName, url, pageSize) => dispatch(actions.onLoadTrendingData(storeName, url, pageSize)),
    onLoadMoreTrendingData: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMoreTrendingData(storeName, pageIndex, pageSize, items, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Trending)

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    indicatorContainer: {
        alignItems: 'center',
    },
});
