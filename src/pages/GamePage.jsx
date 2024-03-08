import Game from "../components/Game";
import { useParams } from "react-router-dom";

export default function GamePage() {
  const { gameID } = useParams();
  return (
    <div>
      <nav>
        <p
          style={{
            fontSize: 40,
            fontWeight: "800",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          Hockey Connections
        </p>
      </nav>
      <Game game_id={gameID} gameOfTheDay={false} />
    </div>
  );
}
