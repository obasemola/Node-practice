require('dotenv').config();
const express = require('express');
const Person = require('./models/person')
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.static('build'));

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :personsInfo'))


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

  console.log(request.body);
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
     })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing'
     })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  // morgan.token('personsInfo', (req, res) => {
  //   return JSON.stringify(person)
  // })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})








const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
