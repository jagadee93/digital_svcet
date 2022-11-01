const classTable = require('../model/tables');
const getAllTables = async (req, res) => {
    const employees = await tables.find();
    if (!employees) return res.status(204).json({ 'message': 'No tables found.' });
    res.json(employees);
}

const createNewTable = async (req, res) => {
    console.log(req.body)
    if (!req?.body?.className || !req?.body?.classTeacher) return res.status(400).json({"message":"insufficient data"})
    try {
        const result = await classTable.create({
            className: req?.body?.className,
            roomNo: req?.body?.roomNo,
            ClassIncharge: req?.body?.classTeacher,
            addedBy:{
                name:req.body.user,
                id:req.body.id
            },
            table:{
                periods:req?.body?.table
            }
        });
       return  res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(405).json(err)
    }
}

const updateTable = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const table = await classTable.findOne({ _id: req.body.id }).exec();
    if (!table) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if(!table.table) return res.status(400).json({"message":"table does not exists"})
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteTable = async (req, res) => {
    console.log(req?.params?.id)
    if (!req?.params?.id) return res.status(400).json({ 'message': 'table ID required.' });

    const table = await classTable.findOne({ _id: req.params.id }).exec();
    console.log(table)
    if (!table) {
        return res.status(204).json({ "message": `No table matches ID ${req.body.id}.` });
    }
    const result = await classTable.deleteOne(); //{ _id: req.body.id }
    console.log(result)
    return res.json(result);
}

const getOneTable = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Table ID required.' });

    const Table = await classTable.findOne({ className: req.params.id }).exec();
    if (!Table) {
        return res.status(204).json({ "message": `No table found for  ${req.params.id}.` });
    }
    res.json(Table);
}


const getAllPendingTimetables=async(req,res) =>{
    const tables=await classTable.find().where({ApprovedStatus:false}).exec();
    if(!tables) return res.status(200).json({"message":"no pending timetables found"})
    res.json(tables)
}

module.exports = {getAllTables,getOneTable,updateTable,deleteTable,createNewTable,getAllPendingTimetables}