import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', 
        required: true  
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    userCV: {
        URLS :[{ 
            secure_url:String,
            public_id:String
        }],
        folderId: String,
    }
    
})





export const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);