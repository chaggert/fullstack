import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Search from "./components/Search";
import personService from "./services/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        alert("Could not retrieve contacts. Please try again.");
      });
  }, []);

  const addOrUpdateContact = event => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      if (persons.filter(person => person.number !== newNumber).length > 0) {
        if (
          window.confirm(
            `${newName} is already added to phonebook. Would you like to change their contact number to ${newNumber}`
          )
        ) {
          const contact = persons.find(p => p.name === newName);
          const changedContact = { ...contact, number: newNumber };
          personService
            .update(contact.id, changedContact)
            .then(returnedPerson => {
              setNotificationMessage(`Note '${newName}' has been updated.`);
              setTimeout(() => {
                setNotificationMessage(null);
              }, 2000);
              setPersons(
                persons.map(p => (p.name !== newName ? p : returnedPerson))
              );
              setNewName("");
              setNewNumber("");
            })
            .catch(error => {
              alert(
                `This contact cannot be updated. It may have been deleted.`
              );
            });
        }
      } else {
        window.alert(`${newName} is already added to phonebook.`);
      }
    } else {
      const contactObject = {
        name: newName,
        number: newNumber
      };
      personService
        .create(contactObject)
        .then(returnedPerson => {
          setNotificationMessage(`${newName} has been added to phonebook.`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
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
    if (window.confirm("Are you sure you wish to remove this contact?")) {
      personService
        .remove(id)
        .then(() => {
          setNotificationMessage(`Contact has been removed.`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          alert(`The contact could not be deleted.`);
        });
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
      {notificationMessage != null ? (
        <Notification message={notificationMessage} />
      ) : null}
      <Search filter={filter} filterChangeHandler={handleFilterChange} />
      <h2>Add New Contact</h2>
      <ContactForm
        name={newName}
        nameChangeHandler={handleContactChange}
        number={newNumber}
        numberChangeHandler={handleNumberChange}
        formSubmitHandler={addOrUpdateContact}
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
