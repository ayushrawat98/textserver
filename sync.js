const sequelize = require('./sequelize')
const comment  = require('./comment.model')

comment.hasMany(comment, {as:'subcomment',foreignKey : 'parentcommentid', onDelete : 'CASCADE'})

sync = async () => { await sequelize.sync({}) }

module.exports = sync