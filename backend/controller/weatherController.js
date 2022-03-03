const axios = require('axios')
const models = require('../models')
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const forecast = require('../models/forecast');
const { Forecast } = require('../models');


exports.pullNew = async (request,response,next) => {
    // London, Berlin, Madrid
    let allowed_locations = [44418, 638242, 766273]
    for (var location of allowed_locations) {
        let response_data
        let date = new Date()
        for (var i = 1; i<=7; i++){
            await axios
                .get('https://www.metaweather.com/api/location/'+ location + '/' + date.getFullYear() + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCDate())
                .then(res => {
                    console.log(`statusCode: ${res.status}`)
                    response_data = res.data
                })
                .catch(error => {
                    console.error(error)
                })
            for (var forecast of response_data){
                existing = await models.Forecast.findOne({where:{id: forecast.id}})
                if (existing == null){
                    forecast.location = location
                    await models.Forecast.create(forecast)
                }
            }
            date.setDate(date.getDate() + 1);
        }
    }
    return response.status(200).json('OK')
}

exports.getAvgTemp = async(request,response,next) => {
    let allowed_locations = [44418, 638242, 766273]
    let response_data = {}
    for (var location of allowed_locations) {
        let date = new Date()
        date.setUTCHours(0,0,0,0);
        let nextDay = new Date()
        nextDay.setUTCHours(23,59,59,999);
        response_data[location] = {}
        for (var i = 1; i<=7; i++){
            let forecasts_in_range = await models.Forecast.findAll({where:{location:location, applicable_date: {[Op.not]: nextDay},
                                                                    applicable_date:{[Op.between]: [date, nextDay]}},
                                                                    limit: 3,
                                                                    order: [['created', 'DESC']]})
            var tempSum = 0
            var returned_forecast_amount = 0
            for (var forecast of forecasts_in_range) {
                tempSum += forecast.the_temp
                returned_forecast_amount += 1
            }
            if (returned_forecast_amount > 0){
                var avgTemp = tempSum / returned_forecast_amount
            }
            let details = {'avgTemp':avgTemp, forecasts: forecasts_in_range}
            response_data[location][date] = details
            date.setDate(date.getDate() + 1);
            nextDay.setDate(nextDay.getDate() + 1);
        }
    }
    return response.status(200).json(response_data)
}

exports.getLatest = async(request,response,next) => {
    let allowed_locations = [44418, 638242, 766273]
    let response_data = {}
    for (var location of allowed_locations) {
        let date = new Date()
        date.setUTCHours(0,0,0,0);
        let nextDay = new Date()
        nextDay.setUTCHours(23,59,59,999);
        response_data[location] = {}
        for (var i = 1; i<=7; i++){
            let latest_forecast = await models.Forecast.findAll({where:{location:location,
                                                                    applicable_date:{[Op.between]: [date, nextDay]}},
                                                                    limit: 1,
                                                                    order: [['created', 'DESC']]})
            response_data[location][date] = latest_forecast
            date.setDate(date.getDate() + 1);
            nextDay.setDate(nextDay.getDate() + 1);
        }
    }
    return response.status(200).json(response_data)
}

// exports.getNTop = async(request,response,next) => {}
// Not enough time to finish this function but what I would do
// is hardcode an array of the db columns that are relevant [max_temp,min_temp etc]
// and then for each property query to return the DISTINCT based on location values ordered descending 
// based on the property in the hardocded array. The value request.params.n would be passed on the limit
// section of the query