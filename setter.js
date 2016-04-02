// Run 'node setter.js' to test
// http://mongoosejs.com/docs/2.7.x/docs/getters-setters.html

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongodemo");

var UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        trim: true  // Delete spaces at the begining and in the end
    },
    blogurl: {
        type: String,
        set: function(url) {

            if(!url) return url;

            if(0 !== url.indexOf('http://') && 0 !== url.indexOf('https://'))
                url = 'http://' + url;

            return url;
        }
    }
});

var User = mongoose.model('User', UserSchema);

var user = new User({
    nickname: "     dchuan         ",
    blogurl: "dongchuan.github.io"
});

console.log('user: ', user);
