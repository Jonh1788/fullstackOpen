import { useState } from 'react'

const Titulo = ({texto}) => <h1>{texto}</h1>
const Botao = ({handleClique, texto}) => {
    return(
        <button onClick={handleClique}>{texto}</button>
    )
}

const StatisticLine = ({texto, valor}) => {

 return(
  <tbody>
    <tr>
      <td>{texto}</td>
      <td>{valor}</td>
    </tr>
  </tbody>

 ) 
}

const Statistic = ({valor, total}) => {
  if(total === 0)
  {
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
    <StatisticLine texto={valor[0].name} valor={valor[0].valor}/>
    <StatisticLine texto={valor[1].name} valor={valor[1].valor}/>
    <StatisticLine texto={valor[2].name} valor={valor[2].valor}/>
    <StatisticLine texto={valor[3].name} valor={valor[3].valor}/>
    <StatisticLine texto={valor[4].name} valor={valor[4].valor}/>
    <StatisticLine texto={valor[5].name} valor={valor[5].valor}/>
    </table>
    
    
  )
}

const App = () => {
  // salve os cliques de cada botão em seu próprio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  const aumentarGoodEmUm = () => {
    setGood(good + 1)
  }

  const aumentarNeutralEmUm = () => {
    setNeutral(neutral + 1)
  }

  const aumentarBadEmUm = () => {
    setBad(bad + 1)
  }

  
  const total = good + bad + neutral
  const positive = (good/total)*100
  const average = (good-bad)/total

  const statistics = [
    {
      name: "good",
      valor: good
    },
    {
      name: "neutral",
      valor: neutral
    },
    {
      name: "bad",
      valor: bad
    },
    {
      name: "all",
      valor: total
    },
    {
      name: "average",
      valor: average.toFixed(1)
    },
    {
      name: "positive",
      valor: positive.toFixed(1) + "%"
    }
    

  ]

  return (
    <div>
      <Titulo texto={"give feedback"}/>
      <Botao handleClique={aumentarGoodEmUm} texto={"good"}/>
      <Botao handleClique={aumentarNeutralEmUm} texto={"neutral"}/>
      <Botao handleClique={aumentarBadEmUm} texto={"bad"}/>
      <Titulo texto={"statistics"}/>
      <Statistic valor={statistics} total={total}/>
    </div>
  )
}

export default App