const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassDetailSchema = new Schema({
    ApprovedStatus:{
        type:Boolean,
        default:false,
    },
    className:{
        type:String,
        lowercase:true,
        required:true,
    },
    roomNo:{
        type:String,
        required:false
    },
    ClassIncharge:{
        type:String,
    },
    addedBy:{
        name:{
            type:String,
        },
        id:{
            type:Schema.Types.ObjectId,
            ref:'user',
        }
    },
    table:{
        createdAt:{
            type:Date,
            default:() =>Date.now(),
            immutable:true
        },
        updatedAt:{
            type:Date,
            default:() =>Date.now()
        },
        periods: {
            type:[]
        },
    }
});

module.exports = mongoose.model('classTable', ClassDetailSchema);

