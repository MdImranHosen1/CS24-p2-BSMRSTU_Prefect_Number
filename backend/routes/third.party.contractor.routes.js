const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const thirdPartyContractor = require('../model/thirdparty.contractor.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all Third Party Contrator
router.get('/',async (req,res)=>{
    console.log('Hit /third-party-contractor')
    thirdPartyContractor.find({})
    .then((thirdPartyContractor)=>res.json(thirdPartyContractor))
    .catch((err)=>res.json(err))
})

//Create A Third Party Contractor
router.post('/',async (req,res)=>{
    try {
        // console.log(req.body)
        const newThirdPartyContractor = new thirdPartyContractor(req.body)
        await newThirdPartyContractor.save()
        res.status(201).json(newThirdPartyContractor)
      } catch (err) {
        console.log(err)
        res.status(404).json('Third Party Contractor Not Created')
    
      }
})
//Get specific Third Party Contractor
router.get('/:tpcID',async (req,res)=>{
    console.log("Get Hit")
    const id = req.params.tpcID
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const tpc = await thirdPartyContractor.findById({_id:id})
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
           const sts = await thirdPartyContractor
           .findByIdAndUpdate({ _id: id }, {
                companyName: req.body.companyName,
                contractID: req.body.contractID,
                registrationID: req.body.registrationID,
                registrationDate: req.body.registrationDate,
                tin: req.body.tin,
                workspaceSize: req.body.workspaceSize,
                payment: req.body.payment,
                wasteRequiredPerDay: req.body.wasteRequiredPerDay,
                contractDuration: req.body.contractDuration,
                collectionArea: req.body.collectionArea,
                designatedSTS: req.body.designatedSTS,
          
                        
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
    const tpc = await thirdPartyContractor.findById({_id:id})
    console.log(id)
    console.log('Third Party Contractor:',tpc)
    if(tpc){
        try{
           await thirdPartyContractor
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