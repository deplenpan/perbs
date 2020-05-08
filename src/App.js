import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import City from './pages/City';
import Home from './pages/Home';
import React from 'react';
import Details from './pages/Details';
import CreatePostScreen from './pages/CreatePostScreen';

// const Stack = createStackNavigator({
//     Home: {
//         screen: Home,
//         navigationOptions: {
//             title: 'Home',
//             headerShown: false,
//         },
//     },
//     City: {
//         screen: City,
//         navigationOptions: {
//             title: 'City',
//             headerShown: false,
//         },
//     },
// });

const Stack = createStackNavigator();

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'Home'} component={Home}/>
                    <Stack.Screen name={'City'} component={City}/>
                    <Stack.Screen name={'Details'} component={Details} initialParams={{cityId: 28}}/>
                    <Stack.Screen name={'CreatePostScreen'} component={CreatePostScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
