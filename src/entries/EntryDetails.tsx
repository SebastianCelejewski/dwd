import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Route } from "./+types/home";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function EntryDetails({loaderData}: Route.ComponentProps) {
	const params = useParams();
	const todoId = params["id"]

	const [todo, setTodo] = useState<Schema["Todo"]["type"]>();

	async function getTodo(todoId) {
		return await client.models.Todo.get({ id: todoId });			
	}

	if (todo == undefined) {
		getTodo(todoId).then((result) => {
			setTodo(result["data"])
		})
	}

	if (todo == undefined) {
		return <>
			<nav>
		  		<NavLink to="/entries" end>Back</NavLink>
			</nav>
		</>
	} else {
		return <>
			<p>Entry details</p>
			<p>{todo.content}</p>
			<input type="checkbox" id="completedCheckbox" name="completedCheckbox" value={todo.isDone}/>
			<label htmlFor="completedCheckbox"> Completed</label>

			<nav>
		  		<NavLink to="/entries" end>Back</NavLink>
			</nav>
		</>
	}
}

export default EntryDetails;
