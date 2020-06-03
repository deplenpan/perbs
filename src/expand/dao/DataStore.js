import AsyncStorage from '@react-native-community/async-storage';
import Trending from 'GitHubTrending';

// auth-token定期更新，当前可用auth-token：fd82d1e882462e23b8e88aa82198f166
const AUTH_TOKEN = 'fd82d1e882462e23b8e88aa82198f166';
export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'}
export default class DataStore {
    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //       data: '',
    //     };
    //   }

    state = {
        data: '',
    };

    /**
     * 保存数据
     */
    storeData = async (url, data, callback) => {
        try {
            if (!data || !url) {
                return;
            }
            await AsyncStorage.setItem(
                url,
                JSON.stringify(this._wrapData(data)),
                callback,
            );
        } catch (e) {
            console.log(e.toString());
        }
    };

    async fetchDataAsync(url) {
        try {
            let response = await fetch(url);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }


    /**
     * 获取数据，优先获取本地数据，如果无本地数据或者本地数据过期，则获取网络数据
     * @param url
     * @param flag 数据标志
     * @returns {Promise<R>}
     */
    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then(wrapData => {
                    if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                        resolve(wrapData);
                    } else {
                        this.fetchNetWorkData(url, flag)
                            .then(data => {
                                resolve(this._wrapData(data));
                            })
                            .catch(error => reject(error));
                    }
                })
                .catch(error => {
                    this.fetchNetWorkData(url, flag)
                        .then(data => resolve(this._wrapData(data)))
                        .catch(() => {
                            reject(error);
                            console.log(error);
                        });
                });
        });
    }

    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 检查timestamp是否在有效期内
     * @param {*} timestamp timestamp
     * @returns {boolean} true 不需要更新，false：需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false;
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            return false;
        }
        if (currentDate.getHours() - targetDate.getHours() > 4) {
            return false;
        }
        return true;
    }

    /**
     * 获取本地数据
     * @param {*} url url
     * @returns {Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error();
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            });
        });
    }

    /**
     * 获取网络数据
     * @param {*} url url
     * @param {*} flag 数据标志
     * @returns {Promise}
     */
    fetchNetWorkData(url, flag) {
        return new Promise((resolve, reject) => {
            if (flag !== FLAG_STORAGE.flag_trending) {
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok');
                    })
                    .then(responseData => {
                        this.storeData(url, responseData);
                        resolve(responseData);
                    })
                    .catch(error => reject(error));
            } else {
                new Trending(AUTH_TOKEN).fetchTrending(url)
                    .then(items => {
                        if (!items) {
                            throw new Error('response is null');
                        }
                        this.storeData(url, items);
                        resolve(items)
                    })
                    .catch(
                        error => {
                            reject(error);
                        }
                    )
            }
        });
    }
}
