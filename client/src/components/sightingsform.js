import { useState } from "react";

const SightingsForm = (props) => {
  const [sightings, setSightings] = useState({
    datetime: "",
    location: "",
    health: "",
    email: "",
    individualseen: "",
  });
  // mock data here
  const individualOptions = [{nickname: "twosie", id: 2}, {nickname: "onesie", id: 1}]

  //create functions that handle the event of the user typing into the form
  const handleDateTimeChange = (event) => {
    const datetime = event.target.value;
    setSightings((sightings) => ({ ...sightings, datetime }));
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSightings((sightings) => ({ ...sightings, location }));
  };

  const handleHealthChange = (event) => {
    const health = event.target.value;
    setSightings((sightings) => ({ ...sightings, health }));
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setSightings((sightings) => ({ ...sightings, email }));
  };

  const handleIndividualChange = (event) => {
    const individualseen = event.target.value;
    setSightings((sightings) => ({ ...sightings, individualseen }));
  };
  
  //A function to handle the post request
  const postSightings = (newSighting) => {
    return fetch("http://localhost:4000/api/sightings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSighting),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.addSighting(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postSightings(sightings);
  };

  return (
    <form onSubmit={handleSubmit} >
      <fieldset>
      <div>

        <label>Date / Time</label>
        <input
          type="datetime-local"
          id="add-date-time"
          required
          value={sightings.datetime}
          onChange={handleDateTimeChange}
        />
        <br></br>
        <label>Location</label>
        <input
          type="text"
          id="add-location"
          placeholder="Location sighted"
          required
          value={sightings.location}
          onChange={handleLocationChange}
        />
        <br></br>
        <label>Individual Seen</label>
        <select onChange={handleIndividualChange}
          id="add-individual"
          required
        >
            {individualOptions.map((option, index) => (
                <option key={index} value={option.id}>{option.nickname}</option>
            ))}
        </select>
<fieldset>
        <label>Health Status</label>
        <br></br>
        <input
          type="radio"
          id="add-true"
          name="health"
          value={true}
          onClick={handleHealthChange}
        />
        <label htmlFor="add-true">Healthy</label>
        <input
          type="radio"
          id="add-false"
          name="health"
          value={false}
          onClick={handleHealthChange}
        />
        <label htmlFor="add-false">Unhealthy</label>
        {/* <input
          type="radio"
          id="add-NULL"
          name="health"
          value={NULL}
          onClick={handleHealthChange}
        />
        <label htmlFor="add-NULL">Unknown</label> */}
        </fieldset>
        <label>Email</label>
        <input
          type="text"
          id="add-email"
          placeholder="Email for contact"
          required
          value={sightings.email}
          onChange={handleEmailChange}
        />

      </div>
      </fieldset>
      
      <button type="submit">Add</button>
    </form>
  );
};

export default SightingsForm;
