import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router";

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function EntryList() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  let navigate = useNavigate();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Nowy pomiar"),
      isDone: true
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({id})
  }

  function showTodo(id: string) {
    const navLink = `/entries/${id}`
    navigate(navLink)
  }

  return (
  	<>
	  <ul>
	    {todos.map(todo => {
        const inputElementId = "id-{todo.id}"
        return <>
            <li 
              onClick={() => showTodo(todo.id)}
              key={todo.id}>
              {todo.content}
            </li>
            <input type="checkbox" id={inputElementId} name={inputElementId} value={todo.isDone}/>
            <label htmlFor={inputElementId}> Completed</label>
          </>
        }
	   )}
	  </ul>
	  <button onClick={createTodo}>+</button>
	  <nav>
    	<NavLink to="/entries/new" end>Add entry</NavLink>
      </nav>
    </>
  );

}

export default EntryList;