const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')
const User = require('../../modules/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
// @route    GET api/auth
// @desc     Test
// @access   public
router.get('/',auth, async (req,res)=> {
  try{
    const user = await User.findById(req.user.id).select('-password');
    console.log(user);
    res.json(user);
  }
  catch(err) {
    console.log(err);
    res.status(500).json('Server Error')
  }
})


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   public


router.post('/',[ 
  check('email','Please include a valid email').isEmail(),
  check('password','Password is required').exists()
], async (req,res)=> { 
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {email,password} = req.body;

  try {

    // See if user exists
    let user = await User.findOne({email:email});
    if(!user) {
      res.status(400).json({
        errors:[{msg:'Invalid Credentials'}]
      })
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {
      res.status(400).json({
        errors:[{msg:'Invalid Password'}]
      })
    }

      const payload = {
        user: {
          id:user.id
        } 
      }
      jwt.sign(payload,config.get('jwtSecret'),{expiresIn:'1h'},(err,token)=> {
        if(err) throw err;
        res.json({token})
      })
  }
  catch(err) {
    console.log(err.massage);
    res.status(500).send('Server error')
  }
})


module.exports = router