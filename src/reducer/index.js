import {combineReducers} from 'redux';
import theme from './theme';

/**
 * 第一步：合并reducer
 * @type {Reducer<CombinedState<{}>>}
 */
const index = combineReducers({
    theme: theme,
});

export default index;
