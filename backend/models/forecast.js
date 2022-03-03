const { FLOAT } = require('sequelize');
const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Forecast extends Sequelize.Model {}
    Forecast.init({
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        applicable_date: {
            type: Sequelize.DATE
        },
        min_temp: {
            type: Sequelize.FLOAT
        },
        max_temp: {
            type: Sequelize.FLOAT
        },
        the_temp: {
            type: Sequelize.FLOAT
        },
        wind_speed: {
            type: Sequelize.FLOAT
        },
        air_pressure: {
            type: Sequelize.FLOAT
        },
        humidity: {
            type: Sequelize.FLOAT
        },
        visibility: {
            type: Sequelize.FLOAT
        },
        predictability: {
            type: Sequelize.FLOAT
        },
        location: {
            type: Sequelize.BIGINT
        },
        applicable_date: {
            type: Sequelize.DATE
        },
        created:{
            type:Sequelize.DATE
        }
    }, {
        sequelize,
        modelName: 'forecast'});
    return Forecast
}