import { useEffect, useState, useContext } from "react";
import { GameContext } from "./Game";
import { shuffle } from "./Game";
import { useNavigate } from "react-router-dom";
import { Colors } from "../ColorConstants";
import "../styles/GameGridStyle.css";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WordRow({
  row,
  guesses,
  setGuesses,
  wordsInWrongGuess,
  shouldAnimate,
}) {
  function isWordInWrongGuess(word) {
    return wordsInWrongGuess.includes(word);
  }
  function addGuess(word) {
    if (guesses.includes(word)) {
      const updatedGuesses = guesses.filter((w) => {
        return w !== word;
      });
      setGuesses(updatedGuesses);
    } else {
      if (guesses.length < 4) {
        setGuesses((prev) => [...prev, word]);
      }
    }
  }
  return (
    <div className="wordRow" style={{ display: "flex", flexDirection: "row" }}>
      {row.map((word, index) => (
        <button
          key={index}
          className={`tile ${
            shouldAnimate && isWordInWrongGuess(word) ? "shake" : ""
          }`}
          onClick={(e) => {
            e.currentTarget.blur();
            addGuess(word);
          }}
          style={{
            color: guesses.includes(word) ? "white" : "black",
            backgroundColor: guesses.includes(word) ? "#656C7A" : "#E6E9F1",
            outline: "none",
          }}
        >
          {word}
        </button>
      ))}
    </div>
  );
}

function SolvedRow({ row }) {
  const words = row.words;
  const mergedWords = words.join(", ");
  return (
    <div
      className="solvedRow"
      style={{
        backgroundColor:
          row.categoryNum == 0
            ? Colors.YELLOW
            : row.categoryNum == 1
            ? Colors.GREEN
            : row.categoryNum == 2
            ? Colors.BLUE
            : Colors.PURPLE,
      }}
    >
      <p className="categoryName">{row.category}</p>
      <p className="solvedWords">{mergedWords}</p>
    </div>
  );
}

export default function GameGrid() {
  const {
    guesses,
    setGuesses,
    numGuesses,
    setNumGuesses,
    numCorrectGuesses,
    setNumCorrectGuesses,
    gameData,
    unsolvedRows,
    setUnsolvedRows,
    solvedRows,
    setSolvedRows,
    gameOfTheDay,
    isGameOverSolved,
    setIsGameOverSolved,
    isGameOverUnsolved,
    setIsGameOverUnsolved,
    handleOpenSolved,
    handleOpenUnsolved,
    setAllGuessesArray,
  } = useContext(GameContext);
  const navigate = useNavigate();
  const [wordsInWrongGuess, setWordsInWrongGuess] = useState([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [numCircles, setNumCircles] = useState(4);
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const newCircles = [];
    for (let i = 0; i < numCircles; i++) {
      newCircles.push(
        <div
          key={i}
          className="circle"
          style={{
            backgroundColor: "black",
            width: 20,
            height: 20,
            borderRadius: "50%",
          }}
        ></div>
      );
    }
    setCircles(newCircles);
  }, [numCircles]);

  console.log(circles);

  useEffect(() => {
    if (numCorrectGuesses == 4) {
      setIsGameOverSolved(true);
      setNumGuesses(0);
      setNumCorrectGuesses(0);
      handleOpenSolved();
    } else if (numGuesses - numCorrectGuesses == 4) {
      setIsGameOverUnsolved(true);
      setNumGuesses(0);
      setNumCorrectGuesses(0);
      let solvedGrid = [];
      for (let i = 0; i < 4; i++) {
        solvedGrid.push({
          category: gameData.answerData[i].category,
          words: gameData.answerData[i].words,
          categoryNum: i,
        });
      }
      setSolvedRows(solvedGrid);
      setUnsolvedRows([]);
      setGuesses([]);
      handleOpenUnsolved();
    }
  }, [numGuesses]);

  function restartGame() {
    setSolvedRows([]);
    const unshuffled = [...gameData.words];
    const shuffled = shuffle(unshuffled);
    setUnsolvedRows(shuffled);
    setIsGameOverSolved(false);
    setIsGameOverUnsolved(false);
    setAllGuessesArray([]);
    setNumCircles(4);
  }

  function submit() {
    if (guesses.length != 4) {
      return;
    }

    setAllGuessesArray((prev) => [...prev, guesses]);
    setNumGuesses((prev) => prev + 1);

    // check if guesses are correct
    const answers = gameData.answerData;
    const correctCount = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      const categoryWords = answers[i].words.flat();
      for (let j = 0; j < 4; j++) {
        if (categoryWords.includes(guesses[j])) {
          correctCount[i] += 1;
        }
      }
    }

    let category = 0;
    if (correctCount.includes(3)) {
      setWordsInWrongGuess(guesses);
      setShouldAnimate(true);
      setNumCircles((prev) => prev - 1);
      return "one away";
    } else if (!correctCount.includes(4)) {
      setWordsInWrongGuess(guesses);
      setShouldAnimate(true);
      setNumCircles((prev) => prev - 1);
      return;
    } else {
      category = correctCount.findIndex((element) => element == 4);
      setWordsInWrongGuess([]);
      setShouldAnimate(false);
    }

    // if guesses are correct, remove guessed words from unsolvedRows
    // (merge unsolvedRows and remove the guessed words), and add words to solvedRows
    // in the form of { category, words, categoryNum }
    let newUnsolvedWords = [...unsolvedRows];
    newUnsolvedWords = newUnsolvedWords.flat();
    newUnsolvedWords = newUnsolvedWords.filter(
      (word) => !guesses.includes(word)
    );
    let newUnsolvedRows = [];
    while (newUnsolvedWords.length > 0) {
      newUnsolvedRows.push(newUnsolvedWords.splice(0, 4));
    }
    setUnsolvedRows(newUnsolvedRows);
    setSolvedRows((prev) => [
      ...prev,
      {
        category: answers[category].category,
        words: guesses,
        categoryNum: category,
      },
    ]);
    setGuesses([]);

    // update correct guesses
    setNumCorrectGuesses((prev) => prev + 1);
    return "correct";
  }

  useEffect(() => {
    if (shouldAnimate) {
      const timeout = setTimeout(() => {
        setShouldAnimate(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [shouldAnimate]);

  function shuffleRemainingWords() {
    const mergedUnsolved = unsolvedRows.flat();
    const newShuffled = shuffle(mergedUnsolved);
    setUnsolvedRows(newShuffled);
  }

  const solvedRowsExist = solvedRows.length > 0;
  const unsolvedRowsExist = unsolvedRows.length > 0;

  return (
    <div className="grid">
      {solvedRowsExist && (
        <div>
          {solvedRows.map((row, index) => (
            <SolvedRow key={index} row={row} />
          ))}
        </div>
      )}
      {unsolvedRowsExist && (
        <div>
          {unsolvedRows.map((row, index) => (
            <WordRow
              key={index}
              row={row}
              guesses={guesses}
              setGuesses={setGuesses}
              wordsInWrongGuess={wordsInWrongGuess}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      )}
      {!isGameOverSolved && !isGameOverUnsolved && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Mistakes Remaining: {circles}
        </div>
      )}
      <div>
        {!isGameOverSolved && !isGameOverUnsolved && (
          <button
            style={{ outline: "none", color: "white" }}
            onClick={(e) => {
              e.currentTarget.blur();
              shuffleRemainingWords();
            }}
          >
            Shuffle
          </button>
        )}
        {!isGameOverSolved && !isGameOverUnsolved && (
          <button
            style={{ outline: "none", marginTop: 10, color: "white" }}
            onClick={(e) => {
              e.currentTarget.blur();
              const result = submit();
              if (result == "one away") {
                toast("one away!", {
                  autoClose: 800,
                  className: "custom-toast",
                  transition: Zoom,
                  position: "top-center",
                  closeButton: false,
                  hideProgressBar: true,
                  style: {
                    backgroundColor: "black",
                    color: "white",
                  },
                });
              }
            }}
          >
            Submit
          </button>
        )}
        {!gameOfTheDay && (
          <button
            style={{ outline: "none", color: "white" }}
            onClick={(e) => {
              e.currentTarget.blur();
              navigate("/");
            }}
          >
            Home
          </button>
        )}
        {(isGameOverSolved || isGameOverUnsolved) && (
          <button
            style={{ outline: "none", color: "white" }}
            onClick={(e) => {
              e.currentTarget.blur();
              restartGame();
            }}
          >
            Restart
          </button>
        )}
        {(isGameOverSolved || isGameOverUnsolved) && (
          <button
            style={{ outline: "none", color: "white" }}
            onClick={(e) => {
              e.currentTarget.blur();
              if (isGameOverSolved) {
                handleOpenSolved();
              } else {
                handleOpenUnsolved();
              }
            }}
          >
            View Results
          </button>
        )}
      </div>
    </div>
  );
}
