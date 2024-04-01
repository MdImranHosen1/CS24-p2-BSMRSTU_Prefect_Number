const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport");
const saltRounds = 10;
// require("../config/passport");
const authenticate = require('../middleware/authenticate');
const User = require('../model/user.other.model')
const Role = require('../model/role.model')


//Get All Available Roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find()
    res.status(201).json(roles)
  } catch (err) {
    // console.log(err)
    res.send(404).json({
      'Error': 'Error Occur On Get all User'
    })
  }
})


//Get specific Roles
router.get('/roles/:roleId/', async (req, res) => {
  const id = req.params.roleId
  console.log('My ID:', id)
  try {
    var validId = mongoose.Types.ObjectId.isValid(id)
    // console.log('IsValid:',validId)
    if (validId) {
      const role = await Role.findById({ _id: id })
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ error: 'Role Not Found' })
      }
    } else {
      res.status(404).json({ error: 'Not a Valid ID' })
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({ error: 'Role not Create || Error Occur' })
  }
})



//Create Roles
router.post('/rabc/roles', async (req, res) => {
  try {
    // console.log(req.body)
    const newRole = new Role(req.body)
    await newRole.save()
    res.status(201).json(newRole)
  } catch (err) {
    console.log(err)
    res.status(404).json('Role Not Created')

  }
})

//Update Specific User
router.put('/roles/:roleId', (req, res) => {
  const id = req.params.roleId
  Role.findByIdAndUpdate({ _id: id }, {
    // roleId: req.body.roleId,
    roleName: req.body.roleName,
    roleDetails: req.body.roleDetails,
    roleAssign: req.body.roleAssign
  })
    .then(role => res.json(role))
    .catch(err => res.json(err))
})



//Delete Specific User
router.delete('/roles/:roleId', (req, res) => {
  const id = req.params.roleId;
  Role.findByIdAndDelete({ _id: id })
    .then(role => res.json(role))
    .catch(err => res.json(err))
})


//1.Get All Users
// router.get('/',async (req,res)=>{
//     // res.send('Get All User.')
//     // res.statusCode = 201
//     try{
//         const user = await User.find({})
//         res.send(201).json(user)
//     }catch(err){
//         // console.log(err)
//         res.send(404).json({
//             'Error':'Error Occur On Get all User'
//         })
//     }

// })

router.get('/', authenticate, async (req, res) => {
  console.log('Passport Hit....')
  await User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//Create New User
router.post('/', authenticate, async (req, res) => {
  // try {
  //   console.log(req.body)
  //   const newUser = new User(req.body)
  //   await newUser.save()
  //   res.status(201).json(newUser)
  // } catch (err) {
  //   console.log(err)
  //   res.status(404).json('User Not Created')

  // }
  const { userName, userPassword, userRoles, userType, userPhone, userEmail, stsOrLandfillNum } = req.body;
  if (!userName && userName.trim() === "" && !userPassword && userPassword.trim() === "" &&
    !userRoles && userRoles.trim() === "" && !userType && userType.trim() === "" &&
    !userPhone && userPhone.trim() === "" && !userEmail && userEmail.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ userEmail });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  let newUser
  try {
    bcrypt.hash(req.body.userPassword, saltRounds, async (err, hash) => {
      newUser = new User({
        userName,
        userPassword: hash,
        userRoles,
        userType,
        userPhone,
        userEmail,
        stsOrLandfillNum
      })
      await newUser.save();
      res.status(201).json({ newUser });
    })
  } catch (err) {
    return console.log(err);
  }
})
//Get Specific User
router.get('/:userId', authenticate, async (req, res) => {
  console.log('User ID Hit....')
  try {
    var cond = mongoose.Types.ObjectId.isValid(req.params.userId)
    if (cond) {
      const user = await User.findById({ _id: req.params.userId });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(404).json({ error: 'User ID is not Valid' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }

  // User.findById({_id:id})
  // .then(user=>res.json(user))
  // .catch(err=>res.json(err))
})

//Update Specific User
router.put('/:userId', authenticate, (req, res) => {
  const id = req.params.userId
  User.findByIdAndUpdate({ _id: id }, {
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    userRoles: req.body.userRoles,
    userType: req.body.userType,
    userPhone: req.body.userPhone,
    userEmail: req.body.userEmail,
    stsOrLandfillNum: existingUser.stsOrLandfillNum
  })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
//Delete Specific User
router.delete('/:userId', authenticate, (req, res) => {
  console.log('Delete Hit...')
  const id = req.params.userId;
  User.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//Update Role of Specific User
router.put('/:userId/roles', (req, res) => {

})


module.exports = router