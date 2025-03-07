import multer from "multer"

export const multerHost =(allowedExtentions =[])=>{
    const storage = multer.diskStorage({})
  
    //=====================file filter===========//
  const fileFilter = (req, file, cb)=> {
    if(allowedExtentions.includes(file.mimetype)){
  
      cb(null, false)
  
    }else{
  
      cb(new Error('I don\'t have a clue!'))
    }
  }
  const upload = multer({filename:fileFilter, storage: storage })
  return upload
  
  
  }