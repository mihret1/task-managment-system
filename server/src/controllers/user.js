
const User =require('../models/user')

const signup=async(req,res)=>{   
    try{
        const {email,name,password}=req.body
        const user=await User.findOne({email})

    }catch(error){

    }
}