import { supabase } from "../supabaseClient";
import { useEffect, useState, createContext, forwardRef } from "react";
import GameGrid from "./GameGrid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Colors } from "../ColorConstants";

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

function getWordColor(word, gameData) {
  for (let i = 0; i < 4; i++) {
    if (gameData[i].words.includes(word)) {
      switch (i) {
        case 0:
          return Colors.YELLOW;
        case 1:
          return Colors.GREEN;
        case 2:
          return Colors.BLUE;
        case 3:
          return Colors.PURPLE;
      }
    }
  }
}

function ResultsRow({ row, gameData }) {
  let colors = [];
  for (let i = 0; i < row.length; i++) {
    colors.push(getWordColor(row[i], gameData));
  }

  return (
    <div className="coloredSquareRow">
      {colors.map((color, index) => (
        <div key={index} className="coloredSquare" style={{ backgroundColor: color }}></div>
      ))}
    </div>
  );
}

export default function Game({ game_id, gameOfTheDay }) {
  // GameContext values
  const [guesses, setGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [numCorrectGuesses, setNumCorrectGuesses] = useState(0);

  const [unsolvedRows, setUnsolvedRows] = useState([]);
  const [solvedRows, setSolvedRows] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [isGameOverSolved, setIsGameOverSolved] = useState(false);
  const [isGameOverUnsolved, setIsGameOverUnsolved] = useState(false);
  const [allGuessesArray, setAllGuessesArray] = useState([]);

  const [openSolved, setOpenSolved] = useState(false);
  const [openUnsolved, setOpenUnsolved] = useState(false);


  const handleOpenSolved = () => {
    setOpenSolved(true);
  };

  const handleCloseSolved = () => {
    setOpenSolved(false);
  };

  const handleOpenUnsolved = () => {
    setOpenUnsolved(true);
  };

  const handleCloseUnsolved = () => {
    setOpenUnsolved(false);
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
        }}
      >
        <p className="gameTitle">{gameData.title}</p>
        <GameGrid />
        {!isGameOverSolved && !isGameOverUnsolved && (
          <p className="instructions">
            Find groups of four that have something in common!
          </p>
        )}
        {isGameOverSolved && (
          <p className="instructions">
            You completed the game!
          </p>
        )}
        {isGameOverUnsolved && (
          <p className="instructions">
            Next time!
          </p>
        )}
        <Dialog
          open={openSolved}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseSolved}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ textAlign: "center" }}>
            {"Great!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{ textAlign: "center" }}
            >
              You completed Hockey Connections: {gameData.title}
            </DialogContentText>
            <DialogContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              {allGuessesArray.map((row, index) => (
                <ResultsRow
                  key={index}
                  row={row}
                  gameData={gameData.answerData}
                />
              ))}
            </DialogContent>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openUnsolved}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseUnsolved}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ textAlign: "center" }}>
            {"Next time!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{ textAlign: "center" }}
            >
              Hockey Connections: {gameData.title}
            </DialogContentText>
            <DialogContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              {allGuessesArray.map((row, index) => (
                <ResultsRow
                  key={index}
                  row={row}
                  gameData={gameData.answerData}
                />
              ))}
            </DialogContent>
          </DialogContent>
        </Dialog>
      </GameContext.Provider>

    </>
  );
}
