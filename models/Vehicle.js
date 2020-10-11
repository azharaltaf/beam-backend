'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var VehicleSchema = new mongoose.Schema({
    name: String,
    code: String,
    color: String,
    status: String,
    purchase_date: { type: Date, default: Date.now }
});

VehicleSchema.index({ code : 1 }, { unique: true });

module.exports = db.model('Vehicle', VehicleSchema);