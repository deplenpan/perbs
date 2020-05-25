import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Main Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 28,
    },
});
