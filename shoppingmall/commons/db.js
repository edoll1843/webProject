var mysql = require('mysql');

module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                connectionLimit: 5,
                host: 'localhost',
                user: 'root',
                database: 'data_base',
                password: 'anjfqhkzz1'
            });
        }
    }
};