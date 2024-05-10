const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Landfill = require('../model/landfil.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all STS
router.get('/', async (req, res) => {
    console.log('Hit /landfill/ Not Transaction')
    Landfill.find({})
        .then((sts) => res.json(sts))
        .catch((err) => res.json(err))
})

//Create A LF
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newLf = new Landfill(req.body)
        await newLf.save()
        res.status(201).json(newLf)
    } catch (err) {
        console.log(err)
        res.status(404).json('Landill Not Created')

    }
})
//Get specific LF
router.get('/:lfId', async (req, res) => {
    const id = req.params.lfId
    console.log('My ID:', id)
    try {
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if (validId) {
            const lf = await Landfill.findById({ _id: id })
            if (lf) {
                res.status(200).json(lf);
            } else {
                res.status(404).json({ error: 'Lanfill Not Found' })
            }
        } else {
            res.status(404).json({ error: 'Not a Valid ID' })
        }
    } catch (err) {
        // console.log(err)
        res.status(500).json({ error: 'Landill not Create || Error Occur' })
    }
})

//Update a LF

router.put('/:lfId', async (req, res) => {
    const id = req.params.lfId
    try {
        const landfill = await Landfill.findByIdAndUpdate(
            { _id: id },
            {
                lfId: req.body.lfId,
                name: req.body.name,
                capacity: req.body.capacity,
                coordinate: req.body.coordinate,
                operationTimespan: req.body.operationTimespan,
                managerId: req.body.managerId,
            },
            { new: true } // to return the modified document
        );
        res.status(201).json(landfill);
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: "Landfill Not Updated."
        });
    }
});


// router.put('/:lfId', async (req, res) => {
//     const id = req.params.lfId
//     try {
//         const landfill = Landfill.findByIdAndUpdate({ _id: id }, {
//             lfId: req.body.lfId,
//             name: req.body.name,
//             capacity: req.body.capacity,
//             coordinate: req.body.coordinate,
//             operationTimespan: req.body.operationTimespan,
//             managerId: req.body.managerId,
//         })
//         res.status(201).json(landfill)
//     } catch (err) {
//         console.log(err)
//         res.status(403).json({
//             message: "Landfill Not Update."
//         })
//     }
// });

// router.put('/:lfId', async (req, res) => {
//     console.log("Update Landfill.")
//     const id = req.params.lfId
//     console.log(id)
//     try {
//         var validId = mongoose.Types.ObjectId.isValid(id)
//         if (validId) {
//             const lfill = await Landfill.findByIdAndUpdate({ _id: id }, {
//                 lfId: req.body.lfId,
//                 name: req.body.name,
//                 capacity: req.body.capacity,
//                 coordinate: req.body.coordinate,
//                 operationTimespan: req.body.operationTimespan,
//                 managerId: req.body.managerId,
//             })
//             res.status(201).json(lfill)
//         } else {
//             res.status(404).json({ error: 'Not a Valid ID' })
//         }
//     } catch (err) {
//         // console.log(err)
//         res.status(500).json({ error: 'Landfill not Create || Error Occur' })
//     }
// })
//Delete a vehicles
router.delete('/:lfId', async (req, res) => {
    const id = req.params.lfId;
    const lf = await Landfill.findById({ _id: id })
    console.log(id)
    console.log('Landfill:', lf)
    if (lf) {
        try {
            await Landfill.findByIdAndDelete({ _id: id })
            res.status(201).json(lf)
        } catch (err) {
            // console.log(err)
            res.status(500).json({ error: 'Landfill Not Deleted || Error Occur' })
        }
    } else {
        res.status(404).json({ error: 'Landfill Not Found' })
    }
})
//Get all transaction
// router.get('/transaction/',async (req,res)=>{
//     console.log('Hit /sts/transaction in Transaction')
//     StsTranaction.find({})
//     .then((stsToLf)=>res.json(stsToLf))
//     .catch((err)=>res.json(err))
// })

module.exports = router