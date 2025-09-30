import { useEffect, useState } from "react";

import { NavLink } from "react-router";

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function EntryList() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

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

  return (
  	<>
	  <ul>
	    {todos.map(todo => <>
	          <li 
	            onClick={() => deleteTodo(todo.id)}
	            key={todo.id}>
	            {todo.content}
	          </li>
	          <input type="checkbox" id="vehicle1" name="vehicle1" value={todo.isDone}/>
	          <label htmlFor="vehicle1"> I have a bike</label>
	      </>
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