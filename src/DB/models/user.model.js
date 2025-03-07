import mongoose, { Schema } from 'mongoose'
import { genderEnum, otpType, providersEnum, roleEnum } from '../../constants/constants.js';

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        require:[true, 'user name is require'] 
    },
    lastName :{
        type:String,
        require:[true, 'user name is require'] 
    },
    username: {
        type: String,
        get: function () {
            return `${this.firstName} ${this.lastName}`;
        },
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    provider: {
        type: String,
        enum: Object.values(providersEnum),
        default: providersEnum.SYSTEM
    },
    gender: {
        type: String,
        enum: Object.values(genderEnum),
    },
    //@optimize
    DOB: {
        type: Date,
    },
    mobileNumber: {
        type: String,
        require: true
    },
    Role:{
        type:String,
        default:'user',
        enum: Object.values(roleEnum),
    },
    isconfirmed:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
    },
    pannedAt:{
        type:Date,
  
    },

    confirmOtp:{
        type:String,
    },
    updatedBy:{
        type:Schema.Types.ObjectId,ref:'User'
    },
    profilepicture:{
        secure_url:String,
        public_id:String
    },
    coverpicture: [{
        secure_url:String,
        public_id:String
    }],
    OTP:[{
        otpMission:{
        type:String,
        enum:Object.values(otpType),
        
    },
    otp:{
        type:String,
        
    }
}],
isDeleted:{
    type:Boolean,
    default:false
}
},{timestamps:true})

export const User = mongoose.models.User || mongoose.model('User',userSchema)
