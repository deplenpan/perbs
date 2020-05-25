import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
// import DynamicNavigator from '../navigators/DynamicNavigator'
//
// const navigationReducer = (state = navigationState, action) => {
//     const nextState = DynamicNavigator.router.getStateForAction();
//     return nextState || state;
// }


/**
 * 3.合并reducer
 * @type {Reducer<CombinedState<{}>>}
 */
const rootReducers = combineReducers({
    theme: theme,
    popular: popular
});

export default rootReducers;

/**
 * 下述写法等价于combineReducers的写法
 * @param state
 * @param action
 * @returns {{theme: {theme: string}, popular: {}}}
 */
// export default function rootReducers(state = {}, action) {
//     return {
//         theme: theme(state.theme, action),
//         popular: popular(state.popular, action)
//     }
// }
