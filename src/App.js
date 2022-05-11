import './App.css';
import PathSwitcher from './api/PathSwitcher';
import {
  Link,
  generatePath,
} from "react-router-dom";

function App() {
  return (
    <div className="App, container">
      <Link className="btn" to={generatePath("/")} ><h1><i className="bi bi-bookmark-heart" style={{ fontSize: 50 }}></i> Check this OGC API</h1></Link>
      <br/>
      <PathSwitcher></PathSwitcher>
    </div>
  );
}

export default App;
