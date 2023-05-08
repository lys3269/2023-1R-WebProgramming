import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [row, setRow] = useState([]);

  const fetchData = () => {
    if (row.length === 0) {
      fetch(
        "http://openapi.seoul.go.kr:8088/56516f79536c797338364a7a57634b/json/RealtimeCityAir/1/25/"
      ).then(function (res2) {
        res2.json().then(function (res3) {
          setRow(res3.RealtimeCityAir.row);
        });
      });
    }
  };
  // const res = await fetch("http://openapi.seoul.go.kr:8088/56516f79536c797338364a7a57634b/json/RealtimeCityAir/1/25/");
  // const res2 = await res.json();

  // console.log(res2.RealtimeCityAir.row);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>우헤헤</h1>
      <button onClick={fetchData}>로딩버튼</button>

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>PM10</th>
            <th>O3</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody id="data">
          {row.map(function (obj) {
            return (
              <tr>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> 
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR hello.
        </p>
      </div> */}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
