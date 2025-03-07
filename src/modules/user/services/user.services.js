import { compareSync } from 'bcrypt'
import { User } from '../../../DB/models/user.model.js'
import { Decryption, encryption } from '../../../utils/encryption.js'
import { hashSync } from 'bcrypt'
import bcrypt from 'bcrypt' 
import { BlackListToken } from '../../../DB/models/black-list.model.js'
import { verifyToken } from '../../../utils/token.utils.js'




export const addUserService = async (req, res) => {
    try {
        const { firstName, lastName, email, password, gender, DOB, mobileNumber } = req.body
        const hashedPhone = await encryption({ value: mobileNumber, secretKey: process.env.SECRET_kEY })

        const user = await User.create({ firstName, lastName, email, password, gender, DOB, mobileNumber: hashedPhone })

        return res.status(200).json({ msg: 'done', user })

    } catch (error) {
        console.log('error from services', error);
        return res.status(500).json({ msg: 'eror' }) 


    }
}

//====================================== updata user=======================================//
export const updateUserService = async (req, res) => {
    const {_id} = req.loggedInUser

    const { firstName, lastName, email, password, gender, DOB, mobileNumber } = req.body
    const encryptedPhone = await encryption({ value: mobileNumber, secretKey: process.env.SECRET_kEY })
    const hashedPassword = hashSync(password, +process.env.SALT)
    const user = await User.findByIdAndUpdate(_id, { firstName, lastName, email, password:hashedPassword, gender, DOB, mobileNumber:encryptedPhone }, { new: true })
    return res.status(200).json({ msg: 'done', user })
}

//====================================== get login user=======================================//
export const getLoginUserService = async (req, res) => {
    const {_id} = req.loggedInUser
    const user = await User.findById(_id)
    if(!user) return res.status(404).json({ msg: 'user not found' })
    const decryptedPhone = await Decryption({ cipher: user.mobileNumber, secretKey: process.env.SECRET_kEY })
    user.mobileNumber = decryptedPhone

    return res.status(200).json({ msg: 'done', user })
}

//====================================Get profile data for another user==========================//
export const getProfileService = async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id).select('userName mobileNumber ')
    if(!user) return res.status(404).json({ msg: 'user not found' })
    const decryptedPhone = await Decryption({ cipher: user.mobileNumber, secretKey: process.env.SECRET_kEY })
    user.mobileNumber = decryptedPhone
    return res.status(200).json({ msg: 'done', user })
}
//================================update password=================================//
export const updatePasswordService = async (req, res) => {
    const {_id} = req.loggedInUser
    const {accesstoken} = req.headers
  
    

    
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(_id)
    if(!user) return res.status(404).json({ msg: 'user not found' })
        
    const isPasswordMatched = compareSync(oldPassword, user.password)
    if(!isPasswordMatched) return res.status(400).json({ msg: 'old password is incorrect' })
    user.password = hashSync(newPassword, +process.env.SALT)
console.log('>>>',req.loggedInUser.tokenId);

//@optimize
// const revokedToken = await BlackListToken.create([
//     {
//         tokenId:decodedAccessToken.jti,
//         expiryDate:decodedAccessToken.exp
//     }
// ])
    await user.save()
    return res.status(200).json({ msg: 'password updated successfully' })
}

//================================upload cover picture=================================//
export const uploadCoverPictureService = async (req, res) => {
    const {_id} = req.loggedInUser
    const user = await User.findByIdAndUpdate(_id, { coverpicture: image }, { new: true })
    if(!user) return res.status(404).json({ msg: 'user not found' })
   

    let coverpicture = null
    if(req.files?.length){
        const folderId = uuidv4().slice(0,4)
        coverpicture ={
            URLS:[],
            folderId
        }
    
        for(const file of req.files){
            const {secure_url,public_id} = await cloudinary().uploader.upload(file.path,{
                folder:`${process.env.CLOUDINARY_FOLDER}/cover_pic/${folderId}`
            })
            coverpicture.URLS.push({secure_url,public_id})
        }
        user.coverpicture= coverpicture
      
    }
            // const user = await User.create(userObject)
            return res.status(200).json({ msg: 'user created successfully', user}) 
        
        }

//================================upload profile picture=================================//

export const uploadPicCloud = async(req,res)=>{

    const{file} = req
    const{_id} = req.headers
    if(!file) return res.status(400).json({msg:'no file uploaded'})

     const {secure_url,public_id} = await cloudinary().uploader.upload(file.path,{folder:`${process.env.CLOUDINARY_FOLDER}/user/profile`})

     const user = await User.findByIdAndUpdate(_id,{profilepicture:secure_url,public_id},{new:true})

     
    return res.status(200).json({msg:'donee',user }
        
    )
}

//==================================Soft delete account==================================//
export const deletAccountService = async (req, res) => {
    const {_id} = req.loggedInUser
    const user = await User.findOneAndUpdate(_id,{isDeleted:true})
    if(!user) return res.status(404).json({ msg: 'user not found' })
    return res.status(200).json({ msg: 'account deleted successfully' })
}






