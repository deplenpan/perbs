import React from 'react'
import {Image, View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class PopularItem extends React.Component {

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('check item', () => {
            return "success";
        })
    }

    componentWillUnmount() {
        this.listener.remove();
    }


    render() {
        const {item} = this.props;
        const data = JSON.parse(item);
        if (!data || !data.owner) {
            return null;
        }

        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.rootContainer}>
                    <Text style={styles.title}>
                        {data.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {data.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            <Image
                                style={{height: 22, width: 22}}
                                source={{uri: data.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Stars:</Text>
                            <Text>{data.stargazers_count}</Text>
                        </View>
                        <TouchableOpacity
                            style={{padding: 5}}
                            onPress={() => {

                            }}
                            underlayColor={'transparent'}
                        >
                            <FontAwesome
                                name={'star-o'}
                                size={26}
                                style={{color: 'red'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
});
