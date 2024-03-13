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
        <h1 style={{ marginTop: 15, marginBottom: 10}}>Hockey Connections</h1>
      </nav>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == "gameOfTheDay" && (
        <Game
          game_id={"1a4b229c-af1c-434e-aeff-236421276d92"}
          gameOfTheDay={true}
        />
      )}
      {activeTab == "createYourOwn" && <CreateGame />}
    </div>
  );
}
