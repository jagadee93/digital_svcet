const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd,email,className,status} = req.body;
    console.log(req?.body)
    if (status==="student" && !className) return res.status(400).json({"message":"class name is required"})
    if (!user || !pwd ||!email||!status) return res.status(400).json({ 'message': 'Username and password are required.' });
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const date=new Date()
        let d=date.toLocaleString()
        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "email": email,
            "className":className,
            "createdAt":d,
            "appprovedStatus":status==='teacher'?false:true
        });
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
module.exports = { handleNewUser };