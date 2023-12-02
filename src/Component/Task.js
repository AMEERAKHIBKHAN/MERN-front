import React from 'react'
import {FaEdit,FaCheckDouble,FaRegTrashAlt} from 'react-icons/fa'
const Task = ({ele,index,deleteTask,getSingleTask,setToComplete}) => {
  return (
    <div className={ele.completed ? "task completed":"task"}>
      <p>
        <b>{index+1}.</b>
        {ele.name}
      </p>
     <div className='task-icons'>
        <FaCheckDouble color="green" onClick={()=>{
            setToComplete(ele)
        }}/>
        <FaEdit  color="purple" onClick={()=>{
            getSingleTask(ele)
        }}/>
        <FaRegTrashAlt  color="red" onClick={()=>{
            deleteTask(ele._id)
        }}/>
     </div>

    </div>
  )
}

export default Task
