import { useState, useEffect } from "react";

const SpeciesDropDown = (prop) => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/species`)
      .then((response) => response.json())
      .then((species) => {
        setSpecies(species);
      });
  }, []);

  //Listing Species
  return (
    <div>
      <select onChange={prop.handleSpecies}>
        {species.map((species) => (
          <option value={species.scientificname} key={species.id}>
            {species.commonname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpeciesDropDown;