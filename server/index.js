
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const URL='mongodb://localhost/task_managment_system'
const projectRoute=require('./src/routes/project')
const userRoute=require('./src/routes/user')

require('dotenv').config()
const PORT=process.env.PORT || 4000


app.use(cors())
app.use(express.json({  limit: "200mb" }))
app.use(express.urlencoded({ extended: true, limit: "200mb" }))
app.get('/',(req,res)=>{res.send('hello')})
app.use('/',projectRoute)
app.use('/user',userRoute)

mongoose.connect(URL)
        .then(()=>{
            app.listen((PORT),()=>{
                console.log(`database connected and backend run on ${PORT}`)
            })
        })
        .catch((error)=>{
            console.log(error)
        })


        