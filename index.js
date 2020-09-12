require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.static('build'));

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :personsInfo'))


const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
 });

 const Person = mongoose.model('Person', personSchema)

app.use(cors());
app.use(express.json());



let persons = [
  {
  name: "Arto Hellas",
  number: "040-12364",
  id: 1
  },
  {
  name: "Ada Lovelace",
  number: "39-44-53235",
  id: 2
  },
  {
  name: "Dan Abramov",
  number: "12-43-23434",
  id: 3
  },
  {
  name: "Wiz",
  number: "76",
  id: 4
  },
  {
  name: "Wz",
  number: "68769",
  id: 5
  },
  {
  name: "Ay",
  number: "798",
  id: 6
  },
  {
  name: "A",
  number: "868",
  id: 7
  }
  ]




app.get('/index.html', (request, response) => {

  // morgan.token('personsInfo', (req, res) => {
  //   return '';
  // })

  // response.json(persons)

})
app.get('/api/persons', (request, response) => {

  // morgan.token('personsInfo', (req, res) => {
  //   return '';
  // })

  // response.json(persons)
  Person.find({}).then(persons => {
    response.json(persons)

  })

})

app.get('/info', (request, response) => {
  // morgan.token('personsInfo', (req, res) => {
  //   return ''
  // })
  const date = new Date()
  response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  response.write(`${date}`)
  response.end()

})

app.get('/api/persons/:id', (request, response) => {
  // morgan.token('personsInfo', (req, res) => {
  //   return ''
  // })
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  // morgan.token('personsInfo', (req, res) => {
  //   return ''
  // })
  const id = Number(request.params.id)
  const person = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {

  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
     })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing'
     })
  } else if (persons.findIndex((person) => {
    return body.name === person.name
  }) > -1) {
    return response.status(400).json({ 
      error: 'name must be unique'
     })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000)
  }

  // morgan.token('personsInfo', (req, res) => {
  //   return JSON.stringify(person)
  // })

  persons = persons.concat(person)

  response.json(person)
})








const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
