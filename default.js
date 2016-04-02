// Run 'node default.js' to test

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongodemo");

var UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        default: 'dchuan'
    },
    regTime: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', UserSchema);

var user = new User();

console.log('user: ', user);
//user:  { nickname: 'dchuan',
//    regTime: Sat Apr 02 2016 17:14:57 GMT+0200 (Romance Daylight Time),
//    _id: 56ffe1f11c6628a4037ea514 }