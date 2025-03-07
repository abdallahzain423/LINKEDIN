import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true // Ensures companyName is unique
    },
    description: {
        type: String,
        // required: true
    },
    industry: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    numberOfEmployees: {
        type: Number,
        // required: true,
        min: 11, 
        max: 20 
    },
    companyEmail: {
        type: String,
        // required: true, 
        // unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    logo: {
        secure_url:String,
        public_id:String,
    
        
    }, 
    coverPic: {
        URLS :[{
            secure_url:String,
            public_id:String
        }],
        folderId: String
    },
    HRs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    pannedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    },
    legalAttachment: {
        secure_url: { type: String, default: null }, 
        public_id: { type: String, default: null } 
    },
    approvedByAdmin: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });  


companySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'companyId'
   
  })

export const Company = mongoose.models.Company || mongoose.model('Company',companySchema)


