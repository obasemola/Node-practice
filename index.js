require('dotenv').config();
const express = require('express');
const Person = require('./models/person')
const morgan = require('morgan');
const cors = require('cors');
const { response } = require('express');
const app = express();
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
}

app.use(express.static('build'));
app.use(express.json());


// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :personsInfo'))


const getAll = app.get('/index.html', (request, response) => {

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

  Person.findById(request.params.id).then(person => {
    response.json(person)
  })

});

app.delete('/api/persons/:id', (request, response, next) => {
  // morgan.token('personsInfo', (req, res) => {
  //   return ''
  // })

  Person.findByIdAndRemove(request.params.id)
    .then(result => {response.status(204).end()
  })
    .catch(error => next(error))
})
app.use(errorHandler)


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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,

  }

  console.log(person)

  Person.findOne({name: body.name}).then(result => {
    if(result) {
      console.log(body.name)
      Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
    }
  })

})
app.use(errorHandler)




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
