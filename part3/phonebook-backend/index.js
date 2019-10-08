require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const Person = require("./models/person");
const app = express();

app.use(express.static("build"));
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()));
    })
    .catch(error => next(error));
});

app.get("/api/info", (req, res, next) => {
  Person.count({})
    .then(response => {
      res.send(
        `<p>Phonebook has info for ${response} contacts</p><p>${new Date()}</p>`
      );
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person.toJSON());
    })
    .catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
