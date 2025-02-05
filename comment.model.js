const sequelize = require('./sequelize')
const { DataTypes } = require('sequelize')

const Comments = sequelize.define(
    'Comments',
    {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        parentcommentid : {
            type : DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Comments',
                key: 'id'
            }
        },
        image : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        nouse : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        isvideo : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        }
    }
)


module.exports = Comments
