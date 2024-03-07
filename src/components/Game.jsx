import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import GameGrid from "./GameGrid";

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
        first: games[0].first_first,
        second: games[0].first_second,
        third: games[0].first_third,
        fourth: games[0].first_fourth,
      },
      {
        category: games[0].category_2,
        first: games[0].second_first,
        second: games[0].second_second,
        third: games[0].second_third,
        fourth: games[0].second_fourth,
      },
      {
        category: games[0].category_3,
        first: games[0].third_first,
        second: games[0].third_second,
        third: games[0].third_third,
        fourth: games[0].third_fourth,
      },
      {
        category: games[0].category_4,
        first: games[0].fourth_first,
        second: games[0].fourth_second,
        third: games[0].fourth_third,
        fourth: games[0].fourth_fourth,
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
    return { answerData: answers, words: words };
  }
}

function shuffle(unshuffled) {
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

export default function Game() {
  const [unsolvedRows, setUnsolvedRows] = useState(null);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    async function getShuffledWords() {
      const data = await getWords("55dcf03d-36ba-420d-aaed-51dac5b47b3f");
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
    return null;
  }

  return (
    <>
      <GameGrid rowData={unsolvedRows} answerData={gameData.answerData} />
      <p>Find groups of four that have something in common.</p>
    </>
  );
}
