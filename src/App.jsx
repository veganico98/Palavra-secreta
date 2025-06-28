//Hooks
import { act, useCallback, useEffect, useState } from 'react'

//Css
import './App.css'

//Components
import StartScreen from './components/StartScreen'
import GameOver from './components/GameOver'
import Game from './components/Game'

//Data
import {wordsList} from './data/words'

const Stages = [
  { id: 1, name: "Start" },
  { id: 2, name: "Game" },
  { id: 3, name: "End" }
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(Stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);


  const pickWordAndCategory = useCallback(() => {
    //Pega uma categoria aleatória
    const categories = Object.keys(words)
    const category = 
    categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Pega uma palavra aleatória da categoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category};
  }, [words]);

  //Começa o jogo
  const startGame = useCallback(() => {
    //Limpar todas as letras
    clearLetterStates();
    
    //Pega a palavra e a categoria
    const {word, category } = pickWordAndCategory();

    //Cria um array de letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((L) => L.toUpperCase());

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(Stages[1].name);

  }, [pickWordAndCategory]);

  //Processa input de letras
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toUpperCase();

    // Checar se a letra já foi chutada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Incluir letras acertadas ou erradas
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGeusses) => actualGeusses - 1)
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  //Checa a quantidade de tentativas
  useEffect(() => {
      //reset all states
      if(guesses <= 0) {
        setGameStage(Stages[2].name);
    }
  }, [guesses]);
  
  //Checar consição de vitória
  useEffect(() => {

    const uniqueLetters = [... new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length){
      //Add score
      setScore((actualScore) => actualScore += 100)

      //Próxima palavra
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  //Reiniciar Jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(Stages[0].name)
  }

  return (
      <div className='App'>
        {gameStage === "Start" && <StartScreen startGame={startGame}/>}

        {gameStage === "Game" && <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
         />}

        {gameStage === "End" && <GameOver retry={retry} score={score}/>}
      </div>
  )
}

export default App
