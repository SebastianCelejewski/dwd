import { useState } from "react";
import { NavLink, useParams } from "react-router";
// import type { Route } from "./+types/home";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
//import { dateToString } from "../utils/dateUtils";
import { valueImagePaths, valueDescriptions } from "../utils/descriptions";

const client = generateClient<Schema>();

function MeasurementDetails() {
	const params = useParams();
	const measurementId = params["id"]

	const [measurement, setMeasurement] = useState<Schema["Measurement"]["type"]>();

	const currentDateTime = new Date().toISOString().split(".")[0]
	console.log(currentDateTime)

	return <>
		<div className="entryDetails">
			<p class="label">Data i godzina pomiaru</p>
			<p><input aria-label="Date and time" type="datetime-local" defaultValue={currentDateTime}/></p>

			<p class="label">Poziom duszności</p>
			<div>
				<p><input type="radio" name="test" value="0"/>&nbsp;<img class="radioIcon" src={valueImagePaths[0]} alt={valueDescriptions[0]}/>&nbsp;<span>{valueDescriptions[0]}</span></p>
				<p><input type="radio" name="test" value="1"/>&nbsp;<img class="radioIcon" src={valueImagePaths[1]} alt={valueDescriptions[1]}/> <span>{valueDescriptions[1]}</span></p>
				<p><input type="radio" name="test" value="2"/>&nbsp;<img class="radioIcon"src={valueImagePaths[2]} alt={valueDescriptions[2]}/> <span>{valueDescriptions[2]}</span></p>
				<p><input type="radio" name="test" value="3"/>&nbsp;<img class="radioIcon"src={valueImagePaths[3]} alt={valueDescriptions[3]}/> <span>{valueDescriptions[3]}</span></p>
			</div>

			<p class="label">Okoliczności</p>
			<p><textarea className="newMeasurementTextArea" rows="5"></textarea></p>

		</div>
		<nav>
	  		<NavLink to="/measurements" end>Powrót na listę pomiarów</NavLink>
		</nav>
	</>
}

export default MeasurementDetails;
