import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

function SolvedRow({ words }) {}

function WordRow() {}

async function getWords(game_id) {
  let { data: games, error } = await supabase
    .from("games")
    .select()
    .eq("game_id", game_id);

  if (error) {
    console.log(error);
  } else {
    const categories = [
      games[0].category_1,
      games[0].category_2,
      games[0].category_3,
      games[0].category_4,
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
    return { categories: categories, words: words };
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
  const [solvedRows, setSolvedRows] = useState(null);
  const [unsolvedRows, setUnsolvedRows] = useState(null);
  const [gameData, setGameData] = useState(null);
  useEffect(() => {
    (async () => {
      setGameData(await getWords("55dcf03d-36ba-420d-aaed-51dac5b47b3f"));
      if (gameData) {
        const unshuffled = [...gameData.words];
        setUnsolvedRows(shuffle(unshuffled));
        console.log(unsolvedRows);
      }
    })();
  }, []);

  return (
    <>
      <p>Hello</p>
    </>
  );
}
