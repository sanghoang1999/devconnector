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
// @access   private
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


// @route    GET api/posts
// @desc     Get all posts
// @access   Private


router.get('/',auth,async(req,res)=> {
  try {
    const posts = await Post.find().sort({date:-1});
    res.json(posts); 
  } catch (error) {
    console.log(err);
    res.status(500).json('Server Error');
  }
})

// @route    GET api/posts/:post_id
// @desc     Get post by post ID
// @access   Private

router.get('/:post_id',auth,async(req,res)=> {
  try {
    const post = await Post.findById(req.params.post_id);
    if(!post) {
      return res.status(404).json({msg:"Post not found"});
    }
    res.json(post); 
  } catch (error) {
    if(error.kind==="ObjectId") {
      console.log(error.kind);
      return res.status(404).json({msg:"Post not found"});
    }
    res.status(500).json('Server Error');
  }
})


// @route    DELETE api/posts/:post_id
// @desc     DELETE post by post ID
// @access   Private

router.delete('/:post_id',auth,async(req,res)=> {
  try {
    const post = await Post.findById(req.params.post_id);
    if(!post) {
      return res.status(404).json({msg:"Post not found"});
    }
    //Check user
    console.log(post.user);
    if(post.user.toString()!==req.user.id) {
      return res.status(401).json({msg:'User not authorize'})
    }
    await post.remove();

    res.json({msg:"Post removed"}); 
  } catch (error) {
    if(error.kind==="ObjectId") {
      console.log(error.kind);
      return res.status(404).json({msg:"Post not found"});
    }
    res.status(500).json('Server Error');
  }
})

module.exports = router