// http://mongoosejs.com/docs/guide.html#toJSON
var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

// Set virtual parameter
PersonSchema.virtual('fullName').get(function(){
  return this.firstName + ' ' + this.lastName;
});

// If not, when "console.log('JSON:', JSON.stringify(person));", we could not see fullname
PersonSchema.set('toJSON', {getters: true, virtual: true});

var Person = mongoose.model('Person', PersonSchema);

var person = new Person({
  firstName: 'Chuan',
  lastName: 'DONG'
});

console.log('user full name: ', person.fullName);

console.log('JSON:', JSON.stringify(person));