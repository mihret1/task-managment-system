

const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
   
    try{
        const token=req.headers['authorization'].split(' ')[1]
        // const tokenn=req.header['x-access-token']
        const verfied=jwt.verify(token,'vintage')
        req.userId=verfied.id
    }catch(error){
        console.log(error)


    }
    next()

}

module.exports=auth