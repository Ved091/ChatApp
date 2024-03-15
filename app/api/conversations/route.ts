import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic"
import mongoose from "mongoose";
const {User ,Conversation} = exportObject
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // console.log(req)
    try {
      const { from, to, message } = await req.json();
      await connectToMongoDb();
      const fromObjectId = new mongoose.Types.ObjectId(from)
      // Create a new conversation
      const data = await Conversation.create({
        message: {
          text: message,
        },
        users: [from, to],
        sender: fromObjectId,
      });
  
      if (data) {
        return NextResponse.json({
          msg: "Message added successfully to Database",
        });
      }
  
      return NextResponse.json({
        msg: "Failed to add message to Database",
      });
    } catch (error) {
      console.error(error);
    }
  }
  
// export async function POST(req: Request){
//     const {participants, messages} = await req.json() 
//     // console.log(participants, messages)
//      await connectToMongoDb()
//      await Conversation.create({participants, messages})
//      return NextResponse.json({message: "Conversation created"},{status: 201})
//  }
 
//  export async function GET(){
//     await connectToMongoDb()
//     const conversations = await Conversation.find() 
//     return NextResponse.json({conversations})
//  }


