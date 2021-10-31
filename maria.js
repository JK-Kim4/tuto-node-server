const maria = require('mysql');
const conn = maria.createConnection({
    host:'localhost',
    port:3306,
    user:'KJW',
    password:'1234',
    database:'exp_app_test'
});
module.exports = conn;