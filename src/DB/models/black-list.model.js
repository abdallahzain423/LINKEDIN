import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    tokenId:{
        type:String,
        required:[true,'token is required'],
        unique:[true,'token already exists']
    },
    expiryDate:{
        type:String,
        required:[true,'expiryDate is required']
    }
},{timestamps:true})

export const BlackListToken =mongoose.models.BlackListToken || mongoose.model('BlackListToken',blackListTokenSchema)


