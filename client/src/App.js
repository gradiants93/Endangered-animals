import "./App.css";
import Species from "./components/species";
import Sightings from "./components/sightings";

function App() {
  // const [page, setPage] = useState("sightings")
  return (
    <div className="App">
      Hello from Techtonica
      <Species />
      <Sightings />
    </div>
  );
}

export default App;
