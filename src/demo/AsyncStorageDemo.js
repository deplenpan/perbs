import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const key = 'ai';

export default class AsyncStorageDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        };
    }

    /**
     * 存储数据
     */
    storeData = async () => {
        try {
            // await AsyncStorage.setItem(key, 'java');
            console.log('this.data = ' + this.data);
            await AsyncStorage.setItem(key, this.data);
        } catch (e) {
            // saving error
            console.log(e.toString());
        }
    };
    // async doSave() {
    //   // 用法一
    //   // AsyncStorage.setItem(Key, this.text, error => {
    //   //   error && console.log(error.toString());
    //   // });

    //   //   // 用法二
    //   //   AsyncStorage.setItem(Key, this.value).catch(error => {
    //   //     error && console.log(error.toString());
    //   //   });

    //   // 用法三
    //   try {
    //     console.log('存储前，this.value = ' + this.value);
    //     await AsyncStorage.setItem(Key, this.value);
    //     console.log('存储后，this.value = ' + this.value);
    //   } catch (error) {
    //     error && console.log(error.toString());
    //   }
    // }

    /**
     * 删除数据
     * returns {Promise.<void>}
     */
    removeData = async () => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.log(e.toString());
        }
    };
    // async doRemove() {
    // // 用法一
    // AsyncStorage.removeItem(Key, error => {
    //   error && console.log(error.toString());
    // });

    // // 用法二
    // AsyncStorage.removeItem(Key).catch(error => {
    //   error && console.log(error.toString());
    // });

    // 用法三
    //   try {
    //     await AsyncStorage.removeItem(key);
    //   } catch (error) {
    //     error && console.log(error.toString());
    //   }
    // }

    /**
     * 获取数据
     */
    getData = async () => {
        try {
            const _storage_value = await AsyncStorage.getItem(key);
            if (_storage_value !== null) {
                // value previously stored
                console.log(_storage_value);
            }
        } catch (e) {
            console.log(e.toString());
            // error reading value
        }
    };
    // async getData() {
    // 用法一
    // AsyncStorage.getItem(Key, (value, error) => {
    //   this.setState = {
    //     showText: value,
    //   };
    //   alert(value);
    //   console.log(value);
    //   error && console.log(error.toString());
    // });

    // // 用法二
    // AsyncStorage.getItem(Key)
    //   .then(value => {
    //     this.setState = {
    //       showText: value,
    //     };
    //     console.log(value);
    //   })
    //   .catch(error => {
    //     error && console.log(error.toString());
    //   });

    // 用法三
    //   try {
    //     const value = await AsyncStorage.getItem(Key);
    //     this.setState = {
    //       showText: value,
    //     };
    //     console.log(value);
    //   } catch (error) {
    //     error && console.log(error.toString());
    //   }
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>AsyncStorage使用</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'please input anything you want'}
                    onChangeText={text => {
                        this.data = text;
                        // console.log('this = ' + this);
                        // console.log('text = ' + text);
                        // console.log('this.data = ' + this.data);
                    }}
                />
                <View style={styles.input_container}>
                    <Text
                        onPress={() => {
                            this.storeData();
                        }}>
                        存储
                    </Text>
                    <Text
                        onPress={() => {
                            this.removeData();
                        }}>
                        删除
                    </Text>
                    <Text
                        onPress={() => {
                            this.getData();
                        }}>
                        获取
                    </Text>
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 40,
        // flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
