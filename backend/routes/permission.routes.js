const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const authenticate = require('../middleware/authenticate');
const Permission = require('../model/permission.model')



// Create Permission
router.post('/', async (req, res) => {
  try {
    const newPermission = new Permission(req.body)
    await newPermission.save()
    res.status(201).json(newPermission)

  } catch (err) {
    // console.log(err)
    res.status(404).json('Permission Not Created')

  }
})

router.get('/:permissionId', async (req, res) => {
  console.log("req.params.permissionId", req.params.permissionId); // Logging the parameter value

  try {
    var cond = mongoose.Types.ObjectId.isValid(req.params.permissionId);

    if (cond) {
      const permission = await Permission.findById(req.params.permissionId);

      if (permission) {
        res.status(200).json(permission); // Corrected to send 'permission' instead of 'user'
      } else {
        res.status(404).json({ error: 'Permission not found' });
      }
    } else {
      res.status(404).json({ error: 'Permission ID is not valid' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//Get All Available Permission
router.get('/', async (req, res) => {
  try {
    const permission = await Permission.find()
    console.log('Get Routes.')
    res.status(201).json(permission)
  } catch (err) {
    // console.log(err)
    res.send(404).json({
      'Error': 'Error Occur On Get Permission'
    })
  }
})


//Update Specific Permission
router.put('/:permissionId', (req, res) => {
  const id = req.params.permissionId
  Permission.findByIdAndUpdate({ _id: id }, {
    name: req.body.name,
    details: req.body.details,
  })
    .then(permission => res.json(permission))
    .catch(err => res.json(err))
})
//Delete Specific User
router.delete('/:permissionId', (req, res) => {
  const id = req.params.permissionId;
  Permission.findByIdAndDelete({ _id: id })
    .then(permissions => res.json(permissions))
    .catch(err => res.json(err))
})

module.exports = router


