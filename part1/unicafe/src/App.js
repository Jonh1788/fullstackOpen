import { useState } from 'react'

const Titulo = ({texto}) => <h1>{texto}</h1>
const Botao = ({handleClique, texto}) => {
    return(
        <button onClick={handleClique}>{texto}</button>
    )
}

const StatisticLine = ({texto, valor}) => <p>{texto} {valor}</p>

const App = () => {
  // salve os cliques de cada botão em seu próprio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <Titulo texto={"give feedback"}/>
      <Botao texto={"good"}/>
      <Botao texto={"neutral"}/>
      <Botao texto={"bad"}/>
      <Titulo texto={"statistics"}/>
      <StatisticLine texto={"good"} valor={good}/>
    </div>
  )
}

export default App