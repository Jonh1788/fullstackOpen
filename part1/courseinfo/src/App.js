const Header = ({ course }) => <h1>{course}</h1>
const Part = (props) => <p>{props.name} {props.exercise}</p> 

const Content = ({parts}) => {
  
 return( 
<>
<Part name={parts[0].name} exercise={parts[0].exercises}/>
<Part name={parts[1].name} exercise={parts[1].exercises}/>
<Part name={parts[2].name} exercise={parts[2].exercises}/>
</>
 )
}

const Total = ({total}) =>{
  let valor = 0
  total.forEach(element => {
   valor = element.exercises + valor
  });
  return(

    <p>Number of exercises {valor}</p>

  )
} 

const App = () => {
  const course = {
  name: 'Desenvolvimento de aplicação Half Stack',
  parts :[
    {
      name: 'Fundamentos da biblioteca React',
      exercises: 10
    },
    {
      name: 'Usando props para passar dados',
      exercises: 7
    },
    {
      name: 'Estado de um componente',
      exercises: 14
    }
  ]
}
 


  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App