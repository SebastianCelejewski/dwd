import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Route } from "./+types/home";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { dateToString } from "../utils/dateUtils";
import { valueImagePaths, valueDescriptions } from "../utils/descriptions";

const client = generateClient<Schema>();

function MeasurementDetails() {
	const params = useParams();
	const measurementId = params["id"]

	const [measurement, setMeasurement] = useState<Schema["Measurement"]["type"]>();

	const currentDateTime = new Date().toISOString().split(".")[0]
	console.log(currentDateTime)

	return <div className="entryDetails">
		<label>Data i godzina pomiaru</label>
		<p><input aria-label="Date and time" type="datetime-local" defaultValue={currentDateTime}/></p>

		<label>Poziom duszności</label>
		<p>
			<div className="verticalRadio"><input type="radio" name="test" value="small"/><span>{valueDescriptions[0]}</span><img src={valueImagePaths[0]} alt={valueDescriptions[0]}/></div>
			<div className="verticalRadio"><input type="radio" name="test" value="small"/><span>{valueDescriptions[1]}</span><img src={valueImagePaths[1]} alt={valueDescriptions[1]}/></div>
			<div className="verticalRadio"><input type="radio" name="test" value="small"/><span>{valueDescriptions[2]}</span><img src={valueImagePaths[2]} alt={valueDescriptions[2]}/></div>
			<div className="verticalRadio"><input type="radio" name="test" value="small"/><span>{valueDescriptions[3]}</span><img src={valueImagePaths[3]} alt={valueDescriptions[3]}/></div>
		</p>

		{[0,1,2,3].forEach(idx => {
			const imagePath = valueImagePaths[idx]
			console.log("Image " + idx + ": " + imagePath)
			return <p><img src="/src/assets/dyspnoeaNone.png"></img></p>
		})}


		<label>Okoliczności</label>
		<p><textarea></textarea></p>

		<nav>
	  		<NavLink to="/measurements" end>Powrót na listę pomiarów</NavLink>
		</nav>
	</div>
}

export default MeasurementDetails;
