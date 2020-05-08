import React from 'react';
import {Button, Text, View} from 'react-native';

export default class Details extends React.Component {
    render() {
        /* 2. Get the param */
        const {navigation} = this.props;
        const {params} = this.props.route;
        const cityId = params ? params.cityId : null;
        const cityName = params ? params.cityName : null;
        const cityCode = params ? params.cityCode : null;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>This is Details Screen</Text>
                <Button
                    title={'Go To Home Page'}
                    onPress={() =>
                        navigation.navigate('Home')
                    }
                />
                <Text style={{fontSize: 16}}>----开始接收其他组件传递的参数----</Text>
                <Text>cityId: {JSON.stringify(cityId)}</Text>
                <Text>cityName: {JSON.stringify(cityName)}</Text>
                <Text>cityCode: {JSON.stringify(cityCode)}</Text>
                <Button
                    title={'Go To Details ... again'}
                    onPress={() => {
                        navigation.push('Details', {
                            cityId: Math.floor(Math.random() * 100),
                        });
                    }}
                />
                <Text>返回主页</Text>
                <Button
                    title={'Go To Home'}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                />
                <Text>返回上一页</Text>
                <Button title="Go back" onPress={() => navigation.goBack()}/>
            </View>
        );
    }
}
