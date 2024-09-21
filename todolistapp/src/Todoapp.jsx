import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todoapp() {
    let [todos, setTodo] = useState([{ task: "sample-task", id: uuidv4(), isDone: false }]);
    let [newtodos, setNewTodos] = useState("");

    let addTodo = () => {
        setTodo((prevTodo) => {
            return [...prevTodo, { task: newtodos, id: uuidv4(), isDone: false }];
        });
        setNewTodos(""); 
    }

    let updatedTodo = (event) => {
        setNewTodos(event.target.value);
    };

    let deletetodo = (id) => {
        setTodo(todos.filter((todo) => todo.id !== id));
    }

    let markasdone = (id) => {
        setTodo((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: true
                    };
                }
                return todo;
            });
        });
    }

    let uppercaseall = () => {
        setTodo((prevTodos) => {
            return prevTodos.map((todo) => {
                return { ...todo, task: todo.task.toUpperCase() };
            });
        });
    }

    return (
        <>
            <input 
                type="text" 
                placeholder="Write work todo..." 
                value={newtodos} 
                onChange={updatedTodo} 
            />
            <br /><br />
            <button onClick={addTodo}>Add work</button>
            <h4>Todo App</h4>
            <hr />
            <ul>
                {
                    todos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>
                                    {todo.task}
                                </span>
                                &nbsp;&nbsp;&nbsp;
                                <button onClick={() => deletetodo(todo.id)}>Delete</button>
                                <button onClick={() => markasdone(todo.id)}>MarkAsDone</button>
                            </li>
                        );
                    })
                }
            </ul>
            <button onClick={uppercaseall}>UpperCaseAll</button>
        </>
    );
}
