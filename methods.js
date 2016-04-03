// Run 'node methods.js' to test
// http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongodemo');

var BookSchema = new mongoose.Schema({
    name: String,
    record: Number
});

// Static method
BookSchema.statics.findByRecord = function(record, callback){
    this.findOne({record: record}, function(err, doc){
        callback(err, doc);
    });
};

// Instance method
BookSchema.methods.print = function(){
    console.log('Book Information:');
    console.log('\tTitle: ', this.name);
    console.log('\tRecord: ', this.record);
};

var Book = mongoose.model('Book', BookSchema);

var book = new Book({
    name: 'NodeJS guide',
    record: 9787100
});

book.save(function(err){
    if(err) {
        return console.log('save book failed', err);
    }

    // Invoke static method
    Book.findByRecord(9787100, function(err, doc){
        console.log('findByRecord, err, doc:', err, doc);
    });

    // Invoke instance method
    book.print();
});