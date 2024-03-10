import { supabase } from "../supabaseClient";
import { useEffect, useState, createContext, forwardRef } from "react";
import GameGrid from "./GameGrid";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

export const GameContext = createContext();

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

function results() {
  
}

export default function Game({ game_id, gameOfTheDay }) {
  // GameContext values
  const [guesses, setGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);

  const [unsolvedRows, setUnsolvedRows] = useState([]);
  const [solvedRows, setSolvedRows] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          isGameOver,
          setIsGameOver,
          handleOpen
        }}
      >
        <p className="gameTitle">{gameData.title}</p>
        <GameGrid />
        {!isGameOver && (
          <p className="instructions">
            Find groups of four that have something in common!
          </p>
        )}
        {isGameOver && (
          <p className="instructions">
            Congratulations, you completed the game!
          </p>
        )}
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ justifyContent: "center"}}>{"Congrats!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{justifyContent: "center"}}>
            You completed Hockey Connections: {gameData.title}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      </GameContext.Provider>
    </>
  );
}
