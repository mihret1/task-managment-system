
const express=require('express')
const app=express()

const projectModel =require('../models/project')


const createProject=async(req,res)=>{
    try{
        const fields=req.body
        const project= await projectModel.create({...fields,creator:req.userId})
        if(!project) return res.status(404).send('failed')
        res.status(200).json(project)
    }catch(error){
        res.status(500).json(error)
    }
}




const getProjects=async(req,res)=>{
    try{
        const projects = await projectModel.find()
        if(!projects) return res.status(400).send('no project')
        res.status(200).json(projects)

    }catch(error){
        res.status(500).json(error)
    }

}


const getOneProject=async(req,res)=>{
    try{
        const {id}=req.params
        const project= await projectModel.findById(id)
        if(!project) return res.status(400).send('failed')
        res.status(200).json(project)
    }catch(error){
        res.status(500).json(error)
    }
}




const deleteProject=async(req,res)=>{
     try{
        const deletedProject= await projectModel.findByIdAndDelete(req.params.id)
        if(!deletedProject) return res.status(400).send('no project')
        res.status(200).json({msg:"deleted",deletedProject})
     }catch(error){
        res.status(500).json(error)
     }
}


const updatedProject=async(req,res)=>{
    try{
        const fields=req.body
        const {id}=req.params
        const project= await projectModel.findById(id)
        if(!project) return res.status(400).send(' project not found')
        const newProject= await projectModel.findByIdAndUpdate(id,fields,{new:true})
        if(!newProject) return res.status(400).send('failed')
        res.status(200).json(newProject)
 
    }catch(error){
        res.status(500).json(error)

    }
}


    const createTask=async(req,res)=>{
        try{
            const {id} = req.params
            const field= req.body
            const project=await projectModel.findById(id)
            if(!project) return res.status(400).send('no project')
            
            project.projectTasks.push(field)
            await project.save()
            if(!project) return res.status(400).send('failed')
            res.status(200).json(project)

           }catch(error){
            res.status(500).json(error)
        }
    }


    const getOneTask=async(req,res)=>{
        try{
            const id=req.params.id
            const taskId =req.params.taskId
            const project=await projectModel.findById(id)
            if(!project) return res.status(400).send('no project')
            const task=  project.projectTasks.id(taskId)
            if (!task) return res.status(400).send('task')
            res.status(200).json(task)
        }catch(error){
            res.status(500).json(error)
        }
    }


    const getTasks=async(req,res)=>{

        try{
            const {id}=req.params
            const project = await projectModel.findById(id) 
            if(!project) return res.status(400).send('project not found')
            const tasks= project.projectTasks
            if(!tasks) return res.status(400).send('no tasks')
            res.status(200).json(tasks)

        }catch(error){
            res.status(500).json(error)


        }
           
    }


    const deleteTask=async(req,res)=>{
        try{
            const {id}=req.params
            const {taskId}=req.params

            const project= await projectModel.findById(id)
            if(!project) return res.status(400).send('project not found')

            const taskIndex = project.projectTasks.findIndex(task => task._id.toString() === taskId);
            if (taskIndex === -1) return res.status(400).send('Task not found');

            const task = project.projectTasks[taskIndex]; 
            project.projectTasks.splice(taskIndex, 1);

            await project.save()
            if(!project) return res.status(400).send('failed to deleted')
            res.status(200).json({msg:'this task is deleted',task})


        }catch(error){
            res.status(500).json(error.message)
        }
    }



    const updateTask=async(req,res)=>{
        try{
          const {id,taskId}=req.params
          const project= await projectModel.findById(id)
          if(!project) return res.status.send('project not found')
          const task= await project.projectTasks.id(taskId)
          if(!task)  return res.status.send('task  not found')
           
           Object.assign(task,req.body)
           await project.save()
           if(!project) return res.status(400).send('failed to update')
           res.status(200).json(project)

        }catch(error){
            res.status(500).json(error)
        }
    }



module.exports={createProject,getOneProject,getProjects,deleteProject,updatedProject,createTask,updateTask,deleteTask,getOneTask,getTasks}
