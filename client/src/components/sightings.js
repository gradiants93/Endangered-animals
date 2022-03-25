import { useState, useEffect } from "react";
import SightingsForm from "./sightingsform";

function Sightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
        setSightings(sightings);
      });
  }, []);

  const addSighting = (newSighting) => {

    setSightings((sightings) => [...sightings, newSighting]);
  };

  return (
    <div className="sightings">
      <h2> List of Sightings </h2>
      <ul>
        {sightings.map((sightings) => (
          <li key={sightings.id}>
            {" "}
            {sightings.datetime}{sightings.location}{sightings.individualseen}{sightings.health}{sightings.email}
          </li>
        ))}
      </ul>
      <SightingsForm addSighting={addSighting} />
    </div>
  );
}

export default Sightings;
