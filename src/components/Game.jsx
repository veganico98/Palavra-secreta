import  { useState, useRef } from "react";

import "./Game.css";

const Game = ({
    pickedCategory,
    guessedLetters,
    wrongLetters,
    verifyLetter,
    pickedWord,
    letters,
    guesses,
    score
}) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter);

        setLetter("");

        letterInputRef.current.focus();

    }

    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra: </h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} chances!</p>
            <div className="wordContainer">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
                {/* <span className="letter"></span> */}
                <span className="blackSquare"></span>
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="letter" 
                        maxLength="1" 
                        required 
                        onChange={(e) => setLetter(e.target.value)} 
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>jogar!</button>
                </form>
            </div>
            <div className="wrongLetterContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game;