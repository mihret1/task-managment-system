
const User =require('../models/user')
const bcrypt=require('bcrypt')   
const jwt =require('jsonwebtoken')
const Signup=async(req,res)=>{   
    try{
        const {email,name,password}=req.body
        const userExist=await User.findOne({email})
        if(userExist) return res.status(400).send('email dont already exist')

        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const user= await User.create({email,name,password:hashedPassword}) 
        if(!user) return res.status(400).send('failed')
        const token= await jwt.sign({id:user._id,email:user.email},'vintage',{expiresIn:940})   
        res.status(200).json({user,token})    

        
    }catch(error){
        res.status(500).json(error)

    }
}


const Login=async(req,res)=>{
    try{
         const {email,password}=req.body
         const user=await User.findOne({email})
         if(!user) return res.status(400).send('email dont exist')

        const matched=await bcrypt.compare( password,user.password )
        if(!matched) return res.status(400).send('password or email not correct')
        const token=await jwt.sign({id:user._id,email:user.email},'vintage',{expiresIn:940})    
        res.status(200).json({msg:'loged In',user,token})
        
    }catch(error){
        res.status(500).json(error)
    }
}

module.exports={Login,Signup}