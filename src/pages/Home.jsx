import { useState } from "react";
import Game from "../components/Game";
import Tabs from "../components/Tabs";
import CreateGame from "../components/CreateGame";

export default function Home() {
  const [activeTab, setActiveTab] = useState("gameOfTheDay");
  return (
    <div>
      <nav>
        <p style={{ fontSize: 40, fontWeight: "800", marginTop: 15, marginBottom: 15 }}>
          Hockey Connections
        </p>
      </nav>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == "gameOfTheDay" && <Game />}
      {activeTab == "createYourOwn" && <CreateGame />}
    </div>
  );
}
