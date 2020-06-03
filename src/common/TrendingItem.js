import React from 'react'
import {DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TrendingItem extends React.Component {

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
        if (!data) {
            return null;
        }

        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.rootContainer}>
                    <Text style={styles.title}>
                        {data.fullName}
                    </Text>
                    <Text style={styles.description}>
                        {data.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            {data.contributors.map((result, i, arr) => {
                                return <Image
                                    key={i}
                                    style={{height: 22, width: 22, margin: 2}}
                                    source={{uri: arr[i]}}
                                />
                            })}

                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Stars:</Text>
                            <Text>{data.starCount}</Text>
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
