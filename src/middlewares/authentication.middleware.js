
import { BlackListToken,User } from "../DB/models/index.js"

import { verifyToken } from "../utils/token.utils.js" 


export const authenticationMiddleware =  ()=>{
    return async(req,res,next)=>{
      
            // 1 => check access token
            const{accesstoken} = req.headers
        // console.log("req.headers",req.headers);
            
     if(!accesstoken) return res.status(403).json({msg:'please login firs  tt'}) 
                 // 2 => verify token
      const decodedData = verifyToken({token:accesstoken,secretKey:process.env.JWT_SECRET_KEY})
      // 3 => check blacl list
      const isBlackListed = await BlackListToken.findOne({tokenId:decodedData.jti})
      if(isBlackListed) return res.status(403).json({msg:'this token is blacklisted , please login firsttt'})
      // 4 => get data from data base
      const user = await User.findById(decodedData._id,'-password -__v -createdAt -updatedAt ')
      if(!user) return res.status(404).json({msg:'user not found'})

       req.loggedInUser = {...user._doc,token:{ tokenId:decodedData.jti,expiryDate:decodedData.exp}}

                
            
          
            next()
            
       
       
            
        
    }
}

//=========================================== authorizaion middleware =======================//

export const authorizationMiddleware = (allowedRoles)=>{
    return async(req,res,next)=>{
        try {
            const {role} = req.loggedInUser
            const isAuthorized = allowedRoles.includes(role)
            if(!isAuthorized) return res.status(403).json({msg:'unauthorized'})
            next()


            
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg:'went error',error})
            
        }
            
        }
    }