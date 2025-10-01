import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Route } from "./+types/home";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export async function loader({ params }: Route.LoaderArgs) {
  console.log("/src/entries/AddEntry/loader()")
  console.log("params: " + JSON.stringify(params))
  return product;
}

function EntryDetails({loaderData}: Route.ComponentProps) {
	console.log("/src/entries/AddEntry/AddEntry()")
	console.log("loaderData: " + JSON.stringify(loaderData))
	const params = useParams();
	console.log("params: " + JSON.stringify(params))
	const entryId = params["id"]
	console.log("entryId: " + entryId)

	const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

	useEffect(() => {
	    client.models.Todo.observeQuery().subscribe({
	      next: (data) => setTodos([...data.items]),
	    });
	  }, []);

	console.log(JSON.stringify(todos))

	const entry = todos[entryId]

	return <>
		<p>Entry details</p>
		<nav>
    		<NavLink to="/entries" end>Back</NavLink>
      	</nav>
	</>
}

const entries = [
  {
    key: 0,
    date: "2025-09-27 15:38",
    value: 2,
    comment: "elemele-dutki"
  },
  {
    key: 1,
    date: "2025-09-28 5:38",
    value: 6,
    comment: "trele-morele"
  }
];

export default EntryDetails;
