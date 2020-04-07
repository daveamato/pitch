const mongoose = require('mongoose');
const auth = require("../auth.json");

mongoose.connect(
    'mongodb://' + auth.db.ipaddr + ':' + auth.db.port + '/pitch',
    { user: auth.db.user, pass: auth.db.pass }
);
/*
this connection should be available to all other
modules that require('mongoose'), because *magic*
*/

process.on('SIGINT', function() {
  console.log('Severing MongoDB connection...');
  mongoose.connection.close(function () {
    console.log('Disconnected from MongoDB');
    process.exit(0);
  });
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
}); 