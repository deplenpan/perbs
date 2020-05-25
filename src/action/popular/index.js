import Types from '../types';
import DataStore from '../../expand/dao/DataStore'


/**
 *
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页显示条数
 * @param dataArray 原始数据
 * @param callback 回调函数，可以通过回调函数来调用页面通信，比如异常信息的展示，没有更多等待
 */
function onLoadMorePopularData(storeName, pageIndex, pageSize, dataArray = [], callback) {

}

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @returns {function(...[*]=)}
 */
export function onLoadPopularData(storeName, url) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName,
        })
        let dataSource = new DataStore();
        // 异步action与数据流
        dataSource.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data)
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.LOAD_POPULAR_FAIL,
                    storeName: storeName,
                    error
                })
            })
    }
}


function handleData(dispatch, storeName, data) {
    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        items: data && data.data && data.data.items,
        storeName,
    })
}
