'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var VehicleLocationSchema = new mongoose.Schema({
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicles" },
    address: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        // type: {type: String, default: "Point"},
        coordinates: {
            type: [Number],
            default: [0, 0],
        }
        // coordinates: Array
    }
});

VehicleLocationSchema.index({ vehicle_id: 1 }, { unique: true });
VehicleLocationSchema.index({ address: '2dsphere' });

module.exports = db.model('Vehicle_Location', VehicleLocationSchema);