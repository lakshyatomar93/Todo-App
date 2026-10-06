import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { FaEdit } from "react-icons/fa"
import { MdOutlineAutoDelete } from "react-icons/md"
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todos")) || []
    setTodos(savedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleEdit = (e, id) => {
    let t = todos.filter(items => items.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(items => {
      return items.id !== id
    })

    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(items => {
      return items.id !== id
    })

    setTodos(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim().length <= 3) return

    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todo: todo.trim(),
        iscomplete: false
      }
    ])

    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name

    let index = todos.findIndex(items => {
      return items.id === id
    })

    let newTodos = [...todos]
    newTodos[index].iscomplete = !newTodos[index].iscomplete

    setTodos(newTodos)
  }

  const toggleFinished = () => {
    setshowfinished(!showfinished)
  }

  return (
    <>
      <div className="min-h-screen w-full bg-gray-400">

        <Navbar />

        <div className="w-full px-4 py-6 sm:px-6 md:px-8">

          <div className="mx-auto w-full max-w-xl">

            {/* Main Card */}
            <div className="rounded-2xl bg-gray-500 p-4 shadow-lg sm:p-6">

              {/* Heading */}
              <div className="mb-5 text-center">
                <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
                  iTask - Manage your todos at one place
                </h1>
              </div>

              {/* Add Todo */}
              <div className="mb-4">
                <span className="font-bold text-lg">
                  Add a Todo
                </span>
              </div>

              {/* Input + Button */}
              <div className="flex w-full flex-col gap-2 sm:flex-row">

                <input
                  onChange={handleChange}
                  value={todo}
                  type="text"
                  placeholder="Enter your task"
                  className="w-full rounded-3xl border-none bg-white px-4 py-2 outline-none sm:flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAdd()
                    }
                  }}
                />

                <button
                  onClick={handleAdd}
                  disabled={todo.length <= 3}
                  className="w-full rounded-3xl bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  Save
                </button>

              </div>

              {/* Show Finished */}
              <div className="mt-5 flex items-center gap-2">
                <input
                  onChange={toggleFinished}
                  checked={showfinished}
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                />

                <h3 className="text-sm font-medium sm:text-base">
                  Show Finished
                </h3>
              </div>

              {/* Divider */}
              <div className="my-5 h-px w-full bg-gray-300"></div>

              {/* Todos Heading */}
              <div>
                <h1 className="text-xl font-bold">
                  Your Todos
                </h1>
              </div>

              {/* Empty Todos */}
              {todos.length === 0 && (
                <div className="py-8 text-center text-gray-700">
                  No Todos to display
                </div>
              )}

              {/* Todo List */}
              <div className="mt-3 space-y-2">

                {todos.map(items => {

                  return (
                    (showfinished || !items.iscomplete) && (

                      <div
                        key={items.id}
                        className="flex w-full items-center justify-between gap-3 rounded-xl bg-gray-400 p-3"
                      >

                        {/* Todo text */}
                        <div className="flex min-w-0 flex-1 items-center gap-2">

                          <input
                            name={items.id}
                            onChange={handleCheckbox}
                            type="checkbox"
                            checked={items.iscomplete}
                            className="h-4 w-4 shrink-0 cursor-pointer"
                          />

                          <p
                            className={`break-words text-sm sm:text-base ${
                              items.iscomplete
                                ? "line-through text-gray-600"
                                : ""
                            }`}
                          >
                            {items.todo}
                          </p>

                        </div>

                        {/* Buttons */}
                        <div className="flex shrink-0 gap-1">

                          <button
                            onClick={(e) => handleEdit(e, items.id)}
                            className="rounded-xl bg-gray-800 p-2 text-white transition hover:bg-gray-700"
                            aria-label="Edit todo"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={(e) => handleDelete(e, items.id)}
                            className="rounded-xl bg-gray-800 p-2 text-white transition hover:bg-red-700"
                            aria-label="Delete todo"
                          >
                            <MdOutlineAutoDelete />
                          </button>

                        </div>

                      </div>

                    )
                  )
                })}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default App