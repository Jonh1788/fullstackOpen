import { useState, useEffect } from 'react'


const Botao = ({handleClique, texto}) => {
    return(
        <button onClick={handleClique}>{texto}</button>
    )
}

const App = () => {

  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]

  const [selected, setSelected] = useState(0)
  const aleatorizar = () => 
  {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const [valores, setValores] = useState([])
  useEffect(() => {
    const valoresIniciais = Array(anecdotes.length).fill(0)
    setValores(valoresIniciais)

  }, [anecdotes.length])


  const votar = () => {

    setValores(prevValores => {
      const novosValores = [...prevValores]
      novosValores[selected] += 1
      return novosValores
    })


    console.log(selected, ":", valores[selected])
  }
  
  
  let maiorValor = 0

  for(let i = 1; i < valores.length; i++)
  {
    if (valores[i] > valores[maiorValor])
    {
      maiorValor = i;
    }
  }

  return (

    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>tem {valores[selected]} votos</p>
      <Botao handleClique={votar} texto="vote"/>
      <Botao handleClique={aleatorizar} texto="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maiorValor]}</p>
      <p>tem {valores[maiorValor]} votos</p>
    </div>
  )
}

export default App