const mongoose = require('mongoose')

// Terminate program if there was no password given
if (process.argv.length < 3) {
  console.log('a password, name and number are required')
  process.exit(1)
}

// Connecting to the database
const password = process.argv[2]
const url = `mongodb+srv://fso_puhelinluettelo:${password}@cluster0.shfblu1.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)

// Declare mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

// if data was given => store it in the database
if (process.argv.length >= 5) {

  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
  })

  contact.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // if no data was given then get the database contents and print them
  Contact
    .find({})
    .then(result => {
      console.log('phonebook')
      result.forEach(contact => {
        console.log(`${contact.name} ${contact.number}`)
      })
      mongoose.connection.close()
    })

}
