import { globalHandeller } from "../middlewares/errorhandeller.middleware.js"
import { userRouter } from "../modules/user/user.controller.js"
import { companyRouter } from "../modules/company/controller.company.js" 
import { authRouter } from "../modules/auth/auth.controller.js" 
import { adminRouter } from "../modules/Admin/admin.controller.js"
import { mainSchema } from '../GraphQl/graphql.schema.js';
import { createHandler } from 'graphql-http/lib/use/express';
import { jobRouter } from "../modules/JOB/job.controller.js";
import { options } from '../config/cosr.option.js';
import express from 'express'; 
import cors from 'cors';
import { rateLimit } from 'express-rate-limit' 

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100,  

})


export const routerHandeller =(app)=>{
    app.use(express.json())
    app.use(cors(options))
    app.use(limiter)
    app.use('/graphql', createHandler({ schema:mainSchema}));  
    app.use(userRouter)
    app.use(companyRouter)
    app.use(authRouter)
    app.use(adminRouter)
    app.use(jobRouter)



    app.use(globalHandeller)
}