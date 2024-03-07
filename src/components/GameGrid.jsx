import { useEffect, useState } from "react";

function SolvedRow({ words }) {}

function WordRow({ row, guesses, setGuesses }) {
  return (
    <div className="wordRow" style={{ display: "flex", flexDirection: "row" }}>
      {row.map((word, index) => (
        <p
          key={index}
          className="tile"
          style={{
            color: "black",
            fontWeight: "600",
            fontSize: 16,
            padding: 20,
            paddingBottom: 24,
            paddingTop: 24,
            width: 110,
            backgroundColor: "#E6E9F1",
            margin: 4,
            borderRadius: 6,
          }}
        >
          {word}
        </p>
      ))}
    </div>
  );
}

export default function GameGrid({ rowData, answerData }) {
  const [solvedRows, setSolvedRows] = useState(null);
  const [unsolvedRows, setUnsolvedRows] = useState(rowData);
  const [guesses, setGuesses] = useState([]);
  return (
    <div className="grid">
      {unsolvedRows.map((row, index) => (
        <WordRow
          key={index}
          row={row}
          guesses={guesses}
          setGuesses={setGuesses}
        />
      ))}
    </div>
  );
}
