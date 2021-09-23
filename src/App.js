import logo from "./logo.svg";
import "./App.css";
// import Counter from './components/Counter';
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <div className="titleComponent">
        <text className="title">Weather Forcast</text>
        <text className="descr">NEXT 7 DAYS</text>
      </div>
      <Weather />
    </div>
  );
}

export default App;
