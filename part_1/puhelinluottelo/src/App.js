import React, { useState } from 'react'

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
          Numver: <input value={newNumber} onChange={handleChangeNumber} />
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} Löytyy jo`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
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

  const rows = persons.filter((person) => person.name.toUpperCase().includes(newFilter.toUpperCase())).map((person, key) => 
    <p key={key}>{person.name} {person.number}</p>
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
      <Persons rows={rows} />
    </div>
  )

}

export default App