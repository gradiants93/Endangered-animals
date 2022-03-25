import "./App.css";
import Species from "./components/species";
import Sightings from "./components/sightings";
import HeroSection from "./components/hero";

function App() {
  // const [page, setPage] = useState("sightings")
  return (
    <div className="App">
      <div className="hero-image">
        <HeroSection />
     </div>
      {/* Hello from Techtonica */}
      <div className="forms">
        <Species />
        <Sightings />
      </div>
    </div>
  );
}

export default App;
