import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

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
  const [stat, setStat] = useState({
    김민규: 0,
    김성철: 0,
    김영대: 0,
    남주혁: 0,
    류준열: 0,
    박보검: 0,
    박서준: 0,
    변요한: 0,
    송중기: 0,
    연우진: 0,
    이도현: 0,
    이수혁: 0,
    이종석: 0,
    이진욱: 0,
    이현우: 0,
    최우식: 0,
  }); //통계

  const ctx = document.getElementById("myChart");

  const ItemDisplay = ({ selectedItem }) => {
    const [displayedItem, setDisplayedItem] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // TODO: 선택한 항목을 3초 이상 띄우는 비동기 함수를 구현하세요.
          // selectedItem을 사용하여 선택한 항목을 띄우고,
          // 3초 후에 displayedItem을 null로 설정하세요.
          // 예시:
          setDisplayedItem(selectedItem);

          await new Promise((resolve) => setTimeout(resolve, 3000));

          setDisplayedItem(null);
        } catch (error) {
          console.error("데이터 조회 중 에러 발생:", error);
        }
      };

      fetchData();

      // 3초마다 조회를 반복하려면 아래 코드를 주석 해제하세요.
      // const interval = setInterval(fetchData, 3000);

      // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
      // return () => clearInterval(interval);
    }, [selectedItem]);

    return (
      <div>
        {displayedItem ? (
          <div>
            <h2>조회 결과:</h2>
            {/* 조회된 결과를 출력합니다. */}
            <p>{displayedItem}</p>
          </div>
        ) : (
          <div>
            <h2>조회 중...</h2>
            <p>잠시만 기다려주세요.</p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const 문자열 = localStorage.getItem("2020110483");
    if (문자열 != null) {
      setStat(JSON.parse(문자열));
    }

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
  //처음 컴포넌트가 단 한 번 실행하는 함수
  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  const left = round * 2,
    right = round * 2 + 1;
  console.log(stat);
  const leftFunction = () => {
    console.log("left");
    setStat({ ...stat, [game[left].name]: stat[game[left].name] + 1 });
    // alert(game[left].name + "를 선택하였습니다.");
    setNextGame((prev) => prev.concat(game[left]));
    setRound((round) => round + 1);
    // ...stat은 기존 stat을 복사해오는 것
    // setStat((prevStat) => {
    //   prevStat[game[left].name] = prevStat[game[left].name] + 1;
    //   return prevStat;
    // });
  };
  const rightFunction = () => {
    console.log("right");
    setStat({ ...stat, [game[right].name]: stat[game[right].name] + 1 });
    // alert(game[right].name + "를 선택하였습니다.");
    setNextGame((prev) => prev.concat(game[right]));
    setRound((round) => round + 1);
    // setStat((prevStat) => {
    //   prevStat[game[right].name] = prevStat[game[right].name] + 1;
    //   return prevStat;
    // });
  };

  if (game.length !== 1 && (game.length === 0 || round + 1 > game.length / 2))
    return <p>로딩중...</p>;
  if (game.length === 1) {
    localStorage.setItem("2020110483", JSON.stringify(stat));
    const labels = Object.keys(stat);
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "이상형 월드컵 승리횟수",
          data: Object.values(stat),

          borderWidth: 1,
        },
      ],
    };
    return (
      <div>
        <h1>이상형 월드컵 우승</h1>
        <div className="one">
          <img className="img" src={game[0].src} />
          <h2 className="img_win">{game[0].name}</h2>
          <p>{stat[game[0].name]} 번 승리</p>
          <table>
            {Object.keys(stat).map((name) => {
              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{stat[name]}</td>
                </tr>
              );
            })}
            {/* {game.flatMap((item) => {
              const name = item.name;
              const src = item.src;
              const win = item[name];
              return (<tr key = {name}>
                <td><img src ={src}></img></td>
                <td>{name}</td>
                <td>{win}</td>


              </tr>)

            } */}
          </table>
          <div className="chart">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>
        이상형 월드컵 {round + 1}/{game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
      </h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="one">
          <img className="img" src={game[left].src} onClick={leftFunction} />
          <h2 className="img_text">{game[round * 2].name}</h2>
        </div>
        <div className="one">
          <img className="img" src={game[right].src} onClick={rightFunction} />
          <h2 className="img_text">{game[round * 2 + 1].name}</h2>
        </div>
      </div>
    </div>
  );
}

export default Wordcup;
