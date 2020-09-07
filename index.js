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



const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
