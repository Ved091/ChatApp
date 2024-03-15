import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic"
import mongoose from "mongoose";
const {User ,Conversation} = exportObject
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // const { from, to } =await req.json();
    
    //     const messages = await Conversation
    //       .find({
    //         users: {
    //           $all: [from, to],
    //         },
    //       })
    //       .sort({
    //         updatedAt: 1,
    //       });
    //       let checkSender;
    //       let note;
    //       const projectMessages = messages.map((msg:any) => {
    //         // console.log(msg.sender.toString()===from)
    //         checkSender = (msg.sender.toString()===from)
    //         note = msg.message.text
    //       });
    try {
        const { from, to } =await req.json();
        await connectToMongoDb()
        const messages = await Conversation
          .find({
            users: {
              $all: [from, to],
            },
          })
          .sort({
            updatedAt: 1,
          });
    
          let checkSender:any=[]
          let note:any=[];
          let time:any=[];
          let id:any=[]
          // console.log(messages)
         messages.map((msg:any) => {
            // console.log(msg.sender.toString()===from)
            id.push(msg._id)
            checkSender.push(msg.sender.toString()===from)
            note.push(msg.message.text)
            time.push(msg.createdAt)
          });
          const checkCondition = ({checkSender: checkSender, note: note,time:time,id:id})
          return NextResponse.json({checkCondition})
       
      } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg: "Internal server error",
            status: false,
          });
      }
  }
  