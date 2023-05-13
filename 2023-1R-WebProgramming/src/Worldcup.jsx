import { useEffect, useState } from "react";
import p01 from "./assets/김민규.jpg";
import p02 from "./assets/김성철.jpg";
import p03 from "./assets/김영대.jpg";
import p04 from "./assets/남주혁.jpg";
import p05 from "./assets/류준열.jpg";
import p06 from "./assets/박보검.jpg";
import p07 from "./assets/박서준.jpg";
import p08 from "./assets/변요한.jpg";
import p09 from "./assets/송중기.jpg";
import p10 from "./assets/연우진.jpg";
import p11 from "./assets/이도현.jpg";
import p12 from "./assets/이수혁.jpg";
import p13 from "./assets/이종석.jpg";
import p14 from "./assets/이진욱.jpg";
import p15 from "./assets/이현우.jpg";
import p16 from "./assets/최우식.jpg";
import "./Worldcup.css";

function Wordcup() {
  const candidate = [
    { name: "김민규", src: p01 },
    { name: "김성철", src: p02 },
    { name: "김영대", src: p03 },
    { name: "남주혁", src: p04 },
    { name: "류준열", src: p05 },
    { name: "박보검", src: p06 },
    { name: "박서준", src: p07 },
    { name: "변요한", src: p08 },
    { name: "송중기", src: p09 },
    { name: "연우진", src: p10 },
    { name: "이도현", src: p11 },
    { name: "이수혁", src: p12 },
    { name: "이종석", src: p13 },
    { name: "이진욱", src: p14 },
    { name: "이현우", src: p15 },
    { name: "최우식", src: p16 },
  ];

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]); //다음게임
  useEffect(() => {
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  // console.log(
  //   candidate
  //     .map((c) => {
  //       return { name: c.name, src: c.src, order: Math.random() };
  //     })
  //     .sort((l, r) => {
  //       return l.order - r.order;
  //     })
  // );
  useEffect(() => {
    if (game.length > 0 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  if (game.length === 1) {
    return (
      <div>
        <h1>이상형 월드컵 우승</h1>
        <div class="one">
          <img class="img" src={game[0].src} /> <p>{game[0].name}</p>
          <h2 class="img_text">{game[0].name}</h2>
        </div>
      </div>
    );
  }
  if (game.length === 0 || round + 1 > game.length / 2) return <p>로딩중...</p>;

  return (
    <div>
      <h1>
        이상형 월드컵 {round + 1}/{game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
      </h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div class="one">
          <img
            class="img"
            src={game[round * 2].src}
            onClick={() => {
              setNextGame((prev) => prev.concat(game[round * 2]));
              setRound((round) => round + 1);
            }}
          />
          <h2 class="img_text">{game[round * 2].name}</h2>
        </div>
        <div class="one">
          <img
            class="img"
            src={game[round * 2 + 1].src}
            onClick={() => {
              setNextGame((prev) => prev.concat(game[round * 2 + 1]));
              setRound((round) => round + 1);
            }}
          />
          <h2 class="img_text">{game[round * 2 + 1].name}</h2>
        </div>
      </div>
    </div>
  );
}

export default Wordcup;
