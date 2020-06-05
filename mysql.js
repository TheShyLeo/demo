//没有改造前的版本
const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;


var conn = mysql.createConnection({
    //数据库所在的ip
    host: '192.168.0.106',
    user: 'root',
    password: 'root',
    database: 'my_db',
    ssl: {
        rejectUnauthorized: false
    }
});
conn.connect(function (err) {
    if (err) {
        console.error('error connection:' + err.stack);
        return;
    }
    console.log('connection as id ' + conn.threadId);
});

app.listen(port);

app.get('/findUser', (req, res) => {
    let sql = 'select * from user_info';
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.json(result);
        }
    })
})

app.get('/findUserById', (req, res) => {
    let uid = req.query.uid;
    let sql = 'select * from user_info where user_id = ?';
    conn.query(sql, [uid], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.json(result);
        }
    })
})

app.post('/addUser', (req, res) => {
    let uname = req.query.uname;
    let upassword = req.query.upasswrd;
    let ugender = req.query.ugender;
    let uage = req.query.uage;
    let post = {
        user_name: uname,
        user_password: upassword,
        user_gender: ugender,
        user_age: uage
    }
    let sql = 'insert into user_info set ?';
    conn.query(sql, post, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('添加成功!');
        }
    })
})

app.get('/deleteUserById', (req, res) => {
    let uid = req.query.uid;
    let sql = 'delete from user_info where user_id = ?';
    conn.query(sql, [uid], (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('删除成功!');
        }
    })
})

app.post('/updateUser', (req, res) => {
    let uname = req.query.uname;
    let upassword = req.query.upasswrd;
    let ugender = req.query.ugender;
    let uage = req.query.uage;
    let uid = req.query.uid;
    let sql = 'update user_info set user_name = ? , user_password = ? , user_gender = ? , user_age = ? where user_id = ?';
    conn.query(sql, [uname, upassword, ugender, uage, uid], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('修改成功!');
        }
    })
})

app.get('/login', (req, res) => {
    let uname = req.query.uname;
    let upassword = req.query.upassword;
    let sql = 'select * from user_info where user_name = ? and user_password = ?';
    conn.query(sql, [uname, upassword], (err, result) => {
        if (result.length > 0) {
            res.send('登录成功');
        } else {
            res.send('登陆失败');
        }
    })
})
