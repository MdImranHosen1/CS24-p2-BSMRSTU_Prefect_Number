const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const LandfillBill = require('../model/landfill.bill.model')
const authenticateSTS = require('../middleware/authenticate.sts')

//Get all Vehicle Transaction to Landfill
router.get('/',async (req,res)=>{
    LandfillBill.find({})
    .then((stsToLf)=>res.json(stsToLf))
    .catch((err)=>res.json(err))
})

//Create A Vehicle Transaction to Landfill
router.post('/', async (req,res)=>{
    try {
        console.log(req.body)
        const newBill = new LandfillBill(req.body)
        await newBill.save()
        res.status(201).json(newBill)
      } catch (err) {
        console.log(err)
        res.status(404).json('Landfill bill Not Created')
      }
})
//Get specific Vehicle Transaction To Landfill
router.get('/:billId',async (req,res)=>{
    console.log("hit /:billId")
    const id = req.params.billId
    console.log('ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const bill = await LandfillBill.findById({_id:id})
            if(bill){
                res.status(200).json(bill);
            }else{
                res.status(404).json({error:'No Entry Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Not Create any Bill || Error Occur'})
    }
})

//Update Vehicle Transaction to Landfil
router.put('/:billId',async (req,res)=>{
    const id = req.params.billId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const stsTolf = await 
           LandfillBill.findByIdAndUpdate({ _id: id }, {
                vtId: req.body.vtId,
                vId: req.body.vId,
                stsId: req.body.stsId,
                weightWaste: req.body.weightWaste,
                arrivalTime: req.body.arrivalTime,            
                departureTime: req.body.departureTime,            
                totalFuelCost: req.body.totalFuelCost,            
              })
            res.status(201).json(stsTolf)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Entry Not Update || Error Occur'})
    }
})
//Delete a Vehicle Transaction to Landfil
router.delete('/:billId',async (req,res)=>{
    const id = req.params.billId;
    const bill = await LandfillBill.findById({_id:id})
    if(bill){
        try{
            await LandfillBill.findByIdAndDelete({_id:id})
            res.status(201).json(bill)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'Entry Not Found'})
    }
})

module.exports = router