import React from "react";

const Contacts = props => {
  const contacts = contactFilter =>
    props.persons
      .filter(person => person.name.includes(contactFilter))
      .map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ));

  return <div>{contacts(props.filter)}</div>;
};

export default Contacts;
