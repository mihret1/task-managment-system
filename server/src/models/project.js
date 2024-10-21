
const mongoose=require('mongoose')


const taskSchema=new mongoose.Schema({
        title: {
            type: String,
            required: true
          },
        desc:String,
        deadline:Date,
        startDate:Date,
        status:{
            type:Number,
            default:0
        },
          issues: {
            type: [String],  
            default: []
        },
        taskImage:String,

},{timestamps:true})

// const taskModel=mongoose.model('Task',taskSchema)

const projectSchema= new mongoose.Schema({
    title:String,
    desc:String,
    projectImage:String,
    deadline:Date,
    startDate:Date,
    status: {
        type: String,
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

    projectTasks:{
        type:[taskSchema],
        default:[]
    },
    creator:String
    // projectTask:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     default:[],
    //     ref:'Task'
    // }]

},{timestamps:true})

const projectModel=mongoose.model('Projects',projectSchema)
module.exports=projectModel