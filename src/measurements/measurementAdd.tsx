import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { valueImagePaths, valueDescriptions } from "../utils/descriptions";

const client = generateClient<Schema>();

function MeasurementDetails() {
	const params = useParams();
	const measurementId = params["id"]

	const [measurement, setMeasurement] = useState<Schema["Measurement"]["type"]>();

	const currentDateTimeUTC = new Date()
	const timeZoneOffset = currentDateTimeUTC.getTimezoneOffset()
	const currentDateTimeLocal = new Date(currentDateTimeUTC.getTime() - timeZoneOffset * 60 * 1000)
	const currentDateTime = currentDateTimeLocal.toISOString().split(".")[0]

	let navigate = useNavigate();

	const [measurementDateTime, setMeasurementDateTime] = useState(currentDateTime);
	const [measurementValue, setMeasurementValue] = useState(0);
	const [measurementComment, setMeasurementComment] = useState("");

	function handleMeasurementValueChange(e) {
    	setMeasurementValue(e.target.value);
  	}

	function handleMeasurementCommentChange(e) {
    	setMeasurementComment(e.target.value);
  	}

  	function handleMeasurementDateTimeChange(e) {
  		setMeasurementDateTime(e.target.value)
  	}

	function handleSubmit(e) {
    	e.preventDefault();

  		const localMeasurementDateTime = Date.parse(measurementDateTime + "Z")
  		const timeZoneOffset = new Date().getTimezoneOffset()
  		const utcMeasurementDateTime = localMeasurementDateTime + timeZoneOffset * 60 * 1000;
  	
  		const newMeasurement = {
    		dateTime: new Date(measurementDateTime),
		    value: measurementValue,
    		comment: measurementComment
    	}

    	console.log("Request: " + JSON.stringify(newMeasurement))
    	var result = client.models.Measurement.create(newMeasurement);

	    result.then(returnedData => {
      		console.log("Response: " + JSON.stringify(returnedData))
      		navigate("/measurements")
    	})
  	}

  	function cancel() {
  		const navLink = `/measurements`
    	navigate(navLink)
  	}

	return <>
		<form onSubmit={handleSubmit}>
			<div className="entryDetails">
				<p className="label">Data i godzina pomiaru</p>
				<p><input
						id="measurementDateTime"
						aria-label="Date and time"
						type="datetime-local"
						defaultValue={measurementDateTime}
						onChange={handleMeasurementDateTimeChange}
					/></p>

				<p className="label">Poziom duszności</p>
				<div>
					<p><input type="radio" name="measurementValue" value="0" onChange={handleMeasurementValueChange} defaultChecked/>&nbsp;<img className="radioIcon" src={valueImagePaths[0]} alt={valueDescriptions[0]}/>&nbsp;<span>{valueDescriptions[0]}</span></p>
					<p><input type="radio" name="measurementValue" value="1" onChange={handleMeasurementValueChange}/>&nbsp;<img className="radioIcon" src={valueImagePaths[1]} alt={valueDescriptions[1]}/> <span>{valueDescriptions[1]}</span></p>
					<p><input type="radio" name="measurementValue" value="2" onChange={handleMeasurementValueChange}/>&nbsp;<img className="radioIcon" src={valueImagePaths[2]} alt={valueDescriptions[2]}/> <span>{valueDescriptions[2]}</span></p>
					<p><input type="radio" name="measurementValue" value="3" onChange={handleMeasurementValueChange}/>&nbsp;<img className="radioIcon" src={valueImagePaths[3]} alt={valueDescriptions[3]}/> <span>{valueDescriptions[3]}</span></p>
				</div>

				<p className="label">Okoliczności</p>
				<p><textarea id="measurementComment" className="newMeasurementTextArea" rows="5" onChange={handleMeasurementCommentChange}></textarea></p>
			</div>
			<button type="submit">Dodaj</button>
		</form>
	
		<nav>
	  		<NavLink to="/measurements" end>Powrót na listę pomiarów</NavLink>
		</nav>
	</>
}

export default MeasurementDetails;
