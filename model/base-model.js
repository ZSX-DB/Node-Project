/**
 * 改造Sequelize实例方法
 */

const sequelize = require('../config/db-orm').sequelize

class BaseModel {
    constructor(tableName, schema) {
        this.model = sequelize.define(tableName, schema,{
            //关闭自动添加timestamp的功能
            timestamps: false,
            //会自动表名推断，如user=>users，通常会导致找不到对应的表，以下可以设置freezeTableName取消
            freezeTableName: true
        })
    }

    getModel() {
        return this.model
    }

    /*********************************查询方法*********************************/

    //不带过滤条件的查询

    findTotal(attributes){
        return attributes ? this.model.findAll({
            attributes: attributes
        }) : this.model.findAll()
    }

    // 一个不宜深入的错误
    // The argument passed to findAll must be an options object,
    // use findByPk if you wish to pass a single p rimary key value

    //函数名必须是findAll
    //传入的必须是对象

    findAll(attributesObj) {
        return attributesObj?this.model.findAll(attributesObj):this.model.findAll
    }

    //带过滤条件的精确查询
    findByFilter(attributes, where) {
        return attributes ? this.model.findAll({
            attributes: attributes,
            where: where
        }) : this.model.findAll({
            where: where
        })
    }

    findByFilterOrder(attributes,order,where){
        let orderOps=[[order,'DESC']]
        return attributes ? this.model.findAll({attributes: attributes, order: orderOps, where: where}) : this.model.findAll({order: orderOps,where: where})
    }

    /*********************************添加方法*********************************/

    //插入单个数据
    create(insertData) {
        return this.model.create(insertData)
    }

    //插入多个数据
    createBatch(insertData) {
        return this.model.bulkCreate(insertData)
    }

    /*********************************更新方法*********************************/

    //更新
    update(updateData, where) {
        return this.model.update(updateData, {
            where: where
        })
    }

    /*********************************删除方法*********************************/

    delete(where) {
        return this.model.destroy({
            where: where
        })
    }

}

exports.BaseModel = BaseModel