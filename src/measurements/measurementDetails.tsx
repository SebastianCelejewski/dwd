import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Route } from "./+types/home";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function MeasurementDetails({loaderData}: Route.ComponentProps) {
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
		return <div class="entryDetails">
			<p>{measurement.date}</p>
			<p>{measurement.value}</p>
			<p>{measurement.comment}</p>

			<nav>
		  		<NavLink to="/measurements" end>Powrót na listę pomiarów</NavLink>
			</nav>
		</div>
	}
}

export default MeasurementDetails;
