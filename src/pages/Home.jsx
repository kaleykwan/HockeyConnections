import { useState } from "react";
import Game from "../components/Game";
import Tabs from "../components/Tabs";
import CreateGame from "../components/CreateGame";
import "../styles/GameGridStyle.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("gameOfTheDay");
  const date = new Date().toDateString();
  return (
    <div>
      <nav>
        <h1 style={{ marginTop: 15, marginBottom: 10}}>hockey connections</h1>
      </nav>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == "gameOfTheDay" && (
        <Game
          game_id={"55dcf03d-36ba-420d-aaed-51dac5b47b3f"}
          gameOfTheDay={true}
        />
      )}
      {activeTab == "createYourOwn" && <CreateGame />}
    </div>
  );
}
