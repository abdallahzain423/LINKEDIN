import { cloudinary } from "../../../config/cloudinary.config.js"
import {Company} from "../../../DB/models/company.model.js"
import { v4 as uuidv4 } from 'uuid';
import { Job } from "../../../DB/models/job.model.js";


//========================== add company ==========================//
export const addCompany = async (req, res) => {
    
        const { companyName, description, industry, address, numberOfEmployees, companyEmail, createdBy } = req.body
        const checkCompany = await Company.findOne({companyName},{companyEmail})
        if(checkCompany) return res.status(400).json({ msg: 'company already exists' })
        const companyObject ={
            companyName, description, industry, address, numberOfEmployees, companyEmail, createdBy
        }
        let coverPic = null
if(req.files?.length){
    const folderId = uuidv4().slice(0,4)
    coverPic ={
        URLS:[],
        folderId
    }

    for(const file of req.files){
        const {secure_url,public_id} = await cloudinary().uploader.upload(file.path,{
            folder:`${process.env.CLOUDINARY_FOLDER}/cover_pic/${folderId}`
        })
        coverPic.URLS.push({secure_url,public_id})
    }
    companyObject.coverPic= coverPic
  
}
    
        const company = await Company.create(companyObject)
        return res.status(200).json({ msg: 'company created successfully', company}) 
    
    }

//========================== update company ==========================//
export const updateCompany = async (req, res) => {
    const{_id} = req.loggedInUser
    const  {companyId}  = req.params
    //@optimize find by id instead of find one
    // console.log('>>>',req.params)
    
    const { companyName, description, industry, numberOfEmployees, companyEmail } = req.body
    const company = await Company.findOne({companyId})
    console.log('>>',company);
    
    if(!company) return res.status(404).json({ msg: 'company not found' })

        if(company.createdBy.toString()!== _id.toString()) return res.status(403).json({ msg: 'you are not authorized' })
    company.companyName = companyName
    company.description = description
    company.industry = industry
    company.numberOfEmployees = numberOfEmployees
    company.companyEmail = companyEmail
    await company.save()
    return res.status(200).json({ msg: 'company updated successfully', company})
}

//==================== delete company ==========================//
export const deleteCompany = async (req, res) => {
    const{_id,Role} = req.loggedInUser
    const  {companyId}  = req.params
    const company = await Company.findOne({companyId})
    if(!company) return res.status(404).json({ msg: 'company not found' })

        if(company.createdBy.toString()!== _id.toString()) return res.status(403).json({ msg: 'you are not authorized' } || Role !== 'admin')
    company.isDeleted = true
    await company.save()
    return res.status(200).json({ msg: 'company deleted successfully', company})
}

//==============================get job related to company==============================//

export const listJobs = async (req, res) => {
    const{companyId} = req.params
const jobs = await Job.findOne({companyId}).populate('jobs')
return res.status(200).json({ jobs })
}

//===============================search company by name==============================//
export const searchCompany = async (req, res) => {
    const {companyName} = req.body
    const company = await Company.findOne({companyName})
    if(!company) return res.status(404).json({ msg: 'company not found' })
    return res.status(200).json({ company })
}
//===============================Upload company logo==============================//
export const uploadCompanyLogo = async (req, res) => {
    const {companyId} = req.params
    const company = await Company.findOne({companyId})
    if(!company) return res.status(404).json({ msg: 'company not found' })
     if(req.file){ 
        const folderId = uuidv4().slice(0,4)
        const {secure_url,public_id} = await cloudinary().uploader.upload(req.file.path,{ 
            folder:`${process.env.CLOUDINARY_FOLDER}/logo/${folderId}`
        })
        company.logo = {secure_url,public_id}
    }
    await company.save()
    return res.status(200).json({ msg: 'company logo uploaded successfully'})
}

//=================================Upload company Cover Pic==========================//
export const uploadCompanyCoverPic = async (req, res) => {
    const {companyId} = req.params
    const company = await Company.findOne({companyId})
    
  let coverPic = null
  if(req.files?.length){
    const folderId = uuidv4().slice(0,4)
    coverPic = {
        URLS:[],folderId
    }
    for(const file of req.files){
        const {secure_url,public_id} = await cloudinary().uploader.upload(file.path,{folder:`${process.env.CLOUDINARY_FOLDER}/cover_pic/${folderId}`})
        coverPic.URLS.push({secure_url,public_id})
    }
  }
  company.coverPic = coverPic
  await company.save()
  return res.status(200).json({ msg: 'company cover pic uploaded successfully'})
}






