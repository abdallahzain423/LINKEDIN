import { User } from "../../../DB/models/index.js"
import bcrypt, { compareSync, hashSync } from 'bcrypt'
import { encryption } from "../../../utils/encryption.js"
import {v4 as uuidv4} from 'uuid';
import { emitter } from "../../../Email/email.service.js";
import { generateToken, verifyToken } from "../../../utils/token.utils.js";
// import moment from 'moment';
import { OAuth2Client } from 'google-auth-library';
import { providersEnum } from "../../../constants/constants.js"; 
import jwt from 'jsonwebtoken';






//===============================sign -up==============================//
export const signUpServices = async(req,res,next)=>{

    const { firstName, lastName, email, password, gender, DOB, mobileNumber } = req.body
    // check email
    const isEmailExist = await User.findOne({email})
    if (isEmailExist)  return res.status(400).json({msg:'this email is already exist'})
    // hash password
    const hashedPaswword = bcrypt.hashSync(password,+process.env.SALT)

    //encryption phone
    const encrypedPhone = await encryption({value:mobileNumber,secretKey:process.env.SECRET_kEY})
    // private account
   
    // const isPublic = privateaccount?false:true 

    // confirm otp
    const otp = uuidv4().slice(0,4)
    const hashedOtp = bcrypt.hashSync(otp,+process.env.SALT)
    //@optimize
    // const token = jwt.sign({ email } , process.env.JWT_SECRET_KEY , {expiresIn: "10m"} ) 
    // const expiresAt = moment().add(0, 'minutes').toDate()

    //send email
    emitter.emit('sendEmail',{
        to:email,
        subject:'verify your email',
        html:`<h1>${otp} </h1>`
    })

    // create user
    const user = new User({
        firstName,
        lastName,
        email,
        password:hashedPaswword,
        mobileNumber : encrypedPhone,
        gender,
        DOB,
        confirmOtp:hashedOtp ,
        OTP:[{
            otpMission:'confirm-email',
        },
    {
        otp:hashedOtp, 
    }]
    })
    await user.save()

    
    
    res.status(201).json({msg:"user created successfully"}) 
}


//==============================confirm otp==============================//
export const confirmEmailService = async(req,res)=>{
    const {email,otp} = req.body
    const user = await User.findOne({email,isconfirmed:false,confirmOtp:{$exists:true}})
    if(!user) return res.status(401).json({msg:'user not found'})
    // if (moment().isAfter(expiresAt)) return res.status(400).json({msg:'OTP has expired'})
    const isOtpMatched = compareSync(otp,user.confirmOtp)
    if(!isOtpMatched) return res.status(400).json({msg:'incorrect otp'})

    await User.findByIdAndUpdate(user._id,{isconfirmed:true,$unset:{confirmOtp:""} })
    return res.status(200).json({msg:'email confirmed successfully'})
    

}

//===============================sign -in==============================//
export const signInServices = async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email,isconfirmed:true})
    if(!user) return res.status(402).json({msg:'user not found'})
    const isPasswordMatched = compareSync(password,user.password)
    if(!isPasswordMatched) return res.status(401).json({msg:'user not found'})

    // access token
    const accesstken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.ACCESSTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY
    })
    // rfrsh token
    const refreshtken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.REFRESHTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY_REFRESH
    })
    return res.status(200).json({msg:'signed in successfully',accesstken,refreshtken})

    
}
//======================= sign in with gmail =============//
export const GmailLoginServices = async (req,res)=>{
    const {idToken} = req.body
const client = new OAuth2Client();


  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID,  
  
  });
  const payload = ticket.getPayload();
  const{email_verified,email} = payload
  //================ check email_verified && provider ======//
  if(!email_verified) return res.status(401).json({msg:'user not found'})

    const user = await User.findOne({email,provider:providersEnum.GOOGLE})
    if(!user) return res.status(401).json({msg:'user not found'})

    //============= access token================
    const accesstken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.ACCESSTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY
    })
    //============= rfrsh token ==============//
    const refreshtken = generateToken({
        publicClaims:{_id:user._id},
        regiteredClaims:{expiresIn:process.env.REFRESHTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
        secretKey : process.env.JWT_SECRET_KEY_REFRESH
    })

    return res.status(200).json({msg:'signed in successfully',accesstken,refreshtken})
    

}

//======================= sign up with gmail =============//

export const GmailRegisterService = async(req,res)=>{
    const {idToken} = req.body
    const client = new OAuth2Client();
    
    
      const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.CLIENT_ID,  
      
      });
      const payload = ticket.getPayload();
      const{email_verified,email,name} = payload
      if(!email_verified) return res.status(401).json({msg:'user not found'})
    
        // craete user
        const user = new User({
            firstName:name,
            email:email,
            email_verified:true, 
            provider:providersEnum.GOOGLE,
            isverified:true,
            password: hashSync(uuidv4(),+process.env.SALT)
        })
        await user.save()
        return res.status(200).json({msg:'signed in successfully'}) 
}

//===================================send otp for forget password====================================//
export const sendOtpForgetPasswordService = async(req,res)=>{
    const {email} = req.body
    // const{accesstoken} = req.headers
    const user = await User.findOne({email,isconfirmed:true})
    if(!user) return res.status(401).json({msg:'user not found'})

    const otp = uuidv4().slice(0,4)
    const hashedOtp = bcrypt.hashSync(otp,+process.env.SALT)
    user.OTP = [{
        otpMission:'forgot-password', 
    },
{
    otp:hashedOtp, 
}]
    await user.save()

    // send otp
    emitter.emit('sendEmail',{
        to:email,
        subject:'verify your email',
        html:`<h1>your otp is ${otp} for forget password</h1>`
    })
    return res.status(200).json({msg:'otp sent successfully'})


}
//===========================================reset password==========================================//
export const resetPasswordService = async(req,res)=>{
    const {email,userotp,password} = req.body
    const user = await User.findOne({email})
    console.log("user",user);
    
    if(!user) return res.status(401).json({msg:'user not found'})
    // const {otp,otpMission} = user.OTP
const {otpMission} = user.OTP[0]
    const {otp} = user.OTP[1]

    if(otpMission !== 'forgot-password') return res.status(401).json({msg:'invalid otp'})
    const isValid = compareSync(userotp,otp) 
    if(!isValid) return res.status(401).json({msg:'invalid otp' })
    user.password = hashSync(password,+process.env.SALT)
    await user.save()
    return res.status(200).json({msg:'password reset successfully'})
}

//================================================== refresh token service=====================//
export const refreshTokenServices = async(req,res)=>{
    
        const{refreshtoken} = req.headers
        const decodedData = jwt.verify(refreshtoken,process.env.JWT_SECRET_KEY_REFRESH)
        console.log("decodedData>>>",decodedData);
        const user = await User.findById(decodedData._id,'-password -__v -createdAt -updatedAt ')
        if(!user) return res.status(404).json({msg:'user not found'})
        const accesstken = generateToken({
            publicClaims:{_id:user._id},
            regiteredClaims:{expiresIn:process.env.ACCESSTOKEN_EXPIRATION_TIME,jwtid:uuidv4()},
            secretKey : process.env.JWT_SECRET_KEY
        })
        res.status(200).json({msg :'token refreshed successfully',accesstken})
        
    }

    //@optimize
    //cron job for deleting expired otp










