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
        // 下拉刷新成功
        case Types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                // 动态设置store key
                [action.storeName]: {
                    ...[action.storeName],
                    // 原始数据
                    items: action.items,
                    // 此次要展示的数据
                    projectModes: action.projectModes,
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        // 下拉刷新
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            };
        // 下拉刷新失败
        case Types.POPULAR_REFRESH_FAIL:
            return {
                // es7特性延展操作符
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false,
                },
            };
        // 上拉加载更多成功
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    // 是否隐藏底部加载更多
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                }
            }

        // 上拉加载更多失败
        case Types.POPULAR_LOAD_MORE_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                }
            }
        default:
            return state;
    }
}
