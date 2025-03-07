export const validationMiddleware =(schema)=>{
    return (req,res,next)=>{

        const schemaKeys = Object.keys(schema)
        console.log("schemaKeys ",schemaKeys);
        

        for(const key of schemaKeys){
         const result =   schema[key].validate(req[key])   
         console.log("result ",result);
         if(result.error){
            return res.status(400).json({msg:result.error.message})
         }
        }
        next()
    }
}