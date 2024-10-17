
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const URL='mongodb://localhost/task_managment_system'

require('dotenv').config()
const PORT=process.env.PORT || 4000


app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{res.send('hello')})

mongoose.connect(URL)
        .then(()=>{
            app.listen((PORT),()=>{
                console.log(`database connected and backend run on ${PORT}`)
            })
        })
        .catch((error)=>{
            console.log(error)
        })