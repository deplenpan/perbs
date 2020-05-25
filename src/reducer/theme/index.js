import Types from '../../action/types';

/**
 * 创建reducer
 * @type {{theme: string}}
 */
const defaultState = {
    theme: 'orange',
};

/**
 * reducer根据当前的action修改当前的state,返回新的state
 * @param state
 * @returns {{theme: string}}
 */
export default function theme(state = defaultState, action) {

    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme,
            };
        default:
            return state;
    }

}
