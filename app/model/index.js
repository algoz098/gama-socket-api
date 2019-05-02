require('dotenv-safe').load();
const url = `mongodb://${process.env.DBURL}:${process.env.DBPORT}/${process.env.DBNAME}`;

var mongoose = require('mongoose');

mongoose.connect(
    url,
    { useNewUrlParser: true, autoReconnect: true }
);

module.exports = mongoose;