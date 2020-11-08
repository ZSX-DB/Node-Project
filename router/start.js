/**
 * 启动路由
 */
const express=require('express')
const blogRouter=require('./blog-router').blogRouter
const userRouter=require('./user-router').userRouter

let app=express()


app.all('*', (req, res, next) => {

    //设置Access-Control-Allow-Origin属性支持跨域(*表示这个接口所有网站都可以访问，当然可以设置指定网站)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")

    res.setHeader("Access-Control-Allow-Credentials", "true")
    //设置前端发送的header能够跨域，Content-Type,authorization为设置的字段，可继续添加
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,authorization")
    //设置后端发送的header前端可以访问
    res.setHeader("Access-Control-Expose-Headers", "*")

    next()
})



// use可设置父路径 如app.use('/path',*)，通过/path/*访问
app.use(userRouter)
app.use(blogRouter)

app.listen(8080, () => console.log('Now server listen in http://localhost:8080'))
