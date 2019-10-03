import React, { useState } from "react";
import ReactDOM from "react-dom";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addContact = event => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const contactObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(contactObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleContactChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filter={filter} filterChangeHandler={handleFilterChange} />
      <h2>Add New Contact</h2>
      <ContactForm
        name={newName}
        nameChangeHandler={handleContactChange}
        number={newNumber}
        numberChangeHandler={handleNumberChange}
        formSubmitHandler={addContact}
      />
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={filter} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
