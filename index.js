const express = require('express');
const app = express()

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


app.get('/api/persons', (request, response) => {
  response.json(persons)

})

app.get('/info', (request, response) => {
  const date = new Date()
  response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  response.write(`${date}`)
  response.end()

})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter(person => person.id !== id)

  response.status(204).end()
})





const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
