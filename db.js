var Sequelize = require('sequelize')
var sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  port: 5432
})

sequelize.authenticate().then(
  function() {
    console.log('connected to workoutlog postgres database')
  },
  function(err){
    console.log(err)
  }
)

var User = sequelize.import('./models/user.js')

module.exports=sequelize