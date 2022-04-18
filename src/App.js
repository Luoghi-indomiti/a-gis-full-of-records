import './App.css';
import ApiLoader from './api/apiloader';

function App() {
  return (
    <div className="App, container">
      <h1><i className="bi bi-bookmark-heart" style={{ fontSize: 50 }}></i> Check this OGC API</h1>
      <br/>
      <ApiLoader></ApiLoader>
    </div>
  );
}

export default App;
