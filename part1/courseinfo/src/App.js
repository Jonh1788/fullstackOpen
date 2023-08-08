const Header = ({ course }) => <h1>{course}</h1>
const Part = ({text, exercise}) => <p>{text} {exercise}</p> 

const Content = (props) => {
 return( 
<>
<Part text={props.text} exercise={props.exercise}/>
<Part text={props.text1} exercise={props.exercise1}/>
<Part text={props.text2} exercise={props.exercise2}/>
</>
 )
}

const Total = ({total}) => <p>Number of exercises {total}</p>


const App = () => {
  const course = 'Desenvolvimento de aplicação Half Stack'
  const part1 = 'Fundamentos da biblioteca React'
  const exercises1 = 10
  const part2 = 'Usando props para passar dados'
  const exercises2 = 7
  const part3 = 'Estado de um componente'
  const exercises3 = 14
  const total = exercises1 + exercises2 + exercises3

  return (
    <div>
      <Header course={course}/>
      <Content text={part1} exercise={exercises1} text1={part2} exercise1={exercises2} text2={part3} exercise2={exercises3}/>
      <Total total={total}/>
    </div>
  )
}

export default App