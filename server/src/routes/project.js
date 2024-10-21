const {createProject,getOneProject,getProjects,deleteProject,updatedProject,createTask,updateTask,deleteTask,getOneTask,getTasks}=require('../controllers/project')
const auth=require('../middleware/auth')
const express=require('express')
const router=express.Router()



router.get('/project',getProjects)
router.post('/project',auth,createProject)
router.route('/project/:id')
       .get(getOneProject)
       .delete(auth,deleteProject)
       .put(auth,updatedProject)

       

router.get('/project/:id/task',getTasks) 
router.post('/project/:id/task',createTask)       
router.route('/project/:id/task/:taskId')
       .get(getOneTask)
       .put(updateTask)
       .delete(deleteTask)


module.exports=router       