import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const contacts = () =>
    persons.map(person => <p key={person.name}>{person.name}</p>);

  const addContact = event => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const contactObject = {
        name: newName
      };
      setPersons(persons.concat(contactObject));
      setNewName("");
    }
  };

  const handleContactChange = event => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleContactChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contacts()}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
