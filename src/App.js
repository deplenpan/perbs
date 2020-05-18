import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import AppNavigationContainer from './navigators/DynamicNavigator';

export default class App extends React.Component {

    render() {
        /**
         * 第三步：将store传递给App框架
         */
        return (
            <Provider store={store}>
                <AppNavigationContainer/>
            </Provider>
        );
    }
}
