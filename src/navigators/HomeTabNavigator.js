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

const languages = ['Java', 'Node', 'Javascript', 'Typescript', 'Python', 'Linux', 'Ruby', 'Go',
    'Scala', 'Php', 'Ios', 'Android', 'React-Native', 'Flutter'];


const topics = ['All', 'Java', 'Python', 'Go', 'Ruby', 'C++', 'Dart', 'Javascript', 'Typescript'];

export class PopularTopTabNavigator extends React.Component {

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
                    tabWidth: 30,
                    scrollEnabled: true,
                    labelStyle: {fontSize: 12},
                    // style: {backgroundColor: 'powderblue'},
                    style: {backgroundColor: 'skyblue'},
                    indicatorStyle: {backgroundColor: 'tomato', height: 2},
                }}
            >
                {languages.map((item, index) => {
                    return <TopTab.Screen key={index} name={item} component={Popular}/>
                })}
            </TopTab.Navigator>
        );
    }
}

export class TrendingTopTabNavigator extends React.Component {
    render() {
        return (
            <TopTab.Navigator
                tabBarOptions={{
                    activeTintColor: 'orange',
                    inactiveTintColor: 'gray',
                    tabWidth: 30,
                    scrollEnabled: true,
                    labelStyle: {fontSize: 12},
                    // style: {backgroundColor: 'powderblue'},
                    style: {backgroundColor: 'skyblue'},
                    indicatorStyle: {backgroundColor: 'orange', height: 2},
                }}
            >
                {topics.map((item, index) => {
                    return <TopTab.Screen key={index} name={item} component={Trending}/>
                })}
            </TopTab.Navigator>
        )
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
                    component={PopularTopTabNavigator}
                    options={{
                        tabBarLabel: '最热',
                    }}
                />
                <BottomTab.Screen
                    name={'Trending'}
                    component={TrendingTopTabNavigator}
                    options={{
                        tabBarLabel: '趋势',
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

