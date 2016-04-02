var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongodemo');

var OrderSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true, // It means number must be set
        max: 1000,
        min: 10
  },
  status: {
        type: String,
        enum: ['created', 'sucess', 'failed'] // Status must be choosen from enum
  },
  desc: {
        type: String,
        match: /book/g, // Must contain 'book'
        // Define customized validator
        validate: function(desc) {
            return desc.length >= 10;
        }
  }
});

var Order = mongoose.model('Order', OrderSchema);

var order = new Order();
order.count = 10;
order.status = 'created';
order.desc = 'this is a great book';

order.save(function(err){

    if(err) {
        return console.log('save failed:', err);
    }

    console.log('save success');
});