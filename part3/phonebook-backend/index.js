const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

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
  res.json(persons);
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

const generateId = () => {
  const newId = Math.floor(Math.random() * 1000000);
  return newId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error:
        "please make sure you've entered both a name and number for the new person"
    });
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: "person already exists"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
