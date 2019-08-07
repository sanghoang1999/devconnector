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


// @route    Get api/profile
// @desc     Get all profile
// @access   Public

router.get('/',async (req,res) => {
  try {
    const profiles = await Profile.find().populate('user',['name','avatar']);
    res.json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
})


// @route    Get api/profile/user/:user_id
// @desc     Get profile by user_id
// @access   Public

router.get('/user/:user_id',async (req,res) => {
  try {
    const profile = await Profile.find({user:req.params.user_id}).populate('user',['name','avatar']);
    
    if(!profile) {
      return res.status(400).json({msg:'Profile not found'});
    }
    res.json(profile);
  } catch (error) {
    console.log(error);
    if(error.kind=="ObjectId") {
      return res.status(400).json({msg:'Profile not found'});
    }
    res.status(500).json("Server Error");
  }
})


// @route    Post api/profile
// @desc     Delete profile, user & posts
// @access   Private


router.delete('/',auth,async(req,res) => {
  try {
    //@todo - remove users posts

    //Remove profile
    await Profile.findOneAndRemove({user:req.user.id});
    //Remove user
    await User.findOneAndRemove({_id:req.user.id});

    res.json({msg:"User deleted"});
    res.json()
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
})


// @route    Put api/profile/experience
// @desc     Add profile experience
// @access   Private


router.put('/experience',[auth,[
  check('title','Title is required').not().isEmpty(),
  check('company','Company is required').not().isEmpty(),
  check('from','From is required').not().isEmpty(),

]],async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(401).json({errors:errors.array()});
  }

  const {title, company,location,from,to,current,description} = req.body;
  const newExp = {title, company,location,from,to,current,description};
  try {
    
    const profile = await Profile.findOne({user:req.user.id});
    if(!profile) {
      return res.status(401).json({msg:"Profile not found"})
    }
    profile.experience.unshift(newExp);
    await profile.save();
     res.json(profile);
  } catch (error) {
    console.log(error);
    res.send(500).json("Server Error");
  }
})

// @route    DELETE api/profile/experience/:exp_id
// @desc     DELETE profile experience by exp ID
// @access   Private

router.delete('/experience/:exp_id',auth,async (req,res) => {
  try {
    const profile = await Profile.findOne({user:req.user.id});

    const indexToDel = profile.experience.map(item =>item._id).indexOf(req.params.exp_id);

    profile.experience.splice(indexToDel,1);
    await profile.save();
    res.json(profile);

  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
})


module.exports = router