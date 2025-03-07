export const options = ()=>{
    const whitelist = [process.env.FRONTEND_ORIGIN, undefined]
   return {
     origin: function (origin, callback) {
       if (whitelist.indexOf(origin) !== -1) {
         callback(null, true)
       } else {
         callback(new Error('Not allowed by CORS'))
       }
     }
   }
}