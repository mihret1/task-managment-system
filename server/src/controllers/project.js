
const mongoose=require('mongoose')


const taskSchema=new mongoose.Schema({
        taskImage:String,
        title: {
            type: String,
            required: true
          },
        desc:String,
        deadline:Date,
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default:'pending'
          },
          issues: {
            type: [String],  
            default: []
  }
},{timestamps:true})

// const taskModel=mongoose.model('Task',taskSchema)

const projectSchema= new mongoose.Schema({
    title:String,
    desc:String,
    projectImage:String,
    deadline:Date,
    status:{
        type:Number,
        default:0
    },
    projectIssue:{
            type:[String],
            default:[]
    },
    teamMembers:{
        type:[String],
        default:[]
        
    },
    projectSchedule:{
        type:[String],
        default:[]
        
    },

    projectTask:{
        type:[taskSchema],
        default:[]
    },
    
    // projectTask:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     default:[],
    //     ref:'Task'
    // }]

},{timestamps:true})

const projectModel=mongoose.model('Projects',projectSchema)
module.exports=projectModel