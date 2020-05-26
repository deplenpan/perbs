import Types from '../../action/types';

const defaultState = {};

/**
 * state树
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading:false
 *     },
 *     ios:{
 *         items:[],
 *         isLoading:false
 *     }
 * }
 *
 *
 * state树：横向扩展
 * 难点：如何动态设置store和动态获取store（store key不固定）
 * 数据从action流转到reducer
 * @param state
 * @param action
 */
export default function popular(state = defaultState, action) {
    // 判断action类型
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                // 动态设置store key
                [action.storeName]: {
                    ...[action.storeName],
                    items: action.items,
                    isLoading: false,
                },
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: true,
                },
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false,
                },
            };
        default:
            return state;
    }
}
