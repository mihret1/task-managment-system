const {createProject,getOneProject,getProjects,deleteProject,updatedProject,createTask,updateTask,deleteTask,getOneTask,getTasks}=require('../controllers/project')

const express=require('express')
const router=express.Router()


router.get('/project',getProjects)
router.post('/project',createProject)
router.route('/project/:id')
       .get(getOneProject)
       .delete(deleteProject)
       .put(updatedProject)

router.get('/task',getTasks)       
router.route('/project/:id/task/:taskId')
       .get(getOneTask)
       .post(createTask)
       .put(updateTask)
       .delete(deleteTask)


module.exports=router       