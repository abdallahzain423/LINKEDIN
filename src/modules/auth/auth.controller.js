
import {Router} from 'express'
export const authRouter = Router()

import * as authServices from './services/auth.services.js'
import { errorhandellerMiddleware } from '../../middlewares/errorhandeller.middleware.js'
import { validationMiddleware } from '../../middlewares/index.js'
import { userValidationSchema } from '../../validator/user.validator.schema.js'
import { authenticationMiddleware } from '../../middlewares/authentication.middleware.js'


authRouter.post('/signup',
    validationMiddleware(userValidationSchema),  
    errorhandellerMiddleware(authServices.signUpServices))

    authRouter.post('/confirm-email',
        errorhandellerMiddleware(authServices.confirmEmailService))
    authRouter.post('/login',

        errorhandellerMiddleware(authServices.signInServices))

authRouter.post('/sendOtpForgetPasswordService',
    authenticationMiddleware(),
    errorhandellerMiddleware(authServices.sendOtpForgetPasswordService))

authRouter.post('/resetPasswordService',
    // authenticationMiddleware(),
    errorhandellerMiddleware(authServices.resetPasswordService))

authRouter.post('/refreshTokenServices',
    // authenticationMiddleware(),
    errorhandellerMiddleware(authServices.refreshTokenServices))



