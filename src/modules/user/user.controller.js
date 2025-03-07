import {Router} from 'express'
export const userRouter = Router()


import * as userServices from './services/user.services.js'
import { errorhandellerMiddleware } from '../../middlewares/errorhandeller.middleware.js'
import { validationMiddleware } from '../../middlewares/index.js'
import { userValidationSchema } from '../../validator/user.validator.schema.js'
import {multerHost} from '../../middlewares/cloudinary.js'
import { ImageExtentions } from '../../constants/constants.js'
import { authenticationMiddleware } from '../../middlewares/authentication.middleware.js'

userRouter.post('/add-user',
     multerHost(ImageExtentions).array('coverPic',1),
     // validationMiddleware(userValidationSchema), 
     errorhandellerMiddleware(userServices.addUserService)) 

userRouter.put('/update-user',
     // validationMiddleware(userValidationSchema),
     authenticationMiddleware(),
     errorhandellerMiddleware(userServices.updateUserService))

userRouter.get('/get-login-user',
     authenticationMiddleware(),
     errorhandellerMiddleware(userServices.getLoginUserService))

userRouter.get('/get-profile/:id',
     authenticationMiddleware(),
     errorhandellerMiddleware(userServices.getProfileService))

userRouter.patch('/update-password',
     authenticationMiddleware(),
     errorhandellerMiddleware(userServices.updatePasswordService))

userRouter.delete('/delete-account',
     authenticationMiddleware(),
     errorhandellerMiddleware(userServices.deletAccountService))

userRouter.post('/upload-cover-picture',
     authenticationMiddleware(),
     multerHost(ImageExtentions).single('coverPic'),
     errorhandellerMiddleware(userServices.uploadCoverPictureService))