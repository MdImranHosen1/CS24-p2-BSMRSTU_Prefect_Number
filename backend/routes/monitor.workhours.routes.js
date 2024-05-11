const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const monitorWorkhours = require('../model/monitor.wrokhours.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all Employee Workhours
router.get('/',async (req,res)=>{
    console.log('Hit /monitor-workhours')
    monitorWorkhours.find({})
    .then((monitorWorkhours)=>res.json(monitorWorkhours))
    .catch((err)=>res.json(err))
})
//Get A Employee by EmployeeID
router.get('/employee/:id',async (req,res)=>{
    console.log('Hit /monitor-workhours')
    monitorWorkhours.find({})
    .then((monitorWorkhours)=>res.json(monitorWorkhours))
    .catch((err)=>res.json(err))
})

//Create A Employee Workhours Monitor
router.post('/',async (req,res)=>{
    try {
        // console.log(req.body)
        const newmonitor = new monitorWorkhours(req.body)
        await newmonitor.save()
        res.status(201).json(newmonitor)
      } catch (err) {
        console.log(err)
        res.status(404).json('Employee Workhours Not Created')
    
      }
})
//Get specific work monitor by specific ID
router.get('/:tpcID',async (req,res)=>{
    console.log("Get Hit")
    const id = req.params.tpcID
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const tpc = await monitorWorkhours.findById({_id:id})
            if(tpc){
                res.status(200).json(tpc);
            }else{
                res.status(404).json({error:'Third Party Contractor Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Third Party Contractor not Create || Error Occur'})
    }
})

//Update a Third Party Contractor
router.put('/:tpcId',async (req,res)=>{
    const id = req.params.tpcId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const sts = await monitorWorkhours
           .findByIdAndUpdate({ _id: id }, {
                companyName: req.body.companyName,
                contactNum: req.body.contactNum,
                workspaceSize: req.body.workspaceSize,
                wasteRequiredPerDay: req.body.wasteRequiredPerDay,
                payment: req.body.payment,
                contractDuration: req.body.contractDuration,          
                collectionArea: req.body.collectionArea,          
                designatedSTS: req.body.designatedSTS         
              })
            res.status(201).json(sts)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'STS not Create || Error Occur'})
    }
})
//Delete a Third Party Contractor
router.delete('/:tpcId',async (req,res)=>{
    const id = req.params.tpcId;
    const tpc = await monitorWorkhours.findById({_id:id})
    console.log(id)
    console.log('Third Party Contractor:',tpc)
    if(tpc){
        try{
           await monitorWorkhours
           .findByIdAndDelete({_id:id})
            res.status(201).json(tpc)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'Third Party Contractor Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'Third Party Contractor Not Found'})
    }
})

module.exports = router