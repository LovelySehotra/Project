import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoItem({ todo }) {
    const [isTodoEditable,setIsTodoEditable] =useState(false)
    const [todoMsg,setTodoMsg] = useState(todo.todo)
    const{ updateTodo,deleteTodo,toggleComplete} = useTodo()

    const editTodo =()=>{
        updateTodo(todo.id,{...todo,todo:todoMsg})
           
           setIsTodoEditable(false)
    }
    const toggleCompleted =()=>{
        toggleComplete(todo.id)
    }


    return (
       <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${ todo.complete ? "bg-[#D8E2DC]" : "bg-[#F0F4F7]"} `}>
        <input 
        type='checkbox'
        className='cursor-pointer'
        checked={todo.complete}
        onChange={toggleCompleted}

        />
        <input
        type='text'
        className={`border outline-none  w-full bg-transparent rounded-lg
        ${isTodoEditable?"border-black/10 px-2" : "border-transparent" }
        ${todo.complete?"line-through":""}`}

        value={todoMsg}
        onChange={(e)=>setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        />
        <button className=' w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 '
        onClick={()=>{
            if(todo.complete) return;
            if(isTodoEditable)
            {
                editTodo();
            }
            else setIsTodoEditable((prev)=>!prev)
        }}
        // disabled={todo.complete}
        >
            
        {isTodoEditable ? "📁" : "✏️"}       
        </button>
        <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>

       </div>
    );
}

export default TodoItem;
