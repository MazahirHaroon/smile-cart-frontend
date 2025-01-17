import { Button } from "neetoui";

import "./App.css";
// eslint-disable-next-line import/extensions
import logo from "./logo.svg";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img alt="logo" className="App-logo" src={logo} />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn React
      </a>
    </header>
    <Button label="Click here" />
  </div>
);

export default App;
