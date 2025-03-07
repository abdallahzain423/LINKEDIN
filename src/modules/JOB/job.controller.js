

import {Router} from 'express'
import { authenticationMiddleware } from '../../middlewares/authentication.middleware.js'
import { errorhandellerMiddleware } from '../../middlewares/errorhandeller.middleware.js'

export const jobRouter = Router()
import * as jobServices from './services/job.services.js'

jobRouter.post('/add-job/:id',
    authenticationMiddleware(),
    errorhandellerMiddleware(jobServices.addJob))

jobRouter.put('/update-job/:id',
    authenticationMiddleware(),
    errorhandellerMiddleware(jobServices.updateJob))

jobRouter.delete('/delete-job/:id',
    authenticationMiddleware(),
    errorhandellerMiddleware(jobServices.deleteJob))


