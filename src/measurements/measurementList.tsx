import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router";

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function MeasurementList() {
  const [measurements, setMeasurements] = useState<Array<Schema["Measurement"]["type"]>>([]);
  let navigate = useNavigate();

  useEffect(() => {
    client.models.Measurement.observeQuery().subscribe({
      next: (data) => setMeasurements([...data.items]),
    });
  }, []);

  function currentDateAndTime() {
      const d = new Date()
      const date = d.toISOString().split('T')[0];
      const time = d.toTimeString().split(' ')[0];
      return `${date} ${time}`
  }
  
  function createMeasurement() {
    console.log("Creating new measurement")
    
    const newMeasurement = {
      dateTime: new Date().toISOString(),
      value: 5,
      comment: window.prompt("Nowy pomiar")
    }

    console.log("newMeasurement: " + JSON.stringify(newMeasurement))

    var result = client.models.Measurement.create(newMeasurement);

    console.log("New measurement request sent")

    result.then(returnedData => {
      console.log("Returned data: " + JSON.stringify(returnedData))
    })
  }

  function showMeasurement(id: string) {
    const navLink = `/measurements/${id}`
    navigate(navLink)
  }

  return (
  	<>
	  <ul class="entryList">
	    {measurements.map(measurement => {
        const inputElementId = "id-{measurement.id}"
        console.log("Measurement: " + JSON.stringify(measurement))
        return <li
                  class="entryListElement"
                  onClick={() => showTodo(measurement.id)}
                  key={measurement.id}>
              <p>Data: {measurement.date}</p>
              <p>Wartość: {measurement.value}</p>
              <p>Komentarz: {measurement.comment}</p>
            </li>
        }
	   )}
	  </ul>
	  <button onClick={createMeasurement}>+</button>
	  <nav>
    	<NavLink to="/measurements/new" end>Dodaj nowy pomiar</NavLink>
      </nav>
    </>
  );

}

export default MeasurementList;