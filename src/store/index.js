import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

/**
 * 创建中间件
 * @type {(Middleware<ThunkDispatch<{}, undefined, AnyAction>, {}, ThunkDispatch<{}, undefined, AnyAction>> & {withExtraArgument<E>(extraArgument: E): ThunkMiddleware<{}, AnyAction, E>})[]}
 */
const middlewares = [
    thunk,
];

/**
 * 第二步：创建store
 * @type {*}
 */
const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
