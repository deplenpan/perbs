import Types from "../types";
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore'
import {handleData} from '../ActionUtil';

/**
 * 获取趋势数据的异步action
 * @param storeName
 * @param url
 * @param pageSize 每页显示的列表数据，例如pageSize=10，每页显示10条数据
 * @returns {function(...[*]=)}
 */
export function onLoadTrendingData(storeName, url, pageSize) {
    return dispatch => {
        dispatch({
            type: Types.TRENDING_REFRESH,
            storeName: storeName,
        })
        let dataSource = new DataStore();
        // 异步action与数据流
        dataSource.fetchData(url, FLAG_STORAGE.flag_trending)
            .then(data => {
                handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.TRENDING_REFRESH_FAIL,
                    storeName: storeName,
                    error
                })
            })
    }
}

/**
 *
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页显示条数
 * @param dataArray 原始数据
 * @param callback 回调函数，可以通过回调函数来调用页面通信，比如异常信息的展示，没有更多等待
 */
export function onLoadMoreTrendingData(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {
            // 模拟网络请求
            // 已加载完全部数据
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callback === 'function') {
                    callback('no more data')
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more data',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray,
                })
            } else {
                // 本次可载入的最大数据量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName: storeName,
                    pageIndex: pageIndex,
                    projectModes: dataArray.slice(0, max),
                })
            }
        }, 500)
    }
}
