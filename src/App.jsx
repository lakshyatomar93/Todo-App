import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdOutlineAutoDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }, [])


  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(items => items.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(items => {
      return items.id !== id;
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(items => {
      return items.id !== id;
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscomplete: false }])
    setTodo("")
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(items => {
      return items.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscomplete = !newTodos[index].iscomplete
    setTodos(newTodos)
    savetoLS()
  }

  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }

  return (
    <>
      <div className="container flex flex-col justify-center gap-5 ">
        <Navbar />
        <div className="todos w-screen justify-center flex items-center flex-col">
          <div className="todo bg-gray-500 w-100 p-3 rounded-3xl">
            <div className='justify-center flex'>
              <h1 className='font-bold text-xl'>iTask - Manage your todos at one place</h1>
            </div>
            <div className='flex justify-start flex-col'>
              <span className='font-bold text-lg'>Add a Todo</span>
            </div>
            <div className='text-[#736c6c]'>
              <input onChange={handleChange} value={todo} type="text" placeholder='Enter your tasks' className='w-75 rounded-3xl border-none outline-none bg-white px-3' />
              <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-gray-800 mx-2 w-15 rounded-3xl text-[#736c6c] cursor-pointer'>Save</button>
            </div>
            <div className='mt-6 flex gap-3'>
              <input onClick={toggleFinished} type="checkbox" name="hello" checked={showfinished} id="" className='w-4' />
              <h3>Show Finished</h3>
            </div>
            <div className='flex justify-center my-3'>
              <div className='w-80 bg-gray-300 h-px '></div>
            </div>
            <div className="">
              <h1 className='font-bold text-xl'>Your Todos</h1>
            </div>
            {todos.length == 0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(items => {
              return (showfinished || !items.iscomplete) && (<div key={items.id} className='flex justify-between items-center gap-5 my-1'>
                <div className='flex gap-1'>
                  <input name={items.id} onChange={handleCheckbox} type="checkbox" checked={items.iscomplete} className='w-4' id='' />
                  <p className={items.iscomplete ? "line-through" : ""}>{items.todo}</p>
                </div>
                <div>
                  <button onClick={(e) => { handleEdit(e, items.id) }} className='bg-gray-800 p-2 rounded-2xl mx-1  cursor-pointer'><FaEdit />
                  </button>
                  <button onClick={(e) => { handleDelete(e, items.id) }} name={items.id} className='bg-gray-800 p-2 rounded-2xl cursor-pointer'><MdOutlineAutoDelete /></button>
                </div>
              </div>)
            })}
          </div>
        </div>
        {/* Width the not fixed */}
        {/* <div className="todos w-screen  justify-center flex items-center flex-col flex-wrap">
        <div className="todo bg-gray-500 w-[35vw] p-3 rounded-3xl">
          <div className='justify-center flex'>
        <h1 className='font-bold text-xl'>iTask - Manage your todos at one place</h1>
          </div>
        <div  className='flex justify-start flex-col'>
        <span className='font-bold text-lg'>Add a Todo</span>
        </div>
        <div className='text-[#736c6c]'>
          <input type="text" placeholder='Enter your tasks' className='w-[80%] rounded-3xl border-none outline-none bg-white px-3' />
          <button className='bg-gray-800 mx-2 w-15 rounded-3xl text-[#736c6c] cursor-pointer'>Save</button>
        </div>
        <div className='mt-6 flex gap-3'>
          <input type="checkbox" name="hello" id="" className='w-4' />
          <h3>Show Finished</h3>
        </div>
        <div className='flex justify-center my-3'>
        <div className='w-[85%] bg-gray-300 h-px '></div>
        </div>
        <div className="">
          <h1 className='font-bold text-xl'>Your Todos</h1>
        </div>
        </div>
      </div> */}
      </div>
    </>
  )
}

export default App
