import type { Schema } from "../../amplify/data/resource";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { generateClient } from "aws-amplify/data";
import { valueImagePaths, valueDescriptions } from "../utils/descriptions";

const client = generateClient<Schema>();

function MeasurementAdd() {
    const currentDateTimeUTC = new Date()
    const timeZoneOffset = currentDateTimeUTC.getTimezoneOffset()
    const currentDateTimeLocal = new Date(currentDateTimeUTC.getTime() - timeZoneOffset * 60 * 1000)
    const currentDateTime = currentDateTimeLocal.toISOString().split(".")[0]

    const navigate = useNavigate();

    const [measurementDateTime, setMeasurementDateTime] = useState(currentDateTime);
    const [measurementValue, setMeasurementValue] = useState(0);
    const [measurementComment, setMeasurementComment] = useState("");

    function handleMeasurementValueChange(e: any) {
        console.log(e)
        setMeasurementValue(e.target.value);
    }

    function handleMeasurementCommentChange(e: any) {
        setMeasurementComment(e.target.value);
    }

      function handleMeasurementDateTimeChange(e: any) {
          setMeasurementDateTime(e.target.value)
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const newMeasurement = {
            dateTime: new Date(measurementDateTime).toISOString(),
            value: measurementValue,
            comment: measurementComment
        }

        console.log("Request: " + JSON.stringify(newMeasurement))
        const result = client.models.Measurement.create(newMeasurement);

        result.then(returnedData => {
            console.log("Response: " + JSON.stringify(returnedData))
            navigate("/measurements")
        })
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
                <p><textarea id="measurementComment" className="newMeasurementTextArea" rows={5} onChange={handleMeasurementCommentChange}/></p>
            </div>
            <button type="submit">Dodaj</button>
        </form>
    
        <nav>
            <NavLink to="/measurements" end>Powrót na listę pomiarów</NavLink>
        </nav>
    </>
}

export default MeasurementAdd;
