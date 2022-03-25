import { useState, useEffect } from "react";
import SightingsForm from "./sightingsform";

function Sightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
        setSightings(sightings);
        console.log(sightings)
      });
  }, []);

  const addSighting = (newSighting) => {
    setSightings((sightings) => [...sightings, newSighting]);
  };
  function boolToStr(input) {
      if(input === true) {
          return "healthy";
      } else if (input === false) {
          return "unhealthy";
      }
  }

  return (
    <div className="sightings">
      <h2> List of Sightings </h2>
      <ul>
        {sightings.map((sighting) => (
          <li key={sighting.id}>
            {" "}
            <strong>Date and Time:</strong> {sighting.datetime} <strong>Location:</strong> {sighting.locations} <strong>Individual Sighted:</strong> {sighting.nickname} <strong>Heath status:</strong> {boolToStr(sighting.health)} Contact Email: {sighting.email}
          </li>
        ))}
      </ul>
      <SightingsForm addSighting={addSighting} />
    </div>
  );
}

export default Sightings;
