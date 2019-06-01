import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  // WebSocketTest();
  const [project, setProject] = useState({});
  WebSocketSetStateTest(setProject);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>{Object.keys(project)}</h2>
    </div>
  );
}

let WebSocketSetStateTest = setProject => {
  const ws = new WebSocket("ws://localhost:8001");
  let webSocketAutoCloser;
  ws.onopen = () => {
    console.log("webSocket connected");
  };
  ws.onmessage = msg => {
    clearTimeout(webSocketAutoCloser);

    console.log("onmessage");
    // let keys = Object.keys(JSON.parse(msg.data).data);
    let parseTime = Date.now();
    let { data } = JSON.parse(msg.data);
    console.log("parseTimeCost", Date.now() - parseTime);
    if (data.project) {
      console.log("setProject start");
      // console.log(setProject);
      setProject && setProject(data.project);
      console.log("setProject end");
    }
    // console.log(keys);

    webSocketAutoCloser = setTimeout(() => {
      ws.close();
    }, 5000);
  };
};

function WebSocketTest() {
  const ws = new WebSocket("ws://localhost:8001");
  let startTimeMessage;
  let webSocketAutoCloser;
  ws.onopen = () => {
    console.log("webSocket connected");
    startTimeMessage = Date.now();
  };
  ws.onmessage = msg => {
    clearTimeout(webSocketAutoCloser);
    console.log("messageTimeCost", Date.now() - startTimeMessage);

    console.log("onmessage");
    // let keys = Object.keys(JSON.parse(msg.data).data);
    let parseTime = Date.now();
    console.log(Object.keys(JSON.parse(msg.data).data));
    console.log("parseTimeCost", Date.now() - parseTime);
    // console.log(keys);

    startTimeMessage = Date.now();
    webSocketAutoCloser = setTimeout(() => {
      ws.close();
    }, 5000);
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
