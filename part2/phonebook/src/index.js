import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Search from "./components/Search";
import personService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        alert("Could not retrieve contacts. Please try again.");
      });
  }, []);

  const addContact = event => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const contactObject = {
        name: newName,
        number: newNumber
      };
      personService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          alert(
            `${newName} could not be added. Maybe because they already exist`
          );
        });
    }
  };

  const removeContact = id => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert(`The contact could not be deleted.`);
      });
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
      <Contacts
        persons={persons}
        filter={filter}
        contactDeleteHandler={removeContact}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
