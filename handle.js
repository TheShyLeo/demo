var knex = require('./sql');

//查询全部用户信息
function findUser(req, res) {
    console.log('findUser方法执行！');
    knex.select().from('user_info').then(function (result) {
        res.json(result);
    }).catch(function (err) {
        console.log(err);
    })
}

//通过id查询用户信息
function findUserById(req, res) {
    console.log('findUserById方法执行！');
    let uid = req.query.uid;
    knex('user_info').where('user_id', uid).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        console.log(err);
    })
}

//增加用户信息
function addUser(req, res) {
    console.log('addUser方法执行！');
    let uname = req.query.uname;
    let upassword = req.query.upassword;
    let uage = req.query.uage;
    let ugender = req.query.ugender;
    knex('user_info').insert({
        user_name: uname,
        user_password: upassword,
        user_age: uage,
        user_gender: ugender
    }).then(function () {
        res.send('添加成功！');
    }).catch(function (err) {
        console.log(err);
    })
}

//通过id删除用户信息
function deleteUserById(req, res) {
    console.log('deleteUserById方法执行！');
    let uid = req.query.uid;
    knex('user_info').where('user_id', uid).del().then(function () {
        res.send('删除成功！');
    }).catch(function (err) {
        console.log(err);
    })
}

//修改用户信息
function updateUser(req, res) {
    console.log('updateUser方法执行！');
    let uname = req.query.uname;
    let upassword = req.query.upassword;
    let uage = req.query.uage;
    let ugender = req.query.ugender;
    let uid = req.query.uid;
    knex('user_info').where('user_id', '=', uid).update({
        user_name: uname,
        user_password: upassword,
        user_age: uage,
        user_gender: ugender
    }).then(function () {
        res.send('删除成功！');
    }).catch(function (err) {
        console.log(err);
    })
}

//登陆方法
function login(req, res) {
    console.log('login方法执行！');
    let uname = req.query.uname;
    let upassword = req.query.upassword;
    knex('user_info').where({user_name: uname, user_password: upassword}).then(function (result) {
        if (result.length > 0) {
            res.send('登录成功');
        } else {
            res.send('登陆失败');
        }
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports = {
    //这里不能在后面加括号 不然会直接调用
    findUser: findUser,
    findUserById: findUserById,
    addUser: addUser,
    deleteUserById: deleteUserById,
    updateUser: updateUser,
    login: login
}