const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const neighborhoodNb = require('../model/neighborhood.mode')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');
const data = require('./data')

const areaData = [
    { key: 'Khilkhat', value: 17 },
    { key: 'Kuril', value: 17 },
    { key: 'Kuratoli', value: 17 },
    { key: 'Kutli', value: 17 },
    { key: 'Alipara (partial)', value: 17 },
    { key: 'Jagannathpur', value: 17 },
    { key: 'Nikunj-1', value: 17 },
    { key: 'TanparaUttara Model Town 1', value: 1 },
    { key: 'Sector No. 10', value: 1 },
    { key: 'Abdullahpur', value: 1 },
    { key: 'Purakrai', value: 1 },
    { key: 'Shailpur', value: 1 },
    { key: 'Section-12', value: 2 },
    { key: 'Block-A', value: 2 },
    { key: 'Block-B', value: 2 },
    { key: 'Block-C', value: 2 },
    { key: 'Block-D', value: 2 },
    { key: 'Block-E', value: 2 },
    { key: 'Block-T', value: 2 },
    { key: 'Block-D', value: 2 },
    { key: 'Shailpur', value: 3 },
    { key: 'Shailpur', value: 3 },
    { key: 'Section-10', value: 3 },
    { key: 'Block-C', value: 3 },
    { key: 'Block-D', value: 3 },
    { key: 'Section-11', value: 3 },
    { key: 'Block-C', value: 3 },
    { key: 'Avenue-3', value: 3 },
    { key: 'Section-13', value: 4 },
    { key: 'Section13', value: 4 },
    { key: 'Tinsed', value: 4 },
    { key: 'Bishteki', value: 4 },
    { key: 'Section-15', value: 4 },
    { key: 'Section-11', value: 5 },
    { key: 'Block-A', value: 5 },
    { key: 'Block-B', value: 5 },
    { key: 'Block-C', value: 5 },
    { key: 'Block-D', value: 5 },
    { key: 'Pallavi', value: 6 },
    { key: 'New Pallavi', value: 6 },
    { key: 'Harunabad', value: 6 },
    { key: 'Arifabad', value: 7 },
    { key: 'Chayanid', value: 7 },
    { key: 'Sujatnagar', value: 7 },
    { key: 'Section-II', value: 8 },
    { key: 'Block-A', value: 8 },
    { key: 'Block-B', value: 8 },
    { key: 'Block-C', value: 8 },
    { key: 'Block-D', value: 8 },
];

//Get all Neighborhood
router.get('/',async (req,res)=>{
    console.log('Hit /workforce-registration')
    neighborhoodNb.find({})
    .then((neighborhood)=>res.json(neighborhood))
    .catch((err)=>res.json(err))
})

//Create A Neighborhood
router.post('/',async (req,res)=>{
    console.log(data)
    try {
        // console.log(req.body)
        const neighborhood = new neighborhoodNb({areaCollection:areaData})
        console.log(neighborhood)
        await neighborhood.save()
        res.status(201).json(neighborhood)
      } catch (err) {
        console.log(err)
        res.status(404).json('Neighborhood Not Created')
    
      }
})
//Get specific Workforce Registration
// router.get('/:wrokforceId',async (req,res)=>{
//     console.log("Get Hit")
//     const id = req.params.wrokforceId
//     console.log('My ID:',id)
//     try{
//         var validId = mongoose.Types.ObjectId.isValid(id)
//         // console.log('IsValid:',validId)
//         if(validId){
//             const workforce = await workforceRegistration.findById({_id:id})
//             if(workforce){
//                 res.status(200).json(workforce);
//             }else{
//                 res.status(404).json({error:'Workforce Not Found'})
//             }
//         }else{
//             res.status(404).json({error:'Not a Valid ID'})
//         }
//     }catch(err){
//         // console.log(err)
//         res.status(500).json({error:'Workforce not Create || Error Occur'})
//     }
// })

// //Update a Workforce Registration
// router.put('/:workforceId',async (req,res)=>{
//     const id = req.params.workforceId
//     try{
//         var validId = mongoose.Types.ObjectId.isValid(id)
//         if(validId){
//            const sts = await workforceRegistration
//            .findByIdAndUpdate({ _id: id }, {
//                 fullName: req.body.fullName,
//                 jobTitle: req.body.jobTitle,
//                 paymentPerHour: req.body.paymentPerHour,
//                 contactInfo: req.body.contactInfo,
//                 assignedRoute: req.body.assignedRoute,        
//               })
//             res.status(201).json(sts)
//         }else{
//             res.status(404).json({error:'Not a Valid ID'})
//         }
//     }catch(err){
//         // console.log(err)
//         res.status(500).json({error:'Workforce not Create || Error Occur'})
//     }
// })
// //Delete a Workforce Registration
// router.delete('/:workforceId',async (req,res)=>{
//     const id = req.params.workforceId;
//     const workforceId = await neighborhoodNb.findById({_id:id})
//     console.log(id)
//     console.log('Workforce:',workforceId)
//     if(workforceId){
//         try{
//            await neighborhoodNb
//            .findByIdAndDelete({_id:id})
//             res.status(201).json(workforceId)
//         }catch(err){
//             // console.log(err)
//             res.status(500).json({error:'Workforce Not Deleted || Error Occur'})
//         }
//     }else{
//         res.status(404).json({error:'Workforce Not Found'})
//     }
// })

module.exports = router