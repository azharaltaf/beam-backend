const VehicleLocation = require('../models/VehicleLocation')
let mongoose = require('mongoose');

module.exports = {
  async search(searchDto) {
    let pipeline = []
    // add the geolocation query parameters to fetch all the vehicles between long and lat within the radius
    pipeline.push({
      '$geoNear': {
        'near': {
          'type': 'Point',
          'coordinates': [
            Number(searchDto.long), Number(searchDto.lat)
          ]
        },
        'distanceField': 'distance',
        'spherical': true,
        'maxDistance': Number(searchDto.radius)
      }
    })

    if (searchDto.numBikes) {
      pipeline.push({
        '$limit': Number(searchDto.numBikes)
      })
    }

    // we do not need all the parameters from the documents, fetch only those required.
    pipeline.push({
      '$project': {
        'vehicleId': '$vehicle_id',
        'coordinates': '$address.coordinates',
        'distance': '$distance'
      }
    }, { // does a join between the location and vehicle table to get the vehicle details
      '$lookup': {
        'from': 'vehicles',
        'localField': 'vehicleId',
        'foreignField': '_id',
        'as': 'vehicles'
      }
    }, { // select fields required only.
      '$project': {
        'vehicleId': '$vehicleId',
        'vehicle': {
          '$arrayElemAt': [
            '$vehicles', 0
          ]
        },
        'coordinates': '$coordinates',
        'distance': '$distance'
      }
    }, { // further projection of fields.
      '$project': {
        'vehicleId': '$vehicleId',
        'vehicleCode': '$vehicle.code',
        'vehicleName': '$vehicle.name',
        'coordinates': '$coordinates',
        'distance': '$distance'
      }
    })
    return await VehicleLocation.aggregate(pipeline).allowDiskUse(true)
  },
}