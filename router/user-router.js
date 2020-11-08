/**
 * 定义用户相关路由
 */

const express = require('express')
const bodyParser = require('body-parser')
const qs = require('qs')
const jwt = require('jsonwebtoken')

const Users = require('../model/all-model').Users

let router = express.Router(),
    urlencodedParser = bodyParser.urlencoded({extended: false}),
    cert = 'Mars Owl System'    // token密钥

router.post('/form', urlencodedParser, (req, res) => {

    // qs对前端传回来的数据进行处理
    let ruleForm = qs.parse(req.body).ruleForm
    console.log('ruleForm的值为', ruleForm)

    if (ruleForm.formAction === 'register') {

        // 账号注册
        Users.create({
            name: ruleForm.name, password: ruleForm.pass
        }).then(u => {
            console.log('用户注册数据 ' + JSON.stringify(u))

            // 注册成功，通过查询获取到uid生成token
            Users.findByFilter(null, {
                name: ruleForm.name,
                password: ruleForm.pass
            }).then(u => {

                let newU = JSON.parse(JSON.stringify(u))[0]
                console.log('注册后重新查询返回的结果 ' + newU.uid, newU.name)

                let payload = {
                    id: newU.uid,
                    name: newU.name
                }

                // 创建token，expiresIn代表token存在的时间
                let token = jwt.sign(payload, cert, {expiresIn: '36h'})

                res.setHeader('Authorization', token)
                res.send('Register Success!!!')

            }).catch(err => console.error(err))

        }).catch(err => console.error(err))


    } else {

        // 账号登录
        Users.findByFilter(null, {
            name: ruleForm.name,
            password: ruleForm.pass
        }).then(u => {

            //通过判断长度，长度为0说明无返回值，即登录失败，账号错误，反之同理
            if (u.length === 0) {

                console.log('该账号密码错误 ', ruleForm.name, ruleForm.pass)
                res.send('账号或密码错误，请重新登录 ')

            }else {

                console.log('账号密码正确，登录成功 ')
                let newU = JSON.parse(JSON.stringify(u))[0]

                let token = jwt.sign({
                    id: newU.uid,
                    name: newU.name
                }, cert, {expiresIn: '36h'})

                res.setHeader('Authorization', token)
                res.send('Login Success!!!')

            }

        }).catch(err => console.error(err))

    }

})

exports.userRouter=router