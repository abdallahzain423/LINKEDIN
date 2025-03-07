
// import cryptoJS from 'crypto-js'

// export const encryption =({value,secretKey}={})=>{

//     const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value),'test').toString();
//     console.log('cipher text>>',ciphertext);
    
//     return ciphertext


// }
// encryption({value:'123',secretKey:'test'})  

// export const decryption =({cipher,secretKey}={})=>{
//     const decryptedData = CryptoJS.AES.decrypt(cipher,process.env.SECRET_kEY).toString(CryptoJS.enc.Utf8)
// }


import cryptoJS from "crypto-js";

export const encryption = async({value,secretKey}={})=>{
    const encrypted = cryptoJS.AES.encrypt(JSON.stringify(value),process.env.SECRET_kEY).toString()
    return encrypted
} 




export const Decryption = async ({cipher,secretKey}={})=>{
    const decrypted = cryptoJS.AES.decrypt(cipher,process.env.SECRET_kEY).toString(cryptoJS.enc.Utf8)
    return decrypted

} 