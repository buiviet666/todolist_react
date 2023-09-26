import React, { useState } from 'react'
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

uuidv4();

export const TodoWrapper = () => {

    const [todos, setTodo] = useState([]);
    const addTodo = todo => {
        setTodo([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
        console.log(todos);
    }
    const toggleComplete = id => {
        setTodo(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }
    const toggleDelete = id => {
        setTodo(todos.filter(todo => todo.id !== id));
    }
    const toggleEdit = id => {
        setTodo(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    }
    const editTask = (task, id) => {
        setTodo(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    }

    return (
        <div className='TodoWrapper'>
            <h1>To do list :D</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, idx) => (
                todo.isEditing ? (
                    <EditTodoForm toggleEdit={editTask} task={todo} />
                ) : (
                    <Todo task={todo} key={idx} toggleComplete={toggleComplete} toggleDelete={toggleDelete} toggleEdit={toggleEdit} />
                )

            ))}
        </div>
    )
}
