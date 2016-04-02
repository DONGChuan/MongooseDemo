// Run 'node getter.js' to test

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongodemo")

var UserSchema = new mongoose.Schema({
  blogurl: {
    type: String,
    get: function(url){

      if(!url) return url;

      if(0 !== url.indexOf('http://') && 0 !== url.indexOf("https://"))
        url = 'http://' + url;

      return url;
    }
  }
});

var User = mongoose.model('User', UserSchema);

var user = new User({
  blogurl: 'dongchuan.github.io'
});

user.save(function(err){
  if(err) {
    return console.log('save error:' , err);
  }

  // 'get' will be invoked here to add "http://"
  console.log('blog url: ', user.blogurl);
});