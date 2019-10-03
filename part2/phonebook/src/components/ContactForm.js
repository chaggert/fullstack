import React from "react";

const ContactForm = props => {
  return (
    <div>
      <form onSubmit={props.formSubmitHandler}>
        <div>
          Name: <input value={props.name} onChange={props.nameChangeHandler} />
        </div>
        <div>
          Number:{" "}
          <input value={props.number} onChange={props.numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
