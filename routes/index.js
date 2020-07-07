const express = require('express');
const Users = require('../models/Users');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const {username, password} = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new Users({
      username,
      password: hash
    });
  
    const promise = user.save();
    
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
  })
  
});

router.post('/auth', (req, res, next) => {
  const { username,password} = req.body;
  Users.findOne({
    username
  }, (err,user) => {
    if(err)
      throw err;
    
      if(!user){
        res.json({
          status:false,
          message: "Auth Failed"
        });
      }
      else{
        bcrypt.compare(password, user.password).then((result) => {
          if(!result){
            res.json({
              status:false,
              message: "ipimle kuşağım sikimle taşağım"
            })
          }
          else{
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn:720
            });

            res.json({
              status:true,
              token
            })
          }
        });
      }
  })
});

module.exports = router;
