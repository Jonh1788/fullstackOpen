import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/phones'

const Person = ({persons, setPersons, setPersonsToShow}) => {
  
  const apagar = (id, name) => {
    const resultado = window.confirm(`delete ${name}`)

    if(resultado){
      const novaLista = persons.filter(person => person.id !== id)
      setPersonsToShow(novaLista)
      setPersons(novaLista)
      axios.delete(`http://localhost:3001/persons/${id}`)
    }
    
  }
  
   
  

  return(
<>
{persons.map(person => <p key={person.id}>{person.name} {person.number}<button onClick={() => apagar(person.id, person.name)}>delete</button></p>)}
</>)}
  
const Filter = ({handleEvent}) => 
    <div>
      filter shown with <input onChange={handleEvent}/>
    </div>

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addName}>
        <div>
          name: <input onChange={props.handleEventName}/>
        </div>
        <div>
          number: <input onChange={props.handleEventNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
 
  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersonsToShow(response.data)
      setPersons(response.data)
    })
  }, [])

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {

    const lista = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))

    setNewFilter(event.target.value)
    const eMaior = filter.length > 0 ? true : false 
    if(eMaior)
    {
      setPersonsToShow(lista)
    } else
    {
      setPersonsToShow(persons)
    }
    
  }
 

  const addName = (event) => 
  {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length > 0){
      const resultado = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)

      if(resultado)
      {
          const note = persons.filter(person => person.name === newName)
          const nameObject = {
          ...note[0],
          number: newNumber
          }

        axios.patch(`http://localhost:3001/persons/${note[0].id}`, nameObject).then( (response) =>{
        console.log(response)
        })
	 
        const novaLista = persons.filter(person =>
        person.name !== newName)
        setPersonsToShow(novaLista.concat(nameObject))	     
        setPersons(novaLista.concat(nameObject))
        return

      }
    }
      
    

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1,
    }

    axios.post('http://localhost:3001/persons', nameObject).then( (response) =>{
      console.log(response)
    }

    )

    const atualizaPersons = persons.concat(nameObject)
    setPersons(atualizaPersons)
    setNewName('')
    setNewNumber('')
    setPersonsToShow(atualizaPersons)
    console.log(persons)
    
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleEvent={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm addName={addName} handleEventName={handlePersonChange} handleEventNumber={handleNumberChange} />

      <h2>Numbers</h2>

        <Person persons={personsToShow} setPersons={setPersons} setPersonsToShow={setPersonsToShow} />

    </div>
  )
}

export default App
