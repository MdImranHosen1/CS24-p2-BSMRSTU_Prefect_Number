const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const billGenerationbySts = require('../model/bill.generation.by.sts.model')
const thirdPartyContractor = require('../model/thirdparty.contractor.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');


// Create a bill generation by STS
router.post('/', async (req, res) => {
  try {
    const { thirdPartyId, totalCollected, payPerTon, finePerTon } = req.body;

    console.log("Okkkk")
    console.log(thirdPartyId)
    console.log(totalCollected)
    console.log(payPerTon)
    console.log(finePerTon)

    const contractor = await thirdPartyContractor.findById({_id:thirdPartyId})
    const wasteRequiredPerDay = contractor.wasteRequiredPerDay;
    console.log("Required Waste:",wasteRequiredPerDay)
    // Calculate basicPay
    const basicPay = totalCollected * payPerTon;

    // Calculate deficit and ensure it's non-negative
    const deficit = Math.max(0, wasteRequiredPerDay - totalCollected );

    console.log(deficit)
    // Calculate payWithoutFine
    const payWithoutFine =basicPay- deficit * finePerTon;

    // Create a new billGenerationbySts instance
    const newBillGenerationBySTS = new billGenerationbySts({
      thirdPartyId,
      totalCollected,
      payPerTon,
      finePerTon,
      requiredAmount: wasteRequiredPerDay,
      basicPay,
      payWithoutFine
    });

    // Save the bill generation data
    await newBillGenerationBySTS.save();

    res.status(201).json(newBillGenerationBySTS);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




//update bill
// Create a bill generation by STS
router.put('/:billId', async (req, res) => {
    try {
      const { thirdPartyId, totalCollected, payPerTon, finePerTon } = req.body;
      console.log(thirdPartyId)
      console.log(totalCollected)
      console.log(payPerTon)
      console.log(finePerTon)
  
      const contractor = await thirdPartyContractor.findById({_id:thirdPartyId})
      const wasteRequiredPerDay = contractor.wasteRequiredPerDay;
      console.log("Required Waste:",wasteRequiredPerDay)
      // Calculate basicPay
      const basicPay = totalCollected * payPerTon;
  
      // Calculate deficit and ensure it's non-negative
      const deficit = Math.max(0, wasteRequiredPerDay - totalCollected );
  
      console.log(deficit)
      // Calculate payWithoutFine
      const payWithoutFine =basicPay- deficit * finePerTon;
  
      const bill = await billGenerationbySts
      .findByIdAndUpdate({ _id:req.params.billId  }, {
        thirdPartyId,
        totalCollected,
        payPerTon,
        finePerTon,
        requiredAmount: wasteRequiredPerDay,
        basicPay,
        payWithoutFine        
           // collectionArea: req.body.collectionArea,          
           // designatedSTS: req.body.designatedSTS         
         })
       res.status(201).json(bill)

      // Create a new billGenerationbySts instance
    //   const newBillGenerationBySTS = new billGenerationbySts({
    //     thirdPartyId,
    //     totalCollected,
    //     payPerTon,
    //     finePerTon,
    //     requiredAmount: wasteRequiredPerDay,
    //     basicPay,
    //     payWithoutFine
    //   });
  
      // Save the bill generation data
    //   await newBillGenerationBySTS.save();
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


//Create A Contractor Manager
// router.post('/',async (req,res)=>{
//     try {

//         // const {totalCollected, perTon, finePerTon } = req.body;

//         console.log(req.body)
//         const newbillGenerationbySts = new billGenerationbySts(req.body)
//         await newbillGenerationbySts.save()
//         res.status(201).json(newbillGenerationbySts)
//       } catch (err) {
//         console.log(err)
//         res.status(404).json('Contractor Manager Not Created')
    
//       }
// })

//Get all Contractor Manager
router.get('/',async (req,res)=>{
    console.log('Hit /contractor-manager')
    billGenerationbySts.find({})
    .then((billGenerationbySts)=>res.json(billGenerationbySts))
    .catch((err)=>res.json(err))
})

//Get Specific Contractor Manager
router.get('/:billId',async (req,res)=>{
    console.log("Get Hit")
    const id = req.params.billId
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const bill = await billGenerationbySts.findById({_id:id})
            if(bill){
                res.status(200).json(bill);
            }else{
                res.status(404).json({error:'Bill Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Bill not Create || Error Occur'})
    }
})

//Update a Contractor Manager
router.put('/:billId',async (req,res)=>{
    const id = req.params.billId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const bill = await billGenerationbySts
           .findByIdAndUpdate({ _id: id }, {
                fullName: req.body.fullName,
                email: req.body.email,
                contactNumberworkspaceSize: req.body.contactNumber,
                assignedContractorCompany: req.body.assignedContractorCompany,
                userName: req.body.userName,
                password: req.body.password,          
                // collectionArea: req.body.collectionArea,          
                // designatedSTS: req.body.designatedSTS         
              })
            res.status(201).json(bill)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Contractor Manager not Create || Error Occur'})
    }
})
//Delete a Contractor Manager
router.delete('/:billId',async (req,res)=>{
    const id = req.params.billId;
    const bill = await billGenerationbySts.findById({_id:id})
    console.log(id)
    console.log('Third Party Contractor:',bill)
    if(bill){
        try{
           await billGenerationbySts
           .findByIdAndDelete({_id:id})
            res.status(201).json(bill)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'Contractor Manager Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'Contractor Manager Not Found'})
    }
})

module.exports = router