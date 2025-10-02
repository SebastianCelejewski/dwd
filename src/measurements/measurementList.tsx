import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router";

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { dateToString } from "../utils/dateUtils";
import { valueImagePaths, valueDescriptions } from "../utils/descriptions";

const client = generateClient<Schema>();

function MeasurementList() {
  const [measurements, setMeasurements] = useState<Array<Schema["Measurement"]["type"]>>([]);
  let navigate = useNavigate();

  useEffect(() => {
    client.models.Measurement.observeQuery().subscribe({
      next: (data) => setMeasurements([...data.items]),
    });
  }, []);

  function createMeasurement() {
    console.log("Creating new measurement")
    
    const newMeasurement = {
      dateTime: new Date().toISOString(),
      value: 3,
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
	  <ul className="entryList">
	    {measurements.map(measurement => {
        const inputElementId = "id-{measurement.id}"
        const valueImagePath = valueImagePaths[measurement.value]
        const valueDescription = valueDescriptions[measurement.value]

        return <li
                  className="entryListElement"
                  onClick={() => showMeasurement(measurement.id)}
                  key={measurement.id}>
              <p><span className="measurementDateTime">{dateToString(measurement.dateTime)}</span><span className="measurementValue"><img src={valueImagePath} alt={valueDescription}/></span></p>
              <p className="measurementComment">{measurement.comment}</p>
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