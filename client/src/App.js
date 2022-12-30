import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import Notification from './components/Notification.js'
import personService from './services/persons.js'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null) // object with values of text and type (error/success), type specifies the classname for css

  const handleNameChange = (e) => { setNewName(e.target.value) }
  const handleNumberChange = (e) => { setNewNumber(e.target.value) }
  const handleFilterChange = (e) => { setFilter(e.target.value) }

  const showMessage = (text, type) => {
    // set message data
    setMessage({ text, type })
    // hide message after 4s
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const addName = (e) => {

    e.preventDefault()
    const personData = {name: newName, number: newNumber}

    // Check if the name has already been added
    if((persons.map((e) => e.name)).includes(newName)) {

      const userWantsToReplace = window.confirm(`${newName} has already been added. Do you want replace the previous entry?`)
      
      if (userWantsToReplace) {
        // Reusing the personsToShow here since it provides the functionality we need
        const idOfPersonToBeUpdated = personsToShow(newName)[0].id
        personService
          .update(idOfPersonToBeUpdated, personData)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== idOfPersonToBeUpdated ? person : updatedPerson))
            showMessage(`${personData.name}'s number was updated.`, 'success')
          })
          .catch(error => {
            const msg = `${error.response.data.error}`
            console.log(error)
            showMessage(msg, 'error')
          })
      }
    } else {
      // Add the new person to the db
      personService
        .create(personData)
        .then(response => {
          setPersons(persons.concat(response))
          showMessage(`${personData.name} was added.`, 'success')
        })
        .catch(error => {
          showMessage(`${error.response.data.error}`, 'error')
          console.log(error.response.data)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const removeName = (person) => {
    const confirmed = window.confirm(`Are sure you wish to remove ${person.name}`)
    if (confirmed) {
      personService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        showMessage(`${person.name} was removed.`, 'success')
      })
    }
  }

  const personsToShow = (filterString) =>
    persons.filter(
      (p) => p.name.toLowerCase().includes(filterString.toLowerCase())
    )
    
  useEffect(() => {
    // Retrieve data from db
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        value={filter}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add a new person</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow(filter)}
        removeName={removeName}
      />
    </div>
  )

}

export default App