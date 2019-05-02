var seeder = require('mongoose-seed');
require('dotenv-safe').load();
const url = `mongodb://${process.env.DBURL}:${process.env.DBPORT}/${process.env.DBNAME}`;

var user = require('./user.js');
var environment = require('./environment.js');

// Connect to MongoDB via Mongoose
seeder.connect(url, function () {

    // Load Mongoose models
    seeder.loadModels([
        'app/model/user.js',
        'app/model/environment.js',
    ]);

    // Clear specified collections
    seeder.clearModels(['user', 'environment'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });

    });
});

// Data array containing seed data - documents organized by Model
var data = [
    user, environment
];