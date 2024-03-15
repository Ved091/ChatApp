import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic";
const { User, Conversation } = exportObject;
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const segments = request.url.split("/");
  const messageId = JSON.stringify(segments[segments.length - 1]).substring(1,25)
  const conversationId = segments[segments.length - 2];
  await connectToMongoDb();
  const conversation = await Conversation.findOne({
    participants: conversationId,
  });
  const sandesh = conversation.messages
  if (!conversation) {
    return new Response("Conversation not Found", { status: 404 });
  }
  const index = sandesh.findIndex((mes:any) => mes._id.toString() === messageId);
  if (index>-1) {
    conversation.messages.splice(index, 1);
    await conversation.save();
    return new Response("Message deleted from the conversation successfully", {
      status: 200,
    });
  }else{
    return new Response("Message Not Found", { status: 404 });
  }
  
}
