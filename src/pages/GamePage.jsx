import Game from "../components/Game";
import { useParams } from "react-router-dom";
import "../styles/GameGridStyle.css";

export default function GamePage() {
  const { gameID } = useParams();
  return (
    <div>
      <nav>
        <h1 style={{ marginTop: 15, marginBottom: 10 }}>hockey connections</h1>
      </nav>
      <Game game_id={gameID} gameOfTheDay={false} />
    </div>
  );
}
