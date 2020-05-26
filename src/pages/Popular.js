import React from 'react';
import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index';
import PopularItem from "../common/PopularItem";

const URL = "https://api.github.com/search/repositories?q=";

const QUERY_STR = "&sort=stars"

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.storeName = this.props.route.name;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.generateFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url)
    }

    generateFetchUrl(key) {
        return URL + key + QUERY_STR;
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
        const {popular} = this.props;
        // 动态获取state
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
            }
        }
        return (
            <View style={styles.rootContainer}>
                <FlatList
                    data={store.items}
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
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    popular: state.popular
})

const mapDispatchToProps = (dispatch) => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Popular)

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 30,
    }
});
