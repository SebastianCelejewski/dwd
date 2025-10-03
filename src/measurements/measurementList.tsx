import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

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
        const navLink = `/measurements/new`
        navigate(navLink)
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
                        <div>
                            <p className="measurementDateTime">{dateToString(measurement.dateTime)}</p>
                            <p><span className="measurementValue"><img src={valueImagePath} alt={valueDescription}/></span></p>
                            <p className="measurementComment">{measurement.comment}</p>
                            <div style={{clear: 'both'}}/>
                        </div>
                      </li>
                }
	          )}
	      </ul>
        <button onClick={createMeasurement}>+</button>
    </>
  );
}

export default MeasurementList;