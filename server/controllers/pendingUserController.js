const User=require("../model/User")

const apiGetAllPendingUsers=async(req,res) =>{
    console.log("hey im here in the pending page")
    const users = await User.find({'appprovedStatus':false}).exec();
    if (!users) return res.status(204).json({"message":"no pending Teachers found"});
    console.log(users)
    res.json(users)
}


const apiApproveUser=async(req,res) =>{
    const user=await User.findOne({_id:req?.body?.userId})
    console.log(req?.body?.userId,"user id from approve")
    if(!user) return res.status(401).json({"message":"user not found"})
    user.appprovedStatus=true;
    user.roles.Teacher=1984;
    const result =await user.save();
    console.log(result)
    return res.status(200).json({"message":"user updated"})
}
const apiDeleteUser=async(req,res)=>{
   console.log(req.params.id)   
    const result=User.deleteOne({_id:req.params.id})
    console.log(result)
    return res.status(200).json({"message":"user success fully deleted"})
}


module.exports={apiGetAllPendingUsers,apiApproveUser,apiDeleteUser}




