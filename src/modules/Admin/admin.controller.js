
import { Router } from "express"
export const adminRouter = Router()
import * as adminServices from './services/admin.services.js'
import { errorhandellerMiddleware } from "../../middlewares/errorhandeller.middleware.js" 
import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js"

adminRouter.post('/ban-user',
    authenticationMiddleware(),
    errorhandellerMiddleware(adminServices.banUser))

adminRouter.post('/ban-company',
    authenticationMiddleware(),
    errorhandellerMiddleware(adminServices.banCompany))

adminRouter.post('/approved-by-admin',
    authenticationMiddleware(),
    errorhandellerMiddleware(adminServices.approvedByAdmin))


