import { supabase } from "../supabaseClient";
import { useEffect, useState, createContext } from "react";
import GameGrid from "./GameGrid";

export const GameContext = createContext();

async function getWords(game_id) {
  let { data: games, error } = await supabase
    .from("games")
    .select()
    .eq("game_id", game_id);

  if (error) {
    console.log(error);
  } else {
    const answers = [
      {
        category: games[0].category_1,
        words: [
          games[0].first_first,
          games[0].first_second,
          games[0].first_third,
          games[0].first_fourth,
        ],
      },
      {
        category: games[0].category_2,
        words: [
          games[0].second_first,
          games[0].second_second,
          games[0].second_third,
          games[0].second_fourth,
        ],
      },
      {
        category: games[0].category_3,
        words: [
          games[0].third_first,
          games[0].third_second,
          games[0].third_third,
          games[0].third_fourth,
        ],
      },
      {
        category: games[0].category_4,
        words: [
          games[0].fourth_first,
          games[0].fourth_second,
          games[0].fourth_third,
          games[0].fourth_fourth,
        ],
      },
    ];
    const words = [
      games[0].first_first,
      games[0].first_second,
      games[0].first_third,
      games[0].first_fourth,
      games[0].second_first,
      games[0].second_second,
      games[0].second_third,
      games[0].second_fourth,
      games[0].third_first,
      games[0].third_second,
      games[0].third_third,
      games[0].third_fourth,
      games[0].fourth_first,
      games[0].fourth_second,
      games[0].fourth_third,
      games[0].fourth_fourth,
    ];
    return { answerData: answers, words: words, title: games[0].title };
  }
}

export function shuffle(unshuffled) {
  let shuffledWords = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  let shuffledRows = [];
  while (shuffledWords.length > 0) {
    shuffledRows.push(shuffledWords.splice(0, 4));
  }
  return shuffledRows;
}

export default function Game({ game_id, gameOfTheDay }) {
  // GameContext values
  const [guesses, setGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);

  const [unsolvedRows, setUnsolvedRows] = useState([]);
  const [solvedRows, setSolvedRows] = useState([]);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    async function getShuffledWords() {
      const data = await getWords(game_id);
      setGameData(data);
      const unshuffled = [...data.words];
      const shuffled = shuffle(unshuffled);
      console.log(shuffled);
      return shuffled;
    }

    getShuffledWords().then((data) => {
      setUnsolvedRows(data);
    });
  }, []);

  if (!gameData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GameContext.Provider
        value={{
          guesses,
          setGuesses,
          numGuesses,
          setNumGuesses,
          gameData,
          unsolvedRows,
          setUnsolvedRows,
          solvedRows,
          setSolvedRows,
          gameOfTheDay,
        }}
      >
        <GameGrid />
        <p className="instructions">
          Find groups of four that have something in common!
        </p>
      </GameContext.Provider>
    </>
  );
}
