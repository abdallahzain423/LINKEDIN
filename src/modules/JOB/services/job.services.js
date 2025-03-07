

import { Company, Job } from "../../../DB/models/index.js"

//========================== add job ==========================//

export const addJob = async (req, res) => {
    const {_id,Role} = req.loggedInUser
    const { companyId } = req.params
    const { jobTitle, jobLocation, workingTime,
        seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body
        
        const company = await Company.findOne({companyId })
        if (!company) return res.status(404).json({ msg: 'company not found' })
        console.log('>>',company,'>>>', _id); 
        console.log('>hrs>>',company.HRs,'>>'); 
            
        if(company.createdBy.toString()!== _id.toString() &&!company.HRs.includes(_id.toString())){
            return res.status(403).json({ msg: 'you are not authorized' })
        }

               
        
        const job = await Job.create({
            jobTitle, jobLocation, workingTime,
            seniorityLevel, jobDescription, technicalSkills, softSkills, 
            addedBy: _id,
            companyId
        })
        return res.status(201).json({ msg: 'job added successfully', job })

}

//========================== update job ==========================//

export const updateJob = async (req, res) => {
    const {_id} = req.loggedInUser
    const { companyId } = req.params
    const { jobTitle, jobLocation, workingTime,
        seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body
        
        const company = await Company.findOne({companyId })
        if (!company) return res.status(404).json({ msg: 'company not found' })
            
        if(company.createdBy.toString()!== _id.toString() &&!company.HRs.includes(_id.toString())){
            return res.status(403).json({ msg: 'you are not authorized' })
        }

                
        const job = await Job.findOneAndUpdate({ _id: req.params.jobId },
            { jobTitle, jobLocation, workingTime,
                seniorityLevel, jobDescription, technicalSkills, softSkills },
            { new: true })
        return res.status(200).json({ msg: 'job updated successfully'})
}

//========================== delete job ==========================//

export const deleteJob = async (req, res) => {
    const {_id} = req.loggedInUser
    const { jobId , companyId } = req.params
    const company = await Company.findOne({companyId })
    if (!company) return res.status(404).json({ msg: 'company not found' })
        
    if(company.createdBy.toString()!== _id.toString() &&!company.HRs.includes(_id.toString())){
        return res.status(403).json({ msg: 'you are not authorized' })
    }

    const job = await Job.findOneAndDelete({ _id: jobId })
    return res.status(200).json({ msg: 'job deleted successfully'})
}



