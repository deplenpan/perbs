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
export function onLoadMorePopularData(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {
            // 模拟网络请求
            // 已加载完全部数据
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callback === 'function') {
                    callback('no more data')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more data',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray,
                })
            } else {
                // 本次可载入的最大数据量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName: storeName,
                    pageIndex: pageIndex,
                    projectModes: dataArray.slice(0, max),
                })
            }
        }, 500)
    }
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
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName: storeName,
                    error
                })
            })
    }
}


function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items: fixItems,
        // 第一次要加载的数据
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        // items: data && data.data && data.data.items,
        storeName: storeName,
        pageIndex: 1,
    })
}