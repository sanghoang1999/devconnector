const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../modules/Profile');
const User = require('../../modules/User');
const { check, validationResult } = require('express-validator')
// @route    GET api/profile/me 
// @desc     Get current users profile
// @access   Private
router.get('/me',auth, async (req,res)=> {
  try{
    const profile = await Profile.findOne({user:req.user.id}).populate('user',
    ['name','avatar']);
    if(!profile) {
      return res.status(400).json({msg:'There is no profile for this user'})
    }
    res.json(profile)
  }catch(err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
})

// @route    Post api/profile
// @desc     Create or update profile
// @access   Private


router.post('/',auth,[
  check('status','Status is required').not().isEmpty(),
  check('skills','Skills is required').not().isEmpty(),
],async (req,res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()})
  }
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    experience,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;
  
  //Build profile object
  const profileFileds ={};
  profileFileds.user = req.user.id;
  if(company) profileFileds.company = company;
  if(website) profileFileds.website = website;
  if(location) profileFileds.location = location;
  if(status) profileFileds.status = status;
  if(bio) profileFileds.bio = bio;
  if(githubusername) profileFileds.githubusername = githubusername; 
  if(skills) {
    profileFileds.skills= skills.split(',').map(skill=>skill.trim());
  }
  console.log(skills);

  //Build social object
  profileFileds.social={};
  if(youtube) profileFileds.social.youtube = youtube;
  if(twitter) profileFileds.social.twitter = twitter;
  if(facebook) profileFileds.social.facebook = facebook;
  if(linkedin) profileFileds.social.linkedin = linkedin;
  if(instagram) profileFileds.social.instagram = instagram;




  try{
    let profile = await Profile.findOne({user:req.user.id});

    if(profile) {
      profile = await Profile.findOneAndUpdate(
        {user:req.user.id},
        {$set:profileFileds},
        {new:true}
      );
      return res.json(profile);
    }

    profile = new Profile(profileFileds);

    await profile.save(); 
    return res.json(profile);

  }
  catch(err) {
    console.log(err);
    res.status(500).json('Server Error')
  }

  res.send(profileFileds); 
})



module.exports = router