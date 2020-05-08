import React from 'react';
import {Button, Text, View} from 'react-native';

// export default function CreatePostScreen({navigation, route}) {
//
//     const [postText, setPostText] = React.useState('');
//
//     return (
//         <View>
//             <TextInput
//                 multiline
//                 placeholder={'please input your keyword'}
//                 style={{ height: 200, padding: 10, backgroundColor: 'white' }}
//                 value={postText}
//                 onChangeText={setPostText}
//             />
//             <Button
//                 title={'Use React Hook to pass params back to Home'}
//                 onPress={() => {
//                     // Pass params back to home screen
//                     navigation.navigate('Home', {
//                         post: postText,
//                     });
//                 }}
//             />
//         </View>
//     );
// }

export default class CreatePostScreen extends React.Component {
    render() {
        // const [postText, setPostText] = React.useState('');
        const {navigation} = this.props;
        return (
            <View>
                <Text style={{fontSize: 16}}>This is Create Post Screen</Text>
                {/*<TextInput*/}
                {/*    multiline*/}
                {/*    placeholder={'please input your keyword'}*/}
                {/*    style={{padding: 10, height: 200, backgroundColor: 'white'}}*/}
                {/*    value={postText}*/}
                {/*    onChangeText={setPostText}*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    title={'Pass params back to Home'}*/}
                {/*    onPress={() => {*/}
                {/*        // Pass params back to home screen*/}
                {/*        navigation.navigate('Home', {*/}
                {/*            postText: 'postText',*/}
                {/*        });*/}
                {/*    }}*/}
                {/*/>*/}
                <Button
                    title={'Go Back'}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            </View>
        );
    }
}
