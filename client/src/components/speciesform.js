import { useState } from "react";

const SpeciesForm = (props) => {
  const [species, setSpecies] = useState({
    commonname: "",
    scientificname: "",
    numberinthewild: "",
    conservationstatus: "",
  });

  //create functions that handle the event of the user typing into the form
  const handleCommonNameChange = (event) => {
    const commonname = event.target.value;
    setSpecies((species) => ({ ...species, commonname }));
  };

  const handleScientificNameChange = (event) => {
    const scientificname = event.target.value;
    setSpecies((species) => ({ ...species, scientificname }));
  };

  const handleNumberInTheWildChange = (event) => {
    const numberinthewild = event.target.value;
    setSpecies((species) => ({ ...species, numberinthewild }));
  };

  const handleConservationStatusChange = (event) => {
    const conservationstatus= event.target.value;
    setSpecies((species) => ({ ...species, conservationstatus }));
  };

  //A function to handle the post request
  const postSpecies = (newSpecies) => {
    return fetch("http://localhost:4000/api/species", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpecies),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.addSpecies(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postSpecies(species);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Common Name</label>
        <input
          type="text"
          id="add-common-name"
          placeholder="Common Name"
          required
          value={species.commonname}
          onChange={handleCommonNameChange}
        />
        <label>Scientific Name</label>
        <input
          type="text"
          id="add-scientific-name"
          placeholder="Genus species"
          required
          value={species.scientificname}
          onChange={handleScientificNameChange}
        />
        <label>Number in the Wild</label>
        <input
          type="text"
          id="add-number-in-the-wild"
          placeholder="Population size"
          required
          value={species.numberinthewild}
          onChange={handleNumberInTheWildChange}
        />
        {/*  */}
        <label>Conservation Status</label>
        <input
          type="text"
          id="add-conservation-status"
          placeholder="Conservation Status Code"
          required
          value={species.conservationstatus}
          onChange={handleConservationStatusChange}
        />
      </fieldset>
      <button type="submit">Add</button>
    </form>
    
  );
};

export default SpeciesForm;
