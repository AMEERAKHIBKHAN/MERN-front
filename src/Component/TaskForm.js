import React from 'react'

const TaskForm = ({createTask,name,handleInputChange,edit,updateTask}) => {
    
  return (
    <form className='task-form' onSubmit={edit ?updateTask:createTask}>
      <input type='text' placeholder='add a task' name='name' value={name} onChange={handleInputChange}/>
      
          <button type='submit'>{edit ? "edit":"add"}</button>
    </form>
  )
}

export default TaskForm
