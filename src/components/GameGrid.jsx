import { useEffect, useState, useContext } from "react";
import { GameContext } from "./Game";
import { shuffle } from "./Game";

function WordRow({ row, guesses, setGuesses }) {
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
          className="tile"
          onClick={(e) => {
            e.currentTarget.blur();
            addGuess(word);
          }}
          style={{
            color: guesses.includes(word) ? "white" : "black",
            fontWeight: "600",
            fontSize: 16,
            padding: 20,
            paddingBottom: 24,
            paddingTop: 24,
            width: 130,
            backgroundColor: guesses.includes(word) ? "#656C7A" : "#E6E9F1",
            margin: 4,
            marginTop: 0,
            marginBottom: 8,
            borderRadius: 6,
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
            ? "#F9C156"
            : row.categoryNum == 1
            ? "#61CEA7"
            : row.categoryNum == 2
            ? "#43AFDE"
            : "#7B53D0",
        width: 544,
        margin: 4,
        marginTop: 0,
        marginBottom: 8,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <p
        style={{
          color: "black",
          fontWeight: "800",
          fontSize: 18,
          margin: 0,
          marginBottom: 4,
        }}
      >
        {row.category}
      </p>
      <p
        style={{
          color: "black",
          fontWeight: "600",
          fontSize: 18,
          margin: 0,
        }}
      >
        {mergedWords}
      </p>
    </div>
  );
}

export default function GameGrid() {
  const {
    guesses,
    setGuesses,
    numGuesses,
    setNumGuesses,
    gameData,
    unsolvedRows,
    setUnsolvedRows,
    solvedRows,
    setSolvedRows,
  } = useContext(GameContext);

  function submit() {
    if (guesses.length != 4) {
      return;
    }

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
      return "one away";
    } else if (!correctCount.includes(4)) {
      return;
    } else {
      category = correctCount.findIndex((element) => element == 4);
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

    // update numGuesses
    setNumGuesses((prev) => prev + 1);
    return "correct";
  }

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
            />
          ))}
        </div>
      )}
      <div>
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            submit();
          }}
        >
          Submit
        </button>
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            shuffleRemainingWords();
          }}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
