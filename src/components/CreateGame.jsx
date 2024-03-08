import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const [firstCategory, setFirstCategory] = useState("");
  const [secondCategory, setSecondCategory] = useState("");
  const [thirdCategory, setThirdCategory] = useState("");
  const [fourthCategory, setFourthCategory] = useState("");
  const [firstFirst, setFirstFirst] = useState("");
  const [firstSecond, setFirstSecond] = useState("");
  const [firstThird, setFirstThird] = useState("");
  const [firstFourth, setFirstFourth] = useState("");
  const [secondFirst, setSecondFirst] = useState("");
  const [secondSecond, setSecondSecond] = useState("");
  const [secondThird, setSecondThird] = useState("");
  const [secondFourth, setSecondFourth] = useState("");
  const [thirdFirst, setThirdFirst] = useState("");
  const [thirdSecond, setThirdSecond] = useState("");
  const [thirdThird, setThirdThird] = useState("");
  const [thirdFourth, setThirdFourth] = useState("");
  const [fourthFirst, setFourthFirst] = useState("");
  const [fourthSecond, setFourthSecond] = useState("");
  const [fourthThird, setFourthThird] = useState("");
  const [fourthFourth, setFourthFourth] = useState("");
  const navigate = useNavigate();

  async function createGame() {
    const { data, error } = await supabase
      .from("games")
      .insert({
        category_1: firstCategory,
        category_2: secondCategory,
        category_3: thirdCategory,
        category_4: fourthCategory,
        first_first: firstFirst,
        first_second: firstSecond,
        first_third: firstThird,
        first_fourth: firstFourth,
        second_first: secondFirst,
        second_second: secondSecond,
        second_third: secondThird,
        second_fourth: secondFourth,
        third_first: thirdFirst,
        third_second: thirdSecond,
        third_third: thirdThird,
        third_fourth: thirdFourth,
        fourth_first: fourthFirst,
        fourth_second: fourthSecond,
        fourth_third: fourthThird,
        fourth_fourth: fourthFourth,
      })
      .select();

    if (error) {
      console.log(error);
    } else {
      navigate("/" + data[0].game_id);
    }
  }
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <div style={{ display: "flex", gap: 15 }}>
          <div
            style={{
              backgroundColor: "#F9C156",
              padding: 25,
              borderRadius: 7,
            }}
          >
            <input
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                padding: 10,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 5,
                width: 430,
                marginBottom: 15,
              }}
              placeholder="Category"
              value={firstCategory}
              onChange={(e) => setFirstCategory(e.target.value)}
            />
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={firstFirst}
                onChange={(e) => setFirstFirst(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={firstSecond}
                onChange={(e) => setFirstSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                }}
                placeholder="Item"
                value={firstThird}
                onChange={(e) => setFirstThird(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                }}
                placeholder="Item"
                value={firstFourth}
                onChange={(e) => setFirstFourth(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#61CEA7",
              padding: 25,
              borderRadius: 7,
            }}
          >
            <input
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                padding: 10,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 5,
                width: 430,
                marginBottom: 15,
              }}
              placeholder="Category"
              value={secondCategory}
              onChange={(e) => setSecondCategory(e.target.value)}
            />
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={secondFirst}
                onChange={(e) => setSecondFirst(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={secondSecond}
                onChange={(e) => setSecondSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                }}
                placeholder="Item"
                value={secondThird}
                onChange={(e) => setSecondThird(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                }}
                placeholder="Item"
                value={secondFourth}
                onChange={(e) => setSecondFourth(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 15 }}>
          <div
            style={{
              backgroundColor: "#43AFDE",
              padding: 25,
              borderRadius: 7,
            }}
          >
            <input
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                padding: 10,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 5,
                width: 430,
                marginBottom: 15,
              }}
              placeholder="Category"
              value={thirdCategory}
              onChange={(e) => setThirdCategory(e.target.value)}
            />
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={thirdFirst}
                onChange={(e) => setThirdFirst(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={thirdSecond}
                onChange={(e) => setThirdSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                }}
                placeholder="Item"
                value={thirdThird}
                onChange={(e) => setThirdThird(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                }}
                placeholder="Item"
                value={thirdFourth}
                onChange={(e) => setThirdFourth(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#7B53D0",
              padding: 25,
              borderRadius: 7,
            }}
          >
            <input
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                padding: 10,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 5,
                width: 430,
                marginBottom: 15,
              }}
              placeholder="Category"
              value={fourthCategory}
              onChange={(e) => setFourthCategory(e.target.value)}
            />
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={fourthFirst}
                onChange={(e) => setFourthFirst(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                  marginBottom: 15,
                }}
                placeholder="Item"
                value={fourthSecond}
                onChange={(e) => setFourthSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginRight: 5,
                }}
                placeholder="Item"
                value={fourthThird}
                onChange={(e) => setFourthThird(e.target.value)}
              />
              <input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  padding: 10,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 5,
                  width: 200,
                  marginLeft: 5,
                }}
                placeholder="Item"
                value={fourthFourth}
                onChange={(e) => setFourthFourth(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        style={{ outline: "none", margin: 15 }}
        onClick={(e) => {
          e.currentTarget.blur();
          createGame();
        }}
      >
        Create
      </button>
    </div>
  );
}
