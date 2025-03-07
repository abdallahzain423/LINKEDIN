import jwt from 'jsonwebtoken'


export const generateToken =({
    publicClaims,
    registeredClaims,
    secretKey = process.env.JWT_SECRET_KEY
}) =>{
    return jwt.sign(publicClaims,secretKey,registeredClaims)
}

// verify jwt

export const verifyToken =({token,secretKey=process.env.JWT_SECRET_KEY})=>{
    return jwt.verify(token,secretKey)
}