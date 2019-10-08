const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  number: {
    type: String,
    unique: true,
    required: true
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
personSchema.plugin(uniqueValidator, {
  message: "Error, both name and number must be unque"
});

module.exports = mongoose.model("Person", personSchema);
