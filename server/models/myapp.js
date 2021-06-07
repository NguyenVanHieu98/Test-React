'use strict';

exports.name = 'models.myapp';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "MyApp",
        new mongoose.Schema({
            name: String,
            district: String,
            place: String,
            comment: Array,
            convenient: Array,
            img: Array,
            review: Array,
            roomtype: Array,
        })
    );
};
