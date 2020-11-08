/**
 * 定义博客相关路由
 */

const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('../config/db-orm').sequelize
const {QueryTypes} = require('sequelize')
const Blog = require('../model/all-model').Blog


let router = express.Router(),
    urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/blog', (req, res) => {

    let method

    if (req.query.user_id) {
        //根据用户id输出内容
        method = Blog.findByFilter(null, {
            user_id: req.query.user_id
        })
    } else {
        //输出全部的博客内容
        method = Blog.findTotal()
    }

    method.then(data => {
        res.json(data)
    }).catch(err => {
        console.log('fail ' + err)
        res.send('fail')
    })

})

//根据博客id输出内容
router.get('/blog/:bid', (req, res) => {
    Blog.findByFilter(null, {bid: req.params.bid}).then(data => {
        // console.log('success ' + JSON.stringify(data))
        res.json(data)
    }).catch(err => {
        console.log('fail ' + err)
        res.send('fail')
    })
})


//热榜
router.get('/ranklist', (req, res) => {

    //当Sequelize提供的排序方法无法满足要求，可以使用原生语法
    Sequelize.query('select bid,title,give_like_num,point_tread_num from blog order by (give_like_num*1.5 + point_tread_num*0.5) desc limit 10',
        {
            //不添加type会导致同样的返回数据复制了一份
            type: QueryTypes.SELECT
        })
        .then(data => {
            // console.log('原始查询 ' + JSON.stringify(data))
            res.json(data)
        }).catch(err => {
        console.log('fail ' + err)
        res.send('fail')
    })

})


exports.blogRouter = router