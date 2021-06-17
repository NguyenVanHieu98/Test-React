

exports.name = 'models.bill';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "Bill",
        new mongoose.Schema({
            name: String,
            email: String,
            phone: String,
            hotel: String,
            room: String,
            date: String,
            time: String,
            status: String,
        })
    );
};
