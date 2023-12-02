import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { toast } from 'react-toastify'
import axios from 'axios'
import { URL } from '../App'
import loader from '../assets/loader.gif'

const TaskList = () => {
    const [formData,setFormData] =useState({
        name:"",
        completed:"false"
    })
    const [isediting,setIsEditing]=useState(false)
    const [taskId,setTaskId]=useState("")
    const [completedTasks,setCompletedTasks]=useState([])
    const[isloading,setIsLoading]=useState(false)
    const [tasks,setTasks]=useState([])
    const {name}=formData;
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,name : value})
    }
    const createTask= async(e)=>{
        e.preventDefault();
        if(name === ""){
            return toast.error("input field can not be empty")
        }
        try {
          const success=  await axios.post(`${URL}/api/v1/tasks/`,formData)
            if(success){
                console.log(success.data)
                setFormData({...formData,name:""})
                toast.success(`task added ${success.status}`)
                getTasks()
            }
        } catch (error) {
            toast.error("error message")
            console.log(error)
        }
        console.log(formData)
    }

    const getTasks= async()=>{

        try {
            setIsLoading(true)
            const tasks= await axios.get(`${URL}/api/v1/tasks/`)
            const data= tasks.data;
           if(data){
           
            setTasks(data)
         setIsLoading(false)}
         
        } catch (error) {
            toast.error(error)
            setIsLoading(false)
        }  

    }
    useEffect(()=>{
    getTasks()
    },[])
    const deleteTask=async(id)=>{
        try {
            const response= await axios.delete(`${URL}/api/v1/tasks/${id}`)
            if(response){
                getTasks()
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getSingleTask=async(task)=>{
        try {
            setFormData({name:task.name,completed:false})
            setTaskId(task._id);
            setIsEditing(true);
        } catch (error) {
            toast.error(error)
        }
    }

    const updateTask=async(e)=>{
        e.preventDefault()
        if(name===""){
            return toast.error("input field can not be empty")
        }
        try {
            const response = await axios.put(`${URL}/api/v1/tasks/${taskId}`,formData)
            if(response){
                setFormData({...formData,name:""})
                setIsEditing(false)
                getTasks()
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const setToComplete=async(task)=>{
        const newFormData={
            name:task.name,
            completed:true
        }
        try {
            const response = await axios.put(`${URL}/api/v1/tasks/${task._id}`,newFormData)
            if(response){
                getTasks();
            }
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(()=>{
        const cTask = tasks.filter((task)=>{
            return task.completed === true;
        })
        setCompletedTasks(cTask)
    },[tasks])
  return (
    <div>
      <h2>Task Manger</h2>
    <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} edit={isediting} updateTask={updateTask}/>
    <div className='--flex-between --pb'>
       {tasks && (
        <>
        <p>
 <b>Total tasks:</b>{tasks.length}
 </p>
 <p>
 <b>completed tasks:</b>{completedTasks.length}
 </p>
        </>
 
       )

       }
    </div>
            <hr/>
            { isloading && (
                <div className='--flex-center'>
                    <img src={loader} alt='loader'/>
                    </div>
            ) }
            {!isloading && tasks.length !==0 ? (
                <>
                {tasks.map((ele,index)=>{
                   return <Task key={ele._id} ele={ele} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} setToComplete={setToComplete}/>
                })}
                </>
    
               
            ):(
                <>No tasks</>
            )
            }
    </div>
  )
}

export default TaskList
