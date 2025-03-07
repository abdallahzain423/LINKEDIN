import mongoose from 'mongoose'


export const connectDB = ()=>{
    try {
        mongoose.connect(process.env.DB_URL)
      
        console.log('db connected successfully');
        
        
    } catch (error) {
        console.log('something went wrong', error);
        res.status(500).josn({msg:"wronng"})
        
        
    }
}

