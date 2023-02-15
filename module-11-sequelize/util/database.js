const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-learning', 'root', 'Sid@2023', { 
    dialect: 'mysql', 
    host: 'localhost' 
});

module.exports = sequelize;