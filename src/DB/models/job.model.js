import mongoose from 'mongoose';
import { jobDescriptionEnum, jobLocationEnum, seniorityLevelEnum, softSkillsEnum, technicalSkillsEnum, workingTimeEnum } from '../../constants/constants.js';

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true,
        enum: Object.values(jobLocationEnum) 
    },
    workingTime: {
        type: String,
        required: true,
        enum: Object.values(workingTimeEnum)
    },
    seniorityLevel: {
        type: String,
        required: true,
        enum: Object.values(seniorityLevelEnum)
    },
    jobDescription: [{
        type: String,
        enum: Object.values(jobDescriptionEnum)
    }],
    technicalSkills: [{
        type: String,
        enum: Object.values(technicalSkillsEnum)
    }],
    softSkills: [{
        type: String,
        enum: Object.values(softSkillsEnum)
    }],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        default: null 
    },
    closed: {
        type: Boolean,
        default: false 
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', 
        // required: true
    }
}, { timestamps: true });


export const Job = mongoose.model('Job', jobSchema);

