import express from 'express'
import dotenv from 'dotenv'
import { routerHandeller } from './utils/router.handeller.js'
import { Server } from 'socket.io';
dotenv.config()

import {connectDB} from './DB/connection.js'
import { Message } from './DB/models/chat.model.js';


export const bootstrap = async ()=>{
    const app = express()
    app.use(express.json())
    routerHandeller(app)
    connectDB()

    // const server = app.listen(process.env.PORT, () => {
    //     console.log(`server runs on ${process.env.PORT}!`);
    // })

    app.listen(process.env.PORT,()=>{ 
        console.log(`server run on ${process.env.PORT}!`);

        
    })
    //======================io=======================//
    // const io = new Server(server, {
    //     cors: "*"
    //   });
    
      // io.on('connection', (socket) => {
      //   socket.on('add', async (data) => {
      //     await Message.insertMany(data)
    
      //     const notes = await Message.find().select('-__v -createdAt -updatedAt -_id')
      //     io.emit('allNotes', notes)
    
      //   })
      //   socket.on('load', async () => {
      //     const notes = await Message.find().select('-__v -createdAt -updatedAt -_id')
      //     io.emit('allNotes', notes)
    
      //   })
    
      // });
    }

