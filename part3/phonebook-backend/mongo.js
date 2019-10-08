const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "give password as argument, followed optionally by name and number of person to add"
  );
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log("please ensure that name and password have been provided");
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log(
    "please check the number of arguments. If a name contains whitespace please ensure that it is wrapped in quotes"
  );
}

const createPerson = (newName, newNumber) => {
  const person = new Person({
    name: newName,
    number: newNumber
  });

  person.save().then(response => {
    console.log(`added ${newName} number ${newNumber} to phonebook`);
    mongoose.connection.close();
  });
};

const getPeople = () => {
  Person.find({}).then(result => {
    console.log("Phonebook:");
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0-dgqxo.mongodb.net/fullstack-phonebook?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model("Person", personSchema);

// Return all people
if (process.argv.length === 3) {
  getPeople();
}

// Create a new person
if (process.argv.length === 5) {
  const newName = process.argv[3];
  const newNumber = process.argv[4];
  createPerson(newName, newNumber);
}
