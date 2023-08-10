const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong>Number of exercises {sum}</strong>

const Part = (part) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return(
  <>
    {parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
  </>
)}

const Course = ({course}) => {

  const exercisesTotal = course.parts.map(part => part.exercises)
  const valorTotal = exercisesTotal.reduce((acumulador, valorAgora) => acumulador+valorAgora)
  return(
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={valorTotal}/>
    </>
   
  )

}

export default Course