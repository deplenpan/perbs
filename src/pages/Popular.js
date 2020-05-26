import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index';
import PopularItem from "../common/PopularItem";
import Toast from 'react-native-easy-toast';

const URL = "https://api.github.com/search/repositories?q=";

const QUERY_STR = "&sort=stars"

// pageSize设置为常量，防止修改
const pageSize = 10;

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.storeName = this.props.route.name;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMore) {
        const {onLoadPopularData, onLoadMorePopularData} = this.props;
        const store = this._store();
        const url = this.generateFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopularData(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('no more data');
            })
        } else {
            onLoadPopularData(this.storeName, url, pageSize)
        }
    }

    /**
     *
     * @private
     */
    _store() {
        const {popular} = this.props;
        // 动态获取state
        let store = popular[this.storeName];
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
        return URL + key + QUERY_STR;
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
        return <PopularItem
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
                    keyExtractor={(item, index) => item + index}
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
                            // 修复列表滚动时两次调用onEndReached
                            if (this.canLoadMore) {
                                // 当列表下拉到底部需要加载更多数据时调用
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={2}
                    // onMomentumScrollBegin prop is in ScrollView.js, not in FlatList.js
                    onMomentumScrollBegin={() => {
                        // 修复初始页调用onEndReached的问题
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
    popular: state.popular
})

const mapDispatchToProps = (dispatch) => ({
    onLoadPopularData: (storeName, url, pageSize) => dispatch(actions.onLoadPopularData(storeName, url, pageSize)),
    onLoadMorePopularData: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMorePopularData(storeName, pageIndex, pageSize, items, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Popular)

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    indicatorContainer: {
        alignItems: 'center',
    },
});
