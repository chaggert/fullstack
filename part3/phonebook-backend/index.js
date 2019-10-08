require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const Person = require("./models/person");
const app = express();

app.use(bodyParser.json());
morgan.token("requestBodyContent", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(function(tokens, req, res) {
    console.log();
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.requestBodyContent(req, res)
    ].join(" ");
  })
);
app.use(cors());
app.use(express.static("build"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get("/info", (req, res) => {
  const numPersons = persons.length;
  const info = {
    message: "Phonebook has info for " + numPersons + " people",
    timestamp: new Date()
  };
  res.send(`<p>${info.message}</p><p>${info.timestamp}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error:
        "please make sure you've entered both a name and number for the new person"
    });
  } else if (Person.find({ name: body.name }).length) {
    return response.status(400).json({
      error: "person already exists"
    });
  }
  console.log(body.name);
  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
