import React from 'react';
import Favorite from '../pages/Favorite';
import Trending from '../pages/Trending';
import Popular from '../pages/Popular';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Profile from '../pages/Profile';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const BottomTab = createBottomTabNavigator();

const TopTab = createMaterialTopTabNavigator();

const languages = ['Java', 'Python', 'Php', 'Ios', 'Android', 'Ruby', 'Go', 'Scala', 'Rust', 'C', 'Dart', 'Flutter'];

class TopTabNavigator extends React.Component {

    render() {
        return (
            <TopTab.Navigator
                // screenOptions={{
                //     headerStyle: {
                //         backgroundColor: '#90EE90',
                //         marginTop: 20,
                //     },
                // }}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    tabWidth: 40,
                    scrollEnabled: true,
                    labelStyle: {fontSize: 12},
                    // style: {backgroundColor: 'powderblue'},
                    style: {backgroundColor: 'skyblue'},
                    indicatorStyle: {backgroundColor: 'skyblue', height: 2},
                }}
            >
                <TopTab.Screen name={languages[0]} component={Popular}/>
                <TopTab.Screen name={languages[1]} component={Popular}/>
                <TopTab.Screen name={languages[2]} component={Popular}/>
                <TopTab.Screen name={languages[3]} component={Popular}/>
                <TopTab.Screen name={languages[4]} component={Popular}/>
                <TopTab.Screen name={languages[5]} component={Popular}/>
                <TopTab.Screen name={languages[6]} component={Popular}/>
                <TopTab.Screen name={languages[7]} component={Popular}/>
                <TopTab.Screen name={languages[8]} component={Popular}/>
                <TopTab.Screen name={languages[9]} component={Popular}/>
                <TopTab.Screen name={languages[10]} component={Popular}/>
                <TopTab.Screen name={languages[11]} component={Popular}/>
            </TopTab.Navigator>
        );
    }
}

export default class HomeTabNavigator extends React.Component {
    render() {
        return (
            <BottomTab.Navigator
                screenOptions={({route}) => (
                    {
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            if (route.name === 'Popular') {
                                iconName = 'whatshot';
                                return <MaterialIcons name={iconName} size={size} color={color}/>;

                            } else if (route.name === 'Trending') {
                                iconName = 'trending-up';
                                return <Feather name={iconName} size={size} color={color}/>;

                            } else if (route.name === 'Favorite') {
                                iconName = focused ? 'favorite' : 'favorite-border';
                                return <MaterialIcons name={iconName} size={size} color={color}/>;

                            } else if (route.name === 'Profile') {
                                iconName = focused ? 'user-circle-o' : 'user-circle';
                                return <FontAwesome name={iconName} size={size} color={color}/>;

                            }
                        },
                    }
                )
                }
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <BottomTab.Screen
                    name={'Popular'}
                    component={TopTabNavigator}
                    options={{
                        tabBarLabel: '最热',
                    }}
                />
                <BottomTab.Screen
                    name={'Favorite'}
                    component={Favorite}
                    options={{
                        tabBarLabel: '收藏',
                    }}
                />
                <BottomTab.Screen
                    name={'Trending'}
                    component={Trending}
                    options={{
                        tabBarLabel: '趋势',
                    }}
                />
                <BottomTab.Screen
                    name={'Profile'}
                    component={Profile}
                    options={{
                        tabBarLabel: '我的',
                    }}
                />
            </BottomTab.Navigator>
        );
    }
}

