import { Router } from "express"
export const companyRouter = Router()
import * as companyServices from './services/services.company.js'
import { errorhandellerMiddleware } from "../../middlewares/errorhandeller.middleware.js" 
import {multerHost} from "../../middlewares/cloudinary.js"
import { validationMiddleware } from "../../middlewares/index.js"
import { ImageExtentions } from "../../constants/constants.js"
import { companyValidationSchema } from "../../validator/company.validator.schema.js"
import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js"

companyRouter.post('/company',
    multerHost(ImageExtentions).array('coverPic',1),
     validationMiddleware(companyValidationSchema),
     errorhandellerMiddleware(companyServices.addCompany)) 

companyRouter.put('/company/:id',
    // multerHost(ImageExtentions).array('coverPic',1),
    //  validationMiddleware(companyValidationSchema),
     authenticationMiddleware(),
     errorhandellerMiddleware(companyServices.updateCompany)) 

     companyRouter.delete('/company/:id',
     authenticationMiddleware(),
     errorhandellerMiddleware(companyServices.deleteCompany)) 

companyRouter.get('/company/jobs/:id',
    // authenticationMiddleware(),
    errorhandellerMiddleware(companyServices.listJobs)) 

    companyRouter.post('/serach-company',
        authenticationMiddleware(),
        errorhandellerMiddleware(companyServices.searchCompany))
        companyRouter.patch('/upload-company-logo/:id',
            authenticationMiddleware(),
            multerHost(ImageExtentions).single('logo'),
            errorhandellerMiddleware(companyServices.uploadCompanyLogo))

        companyRouter.patch('/upload-company-cover-pic/:id',
            authenticationMiddleware(),
            multerHost(ImageExtentions).array('coverPic',1),
            errorhandellerMiddleware(companyServices.uploadCompanyCoverPic))





