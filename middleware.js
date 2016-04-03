// Run 'node middleware.js' to test
// http://mongoosejs.com/docs/middleware.html

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongodemo');

var ResellerSchema = new mongoose.Schema({
    address: String
});

ResellerSchema.pre('save', function(next, done){
    console.log('pre serial save middleware');
    next();
});

// `true` means it is a parallel middleware. We **must** specify `true`
// as the second parameter if we want to use parallel middleware.
ResellerSchema.pre('save', true, function(next, done){
    console.log('pre parallel save middleware');
    // The hooked method 'save', will not be executed until done is called by each middleware (in our case, only one).
    // Then mongoose knows to go next()!
    done();
    next();
});

ResellerSchema.post('save', function(doc, next){
    console.log('post save middleware A ' + doc);
    next();
});

// Will not execute until the first middleware calls `next()`
ResellerSchema.post('save', function(doc, next){
    console.log('post save middleware B ' + doc);
    next();
});

// But this one is not asynchronous, it will be triggered firstly before the above two post!
ResellerSchema.post('save', function(doc){
    console.log('post save middleware no Asynchronous ' + doc);
});


var Reseller = mongoose.model('Reseller', ResellerSchema);

var reseller = new Reseller({
    address: '101st, People Read'
});

reseller.save();