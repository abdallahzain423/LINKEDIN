

export const errorhandellerMiddleware =(api)=>{
    return (req,res,next)=>{
        api(req,res,next).catch((error)=>{
            console.log(`error: ${req.path}`,error);
            return next(new Error(error.message,{cause:500}))
            
        })
        
    }
}

export const globalHandeller = (error,req,res,next)=>{
    console.log(`error from global ${error.message}`);
    return res.status(error.cause || 500).json({msg:error.message})
    
}