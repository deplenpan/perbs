import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';


// export default function Home({navigation, route}) {
//     React.useEffect(() => {
//         if (route.params.post) {
//             // Post updated, do something with `route.params.post`
//             // For example, send the post to the server
//             alert('Data updates success!');
//         }
//     }, [route.params.post]);
//
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button
//                 title="Create post"
//                 onPress={() => navigation.navigate('CreatePost')}
//             />
//             <Text style={{ margin: 10 }}>Post: {route.params.post}</Text>
//         </View>
//     );
//
// }

export default class Home extends React.Component {
    render() {
        // react hook use
        // const {params} = this.props.route;
        // React.useEffect(() => {
        //     if (this.props.route.params.postText) {
        //         // Post updated, do something with `route.params.post`
        //         // For example, send the post to the server
        //         alert('Data updates success!');
        //     }
        // }, [this.props.route.params.postText]);
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 16}}>This is Home Page</Text>
                <Button
                    title={'Go To City Screen'}
                    onPress={() => {
                        navigation.navigate('City');
                    }}
                />
                <Text style={{fontSize: 16}}>Pass params to Details of City</Text>
                <Button
                    title={'Pass params to Details of City'}
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('Details', {
                            // cityId: 86,
                            cityName: 'shanghai',
                            cityCode: 21,
                        });
                    }}
                />
                <Button
                    title={'Go to Create Post Screen'}
                    onPress={() => {
                        navigation.navigate('CreatePostScreen');
                    }}
                />
                {/*<Text style={{margin: 10}}>PostText: {params.postText}</Text>*/}
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

