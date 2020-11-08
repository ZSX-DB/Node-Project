/**
 * sequelize实例
 */

const Sequelize = require('sequelize')

//数据库配置
let config = {
    host: 'localhost',
    user: 'root',
    password: '123456Abc',
    port: '3306',
    // database: 'node_project'
    database: 'graduation_design'
}

//创建实例
let sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    }
})

sequelize.authenticate().then(() => {
    console.log('数据库连接成功...')
}).catch(err => {
    console.error('数据库连接失败...', err)
})


exports.sequelize = sequelize