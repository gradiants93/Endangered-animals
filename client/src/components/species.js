import { useState, useEffect } from "react";
import SpeciesForm from "./speciesform";

function Species() {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/species")
      .then((response) => response.json())
      .then((species) => {
        setSpecies(species);
      });
  }, []);

  const addSpecies = (newSpecies) => {

    setSpecies((species) => [...species, newSpecies]);
  };

  return (
    <div className="species">
      <h2> List of Animals </h2>
      <ul>
        {species.map((species) => (
          <li key={species.id}>
            {" "}
            {species.commonname} {species.scientificname} {species.numberinthewild}
          </li>
        ))}
      </ul>
      <SpeciesForm addSpecies={addSpecies} />
    </div>
  );
}

export default Species;
