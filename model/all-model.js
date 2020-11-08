/**
 * 统一模型定义
 */

const Sequelize=require('sequelize')
const BaseModel=require('./base-model').BaseModel

let Users=new BaseModel('users',{
    uid:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:Sequelize.STRING(7),
    password:Sequelize.STRING(13),
    ask_money:Sequelize.FLOAT(5,2),
    balance:Sequelize.INTEGER
})

let Quiz=new BaseModel('quiz',{
    qid:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    ask_id:Sequelize.INTEGER,
    asked_id:Sequelize.INTEGER,
    questioner:Sequelize.STRING(7),
    author:Sequelize.STRING(7),
    question:Sequelize.STRING(180),
    answer:Sequelize.TEXT,
    willing_answer:Sequelize.BOOLEAN,
    reason:Sequelize.STRING(120),
    whether_check:Sequelize.BOOLEAN
})

let Blog=new BaseModel('blog',{
    bid:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    user_id:Sequelize.INTEGER,
    title:Sequelize.STRING(32),
    essay:Sequelize.TEXT,
    author:Sequelize.STRING(7),
    give_like_num:Sequelize.INTEGER,
    point_tread_num:Sequelize.INTEGER,
    create_time:Sequelize.DATE
})


module.exports={
    Users,
    Quiz,
    Blog
}



