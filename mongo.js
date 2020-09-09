const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://obasemola:${password}@cluster0.niwk1.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
 });

 const Person = mongoose.model('Person', personSchema)

 if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

 const person = new Person()
 person.name = process.argv[3]
 person.number = process.argv[4]

 person.save().then(result => {
   console.log(`added ${person.name} number ${person.number} to phonebook`)
   mongoose.connection.close()
 })