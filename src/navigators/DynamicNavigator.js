import HomeTabNavigator from './HomeTabNavigator';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const RootStack = createStackNavigator();

const AppNavigationContainer = () => (
    <NavigationContainer
        onStateChange={(state) => console.log('New State is ', state)}
    >
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen name={'Home'} component={HomeTabNavigator}/>
        </RootStack.Navigator>
    </NavigationContainer>
);

export default AppNavigationContainer;
