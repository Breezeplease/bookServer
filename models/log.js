//build a model in sequelize
module.exports = function(sequelize, DataTypes){
  return sequelize.define('log', {
    description: DataTypes.STRING,
    novel: DataTypes.STRING,
    author: DataTypes.STRING,
    url: DataTypes.STRING,
    review: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    def: DataTypes.STRING
  }, {

  })
}