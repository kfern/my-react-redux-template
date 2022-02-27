import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Search from "./features/search/Search";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <Search />
      </header>
    </div>
  );
}

export default App;
