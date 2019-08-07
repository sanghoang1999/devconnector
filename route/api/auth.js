const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../modules/User');
// @route    GET api/auth
// @desc     Test
// @access   public
router.get('/',auth, async (req,res)=> {
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
  catch(err) {
    console.log(err);
    res.status(500).json('Server Error')
  }
})


module.exports = router