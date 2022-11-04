const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique:true,
        required: true,
        lowercase:true,
    },
    className:{
        type:String,
        lowercase:true,
        required:false,
    },
    email:{
        type:String,
        lowercase:true,
    },
    roles: {
        Student: {
            type: Number,
            default: 2001
        },
        Teacher: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    appprovedStatus:{
        type:Boolean,
        default:true,
    },
    teacher:{
        timeTable:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"tables"
        },
        periods:{
            type:[]
        }
        
    },
    createdAt:{
        type:String,
        default:() =>Date.now()
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);