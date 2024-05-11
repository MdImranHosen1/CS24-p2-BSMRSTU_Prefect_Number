const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const contractorManager = require('../model/contractor.manager.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all Contractor Manager
router.get('/',async (req,res)=>{
    console.log('Hit /contractor-manager')
    contractorManager.find({})
    .then((contractorManager)=>res.json(contractorManager))
    .catch((err)=>res.json(err))
})

//Create A Contractor Manager
router.post('/',async (req,res)=>{
    try {
        // console.log(req.body)
        const newContractorManager = new contractorManager(req.body)
        await newContractorManager.save()
        res.status(201).json(newContractorManager)
      } catch (err) {
        console.log(err)
        res.status(404).json('Contractor Manager Not Created')
    
      }
})
//Get Specific Contractor Manager
router.get('/:cmId',async (req,res)=>{
    console.log("Get Hit")
    const id = req.params.cmId
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const cm = await contractorManager.findById({_id:id})
            if(cm){
                res.status(200).json(cm);
            }else{
                res.status(404).json({error:'Contractor Manager Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Contractor Manager not Create || Error Occur'})
    }
})

//Update a Contractor Manager
router.put('/:cmId',async (req,res)=>{
    const id = req.params.cmId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){

    //         "fullName": fullName,
    //   "userId": userId,
    //   "email": email,
    //   "date": accountCreationDate,
    //   "contactNumber": contactNumber,
    //   "assignedContractorCompany": assignedContractorCompany,
    //   "accessLevel": accessLevel,
    //   "userName": username,
    //   "password": password,
           const cm = await contractorManager
           .findByIdAndUpdate({ _id: id }, {
                fullName: req.body.fullName,
                userId:req.body.userId,
                email: req.body.email,
                date: req.body.date,
                assignedContractorCompany: req.body.assignedContractorCompany,
                accessLevel: req.body.accessLevel,
                userName: req.body.userName,
                password: req.body.password,   
              })
            res.status(201).json(cm)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Contractor Manager not Create || Error Occur'})
    }
})
//Delete a Contractor Manager
router.delete('/:cmId',async (req,res)=>{
    const id = req.params.cmId;
    const cm = await contractorManager.findById({_id:id})
    console.log(id)
    console.log('Third Party Contractor:',cm)
    if(cm){
        try{
           await contractorManager
           .findByIdAndDelete({_id:id})
            res.status(201).json(cm)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'Contractor Manager Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'Contractor Manager Not Found'})
    }
})

module.exports = router