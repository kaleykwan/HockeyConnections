import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Colors } from "../ColorConstants";
import "../styles/CreateGameStyle.css";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateGame() {
  const [gameTitle, setGameTitle] = useState("");
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

  function checkInputs() {
    if (firstCategory.length == 0) {
      return false;
    } else if (secondCategory.length == 0) {
      return false;
    } else if (thirdCategory.length == 0) {
      return false;
    } else if (fourthCategory.length == 0) {
      return false;
    } else if (firstFirst.length == 0) {
      return false;
    } else if (firstSecond.length == 0) {
      return false;
    } else if (firstThird.length == 0) {
      return false;
    } else if (firstFourth.length == 0) {
      return false;
    } else if (secondFirst.length == 0) {
      return false;
    } else if (secondSecond.length == 0) {
      return false;
    } else if (secondThird.length == 0) {
      return false;
    } else if (secondFourth.length == 0) {
      return false;
    } else if (thirdFirst.length == 0) {
      return false;
    } else if (thirdSecond.length == 0) {
      return false;
    } else if (thirdThird.length == 0) {
      return false;
    } else if (thirdFourth.length == 0) {
      return false;
    } else if (fourthFirst.length == 0) {
      return false;
    } else if (fourthSecond.length == 0) {
      return false;
    } else if (fourthThird.length == 0) {
      return false;
    } else if (fourthFourth.length == 0) {
      return false;
    }
    return true;
  }
  async function createGame() {
    if (!checkInputs()) {
      toast("Missing part of the form!", {
        autoClose: 800,
        className: "custom-toast",
        transition: Zoom,
        position: "top-center",
        closeButton: false,
        hideProgressBar: true,
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }
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
        title: gameTitle,
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
        <div className="titleInputWrapper">
          <input
            className="titleInput"
            placeholder="Title"
            maxLength={100}
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
          />
        </div>
        <div className="categoryFormOne">
          <div
            className="formSet"
            style={{
              backgroundColor: Colors.YELLOW,
              padding: 25,
              paddingBottom: 10,
              borderRadius: 7,
            }}
          >
            <input
              className="categoryInput"
              placeholder="Category"
              maxLength={63}
              value={firstCategory}
              onChange={(e) => setFirstCategory(e.target.value)}
            />
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={firstFirst}
                onChange={(e) => setFirstFirst(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={firstSecond}
                onChange={(e) => setFirstSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={firstThird}
                onChange={(e) => setFirstThird(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={firstFourth}
                onChange={(e) => setFirstFourth(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: Colors.GREEN,
              padding: 25,
              paddingBottom: 10,
              borderRadius: 7,
            }}
          >
            <input
              className="categoryInput"
              placeholder="Category"
              maxLength={63}
              value={secondCategory}
              onChange={(e) => setSecondCategory(e.target.value)}
            />
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={secondFirst}
                onChange={(e) => setSecondFirst(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={secondSecond}
                onChange={(e) => setSecondSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={secondThird}
                onChange={(e) => setSecondThird(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={secondFourth}
                onChange={(e) => setSecondFourth(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="categoryFormTwo">
          <div
            style={{
              backgroundColor: Colors.BLUE,
              padding: 25,
              paddingBottom: 10,
              borderRadius: 7,
            }}
          >
            <input
              className="categoryInput"
              placeholder="Category"
              maxLength={63}
              value={thirdCategory}
              onChange={(e) => setThirdCategory(e.target.value)}
            />
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={thirdFirst}
                onChange={(e) => setThirdFirst(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={thirdSecond}
                onChange={(e) => setThirdSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={thirdThird}
                onChange={(e) => setThirdThird(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={thirdFourth}
                onChange={(e) => setThirdFourth(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: Colors.PURPLE,
              padding: 25,
              paddingBottom: 10,
              borderRadius: 7,
            }}
          >
            <input
              className="categoryInput"
              placeholder="Category"
              maxLength={63}
              value={fourthCategory}
              onChange={(e) => setFourthCategory(e.target.value)}
            />
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={fourthFirst}
                onChange={(e) => setFourthFirst(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={fourthSecond}
                onChange={(e) => setFourthSecond(e.target.value)}
              />
            </div>
            <div>
              <input
                className="leftItemInput"
                placeholder="Item"
                maxLength={21}
                value={fourthThird}
                onChange={(e) => setFourthThird(e.target.value)}
              />
              <input
                className="rightItemInput"
                placeholder="Item"
                maxLength={21}
                value={fourthFourth}
                onChange={(e) => setFourthFourth(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        style={{ outline: "none", margin: 15, marginBottom: 0 }}
        onClick={(e) => {
          e.currentTarget.blur();
          createGame();
        }}
      >
        Create
      </button>
      <p className="note" style={{ marginTop: 10 }}>
        Your game may be featured as the Game of the Day!
      </p>
    </div>
  );
}
