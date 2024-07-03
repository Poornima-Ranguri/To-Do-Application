import React, {useState, useEffect} from 'react'
import './Todos.css'

function Todos() {
  const [todoList, setTodoList] = useState([])
  const [userInput, setUserInput] = useState('')
  const [todosCount, setTodosCount] = useState(0)

  useEffect(() => {
    const storedTodoList = localStorage.getItem('todoList')
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList))
    }
  }, [])

  const onTodoStatusChange = (checkboxId, labelId, todoId) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.uniqueNo === todoId) {
        todo.isChecked = !todo.isChecked
      }
      return todo
    })
    setTodoList(updatedTodoList)
  }

  const onDeleteTodo = todoId => {
    const updatedTodoList = todoList.filter(todo => todo.uniqueNo !== todoId)
    setTodoList(updatedTodoList)
  }

  const createAndAppendTodo = todo => {
    const todoElement = (
      <li key={todo.uniqueNo} className="todo-item-container d-flex flex-row">
        <input
          type="checkbox"
          id={`checkbox${todo.uniqueNo}`}
          checked={todo.isChecked}
          onChange={() =>
            onTodoStatusChange(
              `checkbox${todo.uniqueNo}`,
              `label${todo.uniqueNo}`,
              todo.uniqueNo,
            )
          }
        />
        <div className="label-container d-flex flex-row">
          <label
            className="checkbox-label"
            htmlFor={`checkbox${todo.uniqueNo}`}
            id={`label${todo.uniqueNo}`}
          >
            {todo.text}
          </label>
          <div className="delete-icon-container">
            <i
              className="far fa-trash-alt delete-icon"
              onClick={() => onDeleteTodo(todo.uniqueNo)}
            />
          </div>
        </div>
      </li>
    )
    return todoElement
  }

  const onAddTodo = () => {
    const userInputValue = userInput.trim()
    if (userInputValue === '') {
      alert('Enter Valid Text')
      return
    }
    const newTodo = {
      text: userInputValue,
      uniqueNo: todosCount + 1,
      isChecked: false,
    }
    setTodoList([...todoList, newTodo])
    setTodosCount(todosCount + 1)
    setUserInput('')
  }

  return (
    <div className="todos-bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="todos-heading">Todos</h1>
            <h1 className="create-task-heading">
              Create <span className="create-task-heading-subpart">Task</span>
            </h1>
            <input
              type="text"
              id="todoUserInput"
              className="todo-user-input"
              placeholder="What needs to be done?"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            />
            <button
              className="add-todo-button"
              id="addTodoButton"
              onClick={onAddTodo}
            >
              Add
            </button>
            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container" id="todoItemsContainer">
              {todoList.map(todo => createAndAppendTodo(todo))}
            </ul>
            <button
              className="button"
              id="saveTodoButton"
              onClick={() =>
                localStorage.setItem('todoList', JSON.stringify(todoList))
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todos
