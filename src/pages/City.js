import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';

// const CITY_NAMES=[ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '西藏', '洛阳', '厦门', '青岛', '拉萨'];

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

export default class City extends React.Component {
    _renderItem(data) {
        // alert(data.item)
        // console.log(data.item);
        // alert(data.cityName);
        return (
            <View>
                <Text>{data.cityName}</Text>
            </View>
        );
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={cities}
                    renderItem={({item}) => {
                        this._renderItem(item);
                    }
                    }
                    keyExtractor={(item) => item.id.toString()}
                />
                <Text style={{fontSize: 16}}>This is City FlatList Page</Text>
                <Button
                    title={'Go To Home Screen'}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                />
                <Button title="Go back" onPress={() => navigation.goBack()}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
