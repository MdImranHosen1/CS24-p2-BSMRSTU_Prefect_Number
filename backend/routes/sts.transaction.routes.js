const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const StsTranaction = require('../model/sts.transaction.model')
const authenticateSTS = require('../middleware/authenticate.sts')

//Get all Vehicle Transaction to Landfill
// router.get('/', authenticateSTS, async (req, res) => {
router.get('/', async (req, res) => {

    console.log("/sts/transaction/ is hit")
    const stsNum = req.body.stsNum;
    await StsTranaction.find({ stsNum: stsNum })
        .then((StsTranaction) => res.json(StsTranaction))
        .catch((err) => res.json(err))
})

//Create A Vehicle Transaction to Landfill
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newStsToLf = new StsTranaction(req.body)
        await newStsToLf.save()
        res.status(201).json(newStsToLf)
    } catch (err) {
        console.log(err)
        res.status(404).json('STS transaction Not Created')
    }
})
//Get specific Vehicle Transaction To Landfill
router.get('/:toLfId', async (req, res) => {
    console.log("hit /:toLfId")
    const id = req.params.toLfId
    console.log('ID:', id)
    try {
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if (validId) {
            const stsTolf = await StsTranaction.findById({ _id: id })
            if (stsTolf) {
                res.status(200).json(stsTolf);
            } else {
                res.status(404).json({ error: 'No Entry Found' })
            }
        } else {
            res.status(404).json({ error: 'Not a Valid ID' })
        }
    } catch (err) {
        // console.log(err)
        res.status(500).json({ error: 'Not Create any Entry to LF || Error Occur' })
    }
})

//Update Vehicle Transaction to Landfil
router.put('/:toLfId', async (req, res) => {
    const id = req.params.toLfId
    try {
        var validId = mongoose.Types.ObjectId.isValid(id)
        if (validId) {
            const stsTolf = await
                StsTranaction.findByIdAndUpdate({ _id: id }, {
                    stsNum: req.body.stsNum,
                    lfNum: req.body.lfNum,
                    vehRegNum: req.body.vehRegNum,
                    weightWaste: req.body.weightWaste,
                    arrivalTime: req.body.arrivalTime,
                    departureTime: req.body.departureTime,
                    travelDistance: req.body.travelDistance,
                })
            res.status(201).json(stsTolf)
        } else {
            res.status(404).json({ error: 'Not a Valid ID' })
        }
    } catch (err) {
        // console.log(err)
        res.status(500).json({ error: 'Entry Not Update || Error Occur' })
    }
})
//Delete a Vehicle Transaction to Landfil
router.delete('/:toLfId', async (req, res) => {
    const id = req.params.toLfId;
    const stsTolf = await StsTranaction.findById({ _id: id })
    if (stsTolf) {
        try {
            await StsTranaction.findByIdAndDelete({ _id: id })
            res.status(201).json(stsTolf)
        } catch (err) {
            // console.log(err)
            res.status(500).json({ error: 'Not Deleted || Error Occur' })
        }
    } else {
        res.status(404).json({ error: 'Entry Not Found' })
    }
})

module.exports = router