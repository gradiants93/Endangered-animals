import { useState, useEffect } from "react";

const IndividualsDropDown = (prop) => {
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/individuals")
      .then((response) => response.json())
      .then((individuals) => {
        setIndividuals(individuals);
      });
  }, []);

  //Listing Individuals
  return (
    <div>
      <select onChange={prop.handleIndividualNickname} required>
        {individuals.map((individual) => (
          <option value={individual.id} key={individual.id}>
            {individual.nickname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IndividualsDropDown;