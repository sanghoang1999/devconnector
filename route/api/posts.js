const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../modules/Profile');
const User = require('../../modules/User');
const Post= require('../../modules/Post');
const { check, validationResult } = require('express-validator')
const config = require('config');

// @route    Post api/posts
// @desc     Create a post
// @access   public
router.post('/',[auth,[
  check('text','Text is required').not().isEmpty(),
]],async (req,res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty) {
    return res.status(400).json({errors:errors.array()})
  }
  try {
    const user = await User.findById({_id:req.user.id}).select('-password');
    const newPost= new Post({
      text:req.body.text,
      name:user.name,
      avatar:user.avatar,
      user:req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.log(err);
    res.status(500).json('Server Error');
  }
})


module.exports = router