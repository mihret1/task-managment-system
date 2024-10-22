
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
            type:String,
            default:'pending'
        },
        teamMembers:{
          type:[String],
          default:[]
      },
      taskImage:String,


       },{timestamps:true})


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

      teamMembers:{
        type:[String],
        default:[]
        
    },

    projectTasks:{
        type:[taskSchema],
        default:[]
    },
    creator:String,
      
    projectIssue:{
            type:[String],
            default:[]
    },
    projectSchedule:{
        type:[String],
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