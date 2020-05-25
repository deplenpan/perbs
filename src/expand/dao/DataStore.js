import AsyncStorage from '@react-native-community/async-storage';

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


    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then(wrapData => {
                    if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                        resolve(wrapData);
                    } else {
                        this.fetchNetWorkData(url)
                            .then(data => {
                                resolve(this._wrapData(data));
                            })
                            .catch(error => reject(error));
                    }
                })
                .catch(error => {
                    this.fetchNetWorkData(url)
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
     * @returns {Promise}
     */
    fetchNetWorkData(url) {
        return new Promise((resolve, reject) => {
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
        });
    }
}
