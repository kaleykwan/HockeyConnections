export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div>
      <button
        style={{
          borderRadius: 20,
          marginBottom: 20,
          color: activeTab == "gameOfTheDay" ? "white" : "black",
          backgroundColor: activeTab == "gameOfTheDay" ? "black" : "#F3F3F3",
          outline: "none",
        }}
        onClick={(e) => {
          e.currentTarget.blur();
          setActiveTab("gameOfTheDay");
        }}
      >
        Game of the Day
      </button>
      <button
        style={{
          borderRadius: 20,
          marginBottom: 20,
          color: activeTab == "createYourOwn" ? "white" : "black",
          backgroundColor: activeTab == "createYourOwn" ? "black" : "#F3F3F3",
          outline: "none",
        }}
        onClick={(e) => {
          e.currentTarget.blur();
          setActiveTab("createYourOwn");
        }}
      >
        Create Your Own
      </button>
    </div>
  );
}
