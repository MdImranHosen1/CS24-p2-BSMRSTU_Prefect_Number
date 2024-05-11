const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const workforceRegistration = require('../model/workforce.registration.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all Workforce Registration
router.get('/',async (req,res)=>{
    console.log('Hit /workforce-registration')
    workforceRegistration.find({})
    .then((workforceRegistration)=>res.json(workforceRegistration))
    .catch((err)=>res.json(err))
})

//Create A Workforce Registration
router.post('/',async (req,res)=>{
    try {
        // console.log(req.body)
        const newWorkforce = new workforceRegistration(req.body)
        console.log(newWorkforce)
        await newWorkforce.save()
        res.status(201).json(newWorkforce)
      } catch (err) {
        console.log(err)
        res.status(404).json('Workforce Registration Not Created')
    
      }
})
//Get specific Workforce Registration
router.get('/:wrokforceId',async (req,res)=>{
    console.log("Get Hit")
    const id = req.params.wrokforceId
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const workforce = await workforceRegistration.findById({_id:id})
            if(workforce){
                res.status(200).json(workforce);
            }else{
                res.status(404).json({error:'Workforce Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Workforce not Create || Error Occur'})
    }
})

//Update a Workforce Registration
router.put('/:workforceId',async (req,res)=>{
    const id = req.params.workforceId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const sts = await workforceRegistration
           .findByIdAndUpdate({ _id: id }, {
                fullName: req.body.fullName,
                jobTitle: req.body.jobTitle,
                paymentPerHour: req.body.paymentPerHour,
                contactInfo: req.body.contactInfo,
                assignedRoute: req.body.assignedRoute,        
              })
            res.status(201).json(sts)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Workforce not Create || Error Occur'})
    }
})
//Delete a Workforce Registration
router.delete('/:workforceId',async (req,res)=>{
    const id = req.params.workforceId;
    const workforceId = await workforceRegistration.findById({_id:id})
    console.log(id)
    console.log('Workforce:',workforceId)
    if(workforceId){
        try{
           await workforceRegistration
           .findByIdAndDelete({_id:id})
            res.status(201).json(workforceId)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'Workforce Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'Workforce Not Found'})
    }
})

module.exports = router