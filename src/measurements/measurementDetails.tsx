import { useState } from "react";
import { NavLink, useParams } from "react-router";
// import type { Route } from "./+types/home";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { dateToString } from "../utils/dateUtils";
import { valueImagePaths, valueDescriptions } from "../utils/descriptions";

const client = generateClient<Schema>();

function MeasurementDetails() {
	const params = useParams();
	const measurementId = params["id"]

	const [measurement, setMeasurement] = useState<Schema["Measurement"]["type"]>();

	async function getMeasurement(measurementId) {
		return await client.models.Measurement.get({ id: measurementId });
	}

	if (measurement == undefined) {
		getMeasurement(measurementId).then((result) => {
			setMeasurement(result["data"])
		})
	}

	if (measurement == undefined) {
		return <>
			<nav>
		  		<NavLink to="/measurements" end>Powrót na listę pomiarów</NavLink>
			</nav>
		</>
	} else {
		console.log("measurement.date = " + measurement.dateTime)
		return <>
			<div className="entryDetails">
				<p className="label">Data i godzina pomiaru</p>
				<p>{dateToString(measurement.dateTime)}</p>

				<p className="label">Poziom duszności</p>
				<p>{valueDescriptions[measurement.value]}</p>
				<img src={valueImagePaths[measurement.value]} alt={valueDescriptions[measurement.value]}/>

				<p className="label">Okoliczności</p>
				<p>{measurement.comment}</p>
			</div>

			<nav>
		  		<NavLink to="/measurements" end>Powrót na listę pomiarów</NavLink>
			</nav>
		</>
	}
}

export default MeasurementDetails;
