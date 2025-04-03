import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
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

  function Todo(todo: Todo) {
    return <>
            <li 
              onClick={() => deleteTodo(todo.id)}
              key={todo.id}>
              {todo.content}
            </li>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" checked={todo.isDone}/>
            <label for="vehicle1"> I have a bike</label>
          </>
  }

  return (
    <main>
      <h1>Duszności Wczesnej Dorosłości</h1>
      <ul>
        {todos.map(todo => Todo(todo))}
      </ul>
      <button onClick={createTodo}>+</button>
    </main>
  );
}

export default App;
