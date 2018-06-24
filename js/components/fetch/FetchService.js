class FetchService {

    static getData(url, callback) {
        fetch(url)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            })
            .then(obj => {
                if (typeof callback == 'function') {
                    callback(obj);
                }
            })
            .catch(err => console.log(err));
    }

    static sendData(url, data) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            })
            .catch(err => console.log(err));
    }

    static deleteData(url) {
        fetch(url, {
            method: 'DELETE',
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            })
            .catch(err => console.log(err));
    }

    static changeData(url, data) {
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            })
            .catch(err => console.log(err));
    }
}

module.exports = FetchService;