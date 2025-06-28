import "./StartScreen.css"

import React from 'react'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Palavra secreta</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar</button>
    </div>
  )
}

export default StartScreen