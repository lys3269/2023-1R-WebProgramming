import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//하나의 컴포넌트 ex ) App.jsx

//////컴포넌트의 생명주기 React Life Ciycle//////
//Mount : 컴포넌트가 필요하여 화면에 보여져야할때 <-> Unmount
//Mounting : initialization -> componentWillMount(컴포넌트가 마운트될것이다.) -> render(dom-tree에 올라갔다.) -> componentDidMount(컴포넌트가 마운트되었다.)

//Update
//Updating : componentWillReceiveProps(컴포넌트가 새로운 props(properties)를 받을것이다.) -> shouldComponentUpdate(컴포넌트가 업데이트 해야하니 안해야하니? True 뒤에단계진행, False 멈춤) -> componentWillUpdate(컴포넌트가 업데이트 될것이다.) -> render(dom-tree에 올라갔다.) -> componentDidUpdate(컴포넌트가 업데이트 되었다.)

//Unmount
//Unmounting : componentWillUnmount(컴포넌트가 언마운트 될것이다.)

function App() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    console.log("mount or update");

    return () => {
      console.log("unmount");
    };
  });

  useEffect(() => {
    console.log("mount only");
    fetch(
      "http://openapi.se  oul.go.kr:8088/56516f79536c797338364a7a57634b/json/RealtimeCityAir/1/25/"
    ).then(function (res2) {
      res2.json().then(function (res3) {
        setRow(res3.RealtimeCityAir.row); //App함수 update
      });
    });
  }, []); //두번째 인자가 배열이면 mount시에만 실행

  useEffect(() => {
    console.log("update only", row);
  }, [row]); //row가 업데이트됐을때만 실행

  // const fetchData = () => {
  //   if (row.length === 0) {
  //     fetch(
  //       "http://openapi.seoul.go.kr:8088/56516f79536c797338364a7a57634b/json/RealtimeCityAir/1/25/"
  //     ).then(function (res2) {
  //       res2.json().then(function (res3) {
  //         setRow(res3.RealtimeCityAir.row); //App함수 update
  //       });
  //     });
  //   }
  // };
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
      {/* <button onClick={fetchData}>로딩버튼</button> */}

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
          {row.map((gu, index) => {
            return (
              <tr key={index}>
                <td>{gu.MSRSTE_NM}</td>
                <td>{gu.PM10}</td>
                <td>{gu.O3}</td>
                <td>{gu.IDEX_NM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR hello.
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
