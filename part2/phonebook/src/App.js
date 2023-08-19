import { useState, useEffect } from 'react'

import phoneService from './services/phones'

const Person = ({persons, setPersons, setPersonsToShow, setMessage, setColor}) => {
  
  const apagar = (id, name) => {
    const resultado = window.confirm(`delete ${name}`)

    if(resultado){
      const novaLista = persons.filter(person => person.id !== id)
      setPersonsToShow(novaLista)
      setPersons(novaLista)
	    phoneService.apagar(id).catch(error =>{
	    setColor('red')
		    setMessage(`the person ${name} as already deleted`)
		    setTimeout(() => {
			    setMessage(null
			    )},3000)

		    })
	    setMessage(`deleted ${name}`)
	    setColor('red')
	    setTimeout(() => {
		setMessage(null)
		    },3000)
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
          name: <input onChange={props.handleEventName} value={props.name}/>
        </div>
        <div>
          number: <input onChange={props.handleEventNumber}  value={props.number}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Message = ({message, cor}) => {
	
	const errorStyle = {
  color: cor,
  background: 'lightgrey',
		fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
		}
	if(message !== null){
		return (
		<div style={errorStyle}>{message}</div> 
			)
		}
}


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
	const [message, setMessage] = useState('')
	const [cor, setColor] = useState('green')
	useEffect(() => {
		setMessage(null)
    phoneService.getAll().then(initialPhones => {
      setPersonsToShow(initialPhones)
      setPersons(initialPhones)
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
    const eMaior = event.target.value.length > 0 ? true : false 
    if(eMaior)
    {
      setPersonsToShow(lista)
    } else
    {
      setPersonsToShow(persons)
    }
    
  }
 

  const addName = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length > 0){
      const resultado = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)

      if(resultado)
      {
          const note = persons.find(person => person.name === newName)
          const nameObject = {
          ...note,
          number: newNumber
          }

        phoneService.update(note.id, nameObject).then(response => console.log(response))
	 
        const novaLista = persons.filter(person =>
        person.name !== newName)
        setPersonsToShow(novaLista.concat(nameObject))	     
        setPersons(novaLista.concat(nameObject))
	setNewName('')
	      setNewNumber('')
	      setMessage(`updated ${newName}`)
	      setColor('green')
	      setTimeout(() => {
		setMessage(null)
		      }, 3000)
	      return

      }
    }
      
    

    const nameObject = {
      name: newName,
      number: newNumber,
      
    }

    phoneService.create(nameObject).then(response => console.log(response))
    
    const atualizaPersons = persons.concat(nameObject)
    setPersons(atualizaPersons)
    setNewName('')
    setNewNumber('')
    setPersonsToShow(atualizaPersons)
		  console.log(persons)
	  setColor('green')
	  setMessage(`Added ${newName}`)
	  setTimeout(() => {
		  setMessage(null)
		  }, 3000)
  }


	return (
		<div>
			
			<h2>Phonebook</h2>
		<Message message={message} cor={cor} />

      <Filter handleEvent={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm addName={addName} handleEventName={handlePersonChange} handleEventNumber={handleNumberChange} name={newName} number={newNumber}/>

      <h2>Numbers</h2>

        <Person persons={personsToShow} setPersons={setPersons} setPersonsToShow={setPersonsToShow} setMessage={setMessage} setColor={setColor}/>

    </div>
  )
}

export default App
