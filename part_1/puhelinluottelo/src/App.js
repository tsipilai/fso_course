import React, { useState, useEffect } from 'react'
import numberService from '../src/services/numbers'
import "./index.css"

const Filter = ({newFilter, handleChangeFilter}) => {
  return (
    <div>
      Name: <input value={newFilter} onChange={handleChangeFilter} />
    </div>
  )
}

const Form = ( { addName, newName, handleChange, newNumber, handleChangeNumber } ) => {
  return (
    <div>
      <form onSubmit={addName} >
        <div>
          Name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({rows}) => {
  return ( 
    <div>
      {rows}
    </div>
  )
}

const DeleteButton = ({deleteNumber, personId}) => {
  return ( 
    <button onClick={deleteNumber} value={personId}>
      Delete
    </button>
  )
}

const Notification = ({message}) => {
  if(message === null) {
    return null
  }
  return (
    <h1 className="notification">
      {message}
    </h1>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newMessage, setNewMessage ] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    const singlePerson = persons.filter(person => (person.name === newName))

    if (singlePerson[0]) {
      window.confirm(`${newName} Löytyy jo, päivitetäänkö numero?`) &&
      numberService
        .update(singlePerson[0].id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== singlePerson[0].id ? person : returnedPerson ))
          setNewMessage(`${returnedPerson.name}'s number was updated from ${singlePerson[0].number} to ${returnedPerson.number}`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
    } else {
      numberService
        .create(personObject)
        .then(addPerson => {
          setPersons(persons.concat(addPerson))
          setNewMessage(`${personObject.name} was added`)
          setTimeout(() => {
            setNewMessage(null)
          }, 2000)
        })
    }
    setNewName('')
  }

  const deleteNumber = (event) => {
    window.confirm("Are you sure you want to delete?") &&
      numberService
       .deleteSingle(event.target.value) 
       .then(deletedPerson => {
          let deletedPersonObj = persons.find(person => person.id === parseInt(deletedPerson))
          setPersons(persons.filter(person => person.id !== parseInt(deletedPerson)))
          setNewMessage(`${deletedPersonObj.name} was removed`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
       })
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  } 

  useEffect( () => {
    numberService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])
  const rows = persons.filter((person) => person.name.toUpperCase().includes(newFilter.toUpperCase())).map((person, key) => 
    <p key={key} className="person-row">{person.name} {person.number} <DeleteButton deleteNumber={deleteNumber} personId={person.id}/></p>
  )

  return (
    <div>
      <h2>Filter</h2>
      <div>
        <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
      </div>
      <h2>Add new</h2>
      <Form addName={addName} newName={newName} handleChange={handleChange} newNumber={newNumber} handleChangeNumber={handleChangeNumber} /> 
      <h2>Numbers</h2>
      <Notification message={newMessage} />
      <Persons rows={rows} />
    </div>
  )

}

export default App