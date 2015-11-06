var request = require('superagent');

var Promise = require('es6-promise').Promise;

var http = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            request
            .get(url)
            .end(function (err, res) {
                if (res.ok) {
                    resolve(res.body);
                } else {
                    reject();
                }
            });
        });
    },
    getWithParam: function (url, params) {
        return new Promise(function (resolve, reject) {
            request
            .get(url)
            .query(params)
            .end(function (err, res) {
                if (res.ok) {
                    resolve(res.body);
                } else {
                    reject();
                }
            });
        });
    },
    post: function (url, data) {
        return new Promise(function (resolve, reject) {
            request
            .post(url)
            .send(data)
            .end(function (err, res) {
                if (res.ok) {
                    resolve(res.body);
                } else {
                    reject();
                }
            });
        });
    },
    put: function (url, data) {
        return new Promise(function (resolve, reject) {
            request
            .put(url)
            .send(data)
            .end(function (err, res) {
                if (res.ok) {
                    resolve(res.body);
                } else {
                    reject();
                }
            });
        });
    },
    del: function (url) {
        return new Promise(function (resolve, reject) {
            request
            .del(url)
            .end(function (err, res) {
                if (res.ok) {
                    resolve(res.body);
                } else {
                    reject();
                }
            });
        });
    }

};

module.exports = http;