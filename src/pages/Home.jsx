import { useState } from "react";
import Game from "../components/Game";
import Tabs from "../components/Tabs";
import CreateGame from "../components/CreateGame";

export default function Home() {
  const [activeTab, setActiveTab] = useState("gameOfTheDay");
  return (
    <div>
      <nav>
        <p style={{ fontSize: 40, fontWeight: "800", marginTop: 15, marginBottom: 10 }}>
          Hockey Connections
        </p>
      </nav>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == "gameOfTheDay" && <Game game_id={"55dcf03d-36ba-420d-aaed-51dac5b47b3f"} gameOfTheDay={true}/>}
      {activeTab == "createYourOwn" && <CreateGame />}
    </div>
  );
}
